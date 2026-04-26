import { useState, useEffect } from 'react';
import { 
  getOracleSuggestionRequest, 
  manifestTaskRequest, 
  deferTaskRequest, 
  updateEnergyRequest 
} from '../api/tasks';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Target, BookOpen, Brain, Leaf, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

const OraclePage = () => {
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEnergy, setUserEnergy] = useState(3);

  const fetchSuggestion = async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const res = await getOracleSuggestionRequest();
      setSuggestion(res.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError("Unable to reach the Oracle. Check your connection.");
      setLoading(false);
    }
  };

  const updateEnergy = async (level) => {
    try {
      setUserEnergy(level);
      await updateEnergyRequest(level);
      fetchSuggestion(); 
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSuggestion(true);
  }, []);

  const handleManifest = async () => {
    if (!suggestion?.task) return;
    try {
      await manifestTaskRequest(suggestion.task._id);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD600', '#FF4081', '#2979FF']
      });
      fetchSuggestion();
    } catch (err) {
      setError("Task completion failed.");
    }
  };

  const handleDefer = async () => {
    if (!suggestion?.task) return;
    try {
      await deferTaskRequest(suggestion.task._id);
      fetchSuggestion();
    } catch (err) {
      setError("Could not skip this task.");
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'deep-work': return <Brain size={18} />;
      case 'learning': return <BookOpen size={18} />;
      case 'health': return <Zap size={18} />;
      case 'quick-fix': return <Sparkles size={18} />;
      default: return <Target size={18} />;
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFD600]">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-16 h-16 border-8 border-black border-t-transparent rounded-full"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFD600] p-4 md:p-8 flex flex-col items-center pb-32">
      <header className="mb-8 text-center mt-8">
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-black italic">
          THE ORACLE
        </h1>
        <div className="bg-black text-white px-4 py-1 mt-2 inline-block -rotate-1 font-bold text-sm uppercase">
          Your priorities, focused.
        </div>
      </header>

      {/* Energy Selector */}
      <div className="mb-10 cartoon-card bg-white p-4 flex flex-col md:flex-row items-center gap-4 border-4 border-black">
        <span className="uppercase text-xs font-black">Current Energy State</span>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => updateEnergy(level)}
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-4 border-black rounded-xl transition-all 
                ${userEnergy === level ? 'bg-[#FFD600] -translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-white opacity-40 hover:opacity-100'}`}
            >
              {level <= 1 ? <Leaf size={20} /> : level <= 3 ? <Zap size={20} /> : <Flame size={20} />}
            </button>
          ))}
        </div>
      </div>

      <main className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {suggestion?.task ? (
            <motion.div
              key={suggestion.task._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="cartoon-card p-6 md:p-10 bg-white border-4 border-black"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-xl border-4 border-black font-black uppercase text-[10px]">
                  {getCategoryIcon(suggestion.task.category)}
                  {suggestion.task.category}
                </span>
                <span className="font-black text-xs opacity-30 uppercase tracking-widest">Priority Score: {Math.round(suggestion.score)}</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight leading-[0.9]">
                {suggestion.task.title}
              </h2>
              
              <p className="text-lg md:text-xl mb-10 font-bold opacity-70">
                {suggestion.task.description || "No further context provided."}
              </p>

              {/* Rationale Box */}
              <div className="relative mb-10 bg-[#FFD600]/20 border-4 border-dashed border-black p-5 rounded-2xl">
                <p className="italic font-bold text-sm">"{suggestion.whisper}"</p>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <button 
                  onClick={handleManifest}
                  className="cartoon-button flex-1 bg-[#FF4081] text-white text-xl py-4 flex items-center justify-center gap-2"
                >
                  COMPLETE TASK <ArrowRight size={24} />
                </button>
                <button 
                  onClick={handleDefer}
                  className="cartoon-button bg-white text-black text-xl py-4"
                >
                  SKIP
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="cartoon-card p-12 text-center bg-white border-4 border-black"
            >
              <p className="text-2xl font-black mb-8 uppercase tracking-tighter">Your path is clear. All tasks have been processed.</p>
              <button 
                onClick={fetchSuggestion}
                className="cartoon-button bg-[#2979FF] text-white text-xl py-4"
              >
                CHECK AGAIN
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {error && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-red-500 text-white font-black px-6 py-2 border-4 border-black rounded-xl">
          {error}
        </div>
      )}
    </div>
  );
};

export default OraclePage;
