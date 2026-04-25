import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, XCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/tasks/oracle/stats');
        setStats(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#FF4081] flex items-center justify-center">
      <div className="w-16 h-16 border-8 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FF4081] p-6 font-bold">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <Link to="/oracle" className="cartoon-button bg-white flex items-center gap-2">
            <ArrowLeft size={20} /> ORACLE
          </Link>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            Enlightenment
          </h1>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Sync Rate Box */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="cartoon-card col-span-full md:col-span-2 p-12 bg-white flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-2xl mb-4 uppercase">Your Sync Rate</h2>
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="96" cy="96" r="80"
                  className="fill-none stroke-black/10 stroke-[20]"
                />
                <motion.circle
                  cx="96" cy="96" r="80"
                  className="fill-none stroke-[#FFD600] stroke-[20]"
                  strokeDasharray="502.6"
                  initial={{ strokeDashoffset: 502.6 }}
                  animate={{ strokeDashoffset: 502.6 - (502.6 * (stats?.syncRate || 0)) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <span className="absolute text-5xl font-black">{stats?.syncRate}%</span>
            </div>
            <p className="text-xl italic">
              {stats?.syncRate > 70 ? "The Oracle is pleased with your focus." : "The thread of fate is tangled. Seek alignment."}
            </p>
          </motion.div>

          {/* Quick Stats Column */}
          <div className="space-y-8">
            <div className="cartoon-card p-6 bg-[#2979FF] text-white">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 />
                <span className="uppercase">Manifested</span>
              </div>
              <div className="text-4xl font-black">{stats?.manifested}</div>
            </div>

            <div className="cartoon-card p-6 bg-white">
              <div className="flex items-center gap-3 mb-2">
                <XCircle className="text-red-500" />
                <span className="uppercase text-black/60">Deferred</span>
              </div>
              <div className="text-4xl font-black">{stats?.totalRejections}</div>
            </div>

            <div className="cartoon-card p-6 bg-[#FFD600]">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp />
                <span className="uppercase">Total Path Suggestions</span>
              </div>
              <div className="text-4xl font-black">{stats?.totalSuggestions}</div>
            </div>
          </div>
        </div>

        {/* Energy Heatmap Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="cartoon-card p-8 bg-white mb-8"
        >
          <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black inline-block">
            Energy Heatmap
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats?.heatmap?.map(item => (
              <div key={item.block} className="flex flex-col items-center">
                <div className="w-full bg-black/5 border-4 border-black rounded-lg h-32 relative overflow-hidden flex items-end">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.avgEnergy / 5) * 100}%` }}
                    className="w-full bg-[#FFD600] border-t-4 border-black"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-3xl font-black">{item.count > 0 ? item.avgEnergy : '-'}</span>
                  </div>
                </div>
                <span className="mt-4 uppercase text-sm tracking-widest">{item.block}</span>
                <span className="text-xs text-black/40 font-normal uppercase">{item.count} tasks</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-black/70 italic text-center">
            Shows your average cognitive load (1-5) across different times of the day.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
