import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Target, BookOpen, Brain } from 'lucide-react';
import confetti from 'canvas-confetti';

const OraclePage = () => {
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSuggestion = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/tasks/oracle');
      setSuggestion(res.data);
      setLoading(false);
    } catch (err) {
      setError("The Oracle is silent. Try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestion();
  }, []);

  const handleManifest = async () => {
    if (!suggestion?.task) return;
    try {
      await axios.post(`/api/tasks/${suggestion.task._id}/manifest`);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD600', '#FF4081', '#2979FF']
      });
      fetchSuggestion();
    } catch (err) {
      setError("Manifestation failed.");
    }
  };

  const handleDefer = async () => {
    if (!suggestion?.task) return;
    try {
      await axios.post(`/api/tasks/${suggestion.task._id}/defer`);
      fetchSuggestion();
    } catch (err) {
      setError("Could not defer the path.");
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'deep-work': return <Brain className="w-6 h-6" />;
      case 'learning': return <BookOpen className="w-6 h-6" />;
      case 'health': return <Zap className="w-6 h-6" />;
      case 'quick-fix': return <Sparkles className="w-6 h-6" />;
      default: return <Target className="w-6 h-6" />;
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
    <div className="min-h-screen bg-[#FFD600] p-6 flex flex-col items-center justify-center font-bold">
      <header className="mb-12 text-center">
        <h1 className="text-6xl font-black uppercase tracking-tighter border-black text-black">
          The Oracle
        </h1>
        <p className="text-xl bg-black text-white px-4 py-1 mt-2 inline-block -rotate-2">
          Your path is revealed
        </p>
      </header>

      <main className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {suggestion?.task ? (
            <motion.div
              key={suggestion.task._id}
              initial={{ scale: 0.8, rotate: -3 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="cartoon-card p-8 bg-white"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="flex items-center gap-2 bg-[#2979FF] text-white px-3 py-1 rounded-full border-2 border-black">
                  {getCategoryIcon(suggestion.task.category)}
                  {suggestion.task.category}
                </span>
                <span className="text-black/50">Score: {Math.round(suggestion.score)}</span>
              </div>

              <h2 className="text-4xl font-black mb-4 uppercase leading-none">
                {suggestion.task.title}
              </h2>
              
              <p className="text-lg mb-8 opacity-80">
                {suggestion.task.description || "No description provided for this path."}
              </p>

              {/* Whisper Bar (Comic Bubble) */}
              <div className="relative mb-12 bg-pink-100 border-4 border-black p-4 rounded-xl rotate-1">
                <div className="absolute -bottom-4 left-8 w-0 h-0 border-l-[15px] border-l-transparent border-t-[15px] border-t-black border-r-[15px] border-r-transparent"></div>
                <div className="absolute -bottom-[10px] left-8 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-pink-100 border-r-[10px] border-r-transparent"></div>
                <p className="italic">" {suggestion.whisper} "</p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleManifest}
                  className="cartoon-button flex-1 bg-[#FF4081] text-white text-xl"
                >
                  MANIFEST
                </button>
                <button 
                  onClick={handleDefer}
                  className="cartoon-button bg-white text-black"
                >
                  DEFER
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="cartoon-card p-12 text-center bg-white"
            >
              <p className="text-2xl mb-6">{suggestion?.message || "All paths have been traversed."}</p>
              <button 
                onClick={fetchSuggestion}
                className="cartoon-button bg-[#2979FF] text-white"
              >
                REEVALUATE
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {error && (
        <div className="mt-8 bg-red-500 text-white px-6 py-2 border-4 border-black rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default OraclePage;
