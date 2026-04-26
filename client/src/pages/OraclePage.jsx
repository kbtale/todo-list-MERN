import { useState, useEffect, useCallback } from 'react';
import { getOracleSuggestionRequest, updateEnergyRequest, manifestTaskRequest, deferTaskRequest } from '../api/tasks';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle, XCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const OraclePage = () => {
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [energyLevel, setEnergyLevel] = useState(3);

  const fetchSuggestion = useCallback(async (level = energyLevel) => {
    try {
      const res = await getOracleSuggestionRequest(level);
      setSuggestion(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch suggestion:", error);
      setLoading(false);
    }
  }, [energyLevel]);

  useEffect(() => {
    fetchSuggestion();
  }, [fetchSuggestion]);

  const handleEnergyUpdate = async (level) => {
    setEnergyLevel(level);
    try {
      await updateEnergyRequest(level);
    } catch (error) {
      console.error("Failed to update energy state:", error);
    }
  };

  const handleAction = async (action) => {
    if (!suggestion?.task?._id) return;
    try {
      if (action === 'manifest') {
        await manifestTaskRequest(suggestion.task._id);
      } else {
        await deferTaskRequest(suggestion.task._id);
      }
      fetchSuggestion();
    } catch (error) {
      console.error(`Failed to ${action} task:`, error);
    }
  };

  if (loading && !suggestion) return (
    <div className="w-16 h-16 border-8 border-black border-t-transparent rounded-full animate-spin mt-20" />
  );

  return (
    <>
      <header className="mb-8 text-center mt-8">
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-black italic">
          THE ORACLE
        </h1>
        <p className="text-sm font-black uppercase tracking-widest text-black/40 italic">
          Seek Guidance · Manifest Reality
        </p>
      </header>

      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {suggestion?.task ? (
            <motion.div
              key={suggestion.task._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="p-6 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2 px-3 py-1 bg-black text-white rounded-lg text-xs font-black uppercase tracking-tighter">
                    <Zap size={14} fill="currentColor" /> {suggestion.task.energyLevel} Energy
                  </div>
                  <div className="text-[10px] font-black uppercase text-black/30 tracking-widest">
                    {suggestion.task.category}
                  </div>
                </div>

                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 leading-tight italic">
                  {suggestion.task.title}
                </h2>
                
                {suggestion.task.description && (
                  <p className="text-lg md:text-xl font-bold mb-8 border-l-8 border-[#FFD600] pl-4 italic opacity-80">
                    "{suggestion.task.description}"
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                  <Button variant="green" size="lg" onClick={() => handleAction('manifest')}>
                    <CheckCircle className="shrink-0" /> MANIFEST
                  </Button>
                  <Button variant="white" size="lg" onClick={() => handleAction('defer')}>
                    <XCircle className="shrink-0" /> DEFER
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-12 text-center">
                <div className="flex justify-center mb-6 text-black/10">
                  <Zap size={80} />
                </div>
                <h2 className="text-3xl font-black uppercase mb-4 tracking-tighter">Alignment Complete</h2>
                <p className="font-bold opacity-60 uppercase text-xs italic">All tasks manifested or balanced for now.</p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 italic">Current Energy State</label>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((level) => (
                <div 
                  key={level} 
                  className={`w-5 h-2 rounded-full border-2 border-black transition-colors ${level <= energyLevel ? 'bg-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)]' : 'bg-transparent'}`} 
                />
              ))}
            </div>
          </div>
          
          <Card className="p-4 flex gap-4 overflow-x-auto no-scrollbar">
            {[1, 2, 3, 4, 5].map((level) => (
              <Button
                key={level}
                variant={energyLevel === level ? 'yellow' : 'white'}
                className="flex-1 min-w-[3.5rem] py-4"
                onClick={() => handleEnergyUpdate(level)}
              >
                <div className="flex gap-0.5">
                  {[...Array(level)].map((_, i) => (
                    <Zap key={i} size={14} fill="currentColor" className="shrink-0" />
                  ))}
                </div>
              </Button>
            ))}
          </Card>
        </div>
      </div>
    </>
  );
};

export default OraclePage;
