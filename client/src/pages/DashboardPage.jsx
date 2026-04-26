import { useState, useEffect } from 'react';
import { getStatsRequest } from '../api/tasks';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, XCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getStatsRequest();
        setStats(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load stats:", error);
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
    <div className="min-h-screen bg-[#FF4081] p-4 md:p-8 font-bold pb-32">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <Link to="/oracle" className="cartoon-button bg-white flex items-center gap-2 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> BACK TO FOCUS
          </Link>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] italic">
            STATS & FLOW
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Sync Rate Box */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="cartoon-card col-span-1 md:col-span-2 p-8 md:p-12 bg-white flex flex-col items-center justify-center text-center border-4 border-black"
          >
            <h2 className="text-xl md:text-2xl mb-6 uppercase font-black">Adherence Rate</h2>
            <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center mb-6">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="96" cy="96" r="80"
                  className="fill-none stroke-black/5 stroke-[24]"
                />
                <motion.circle
                  cx="96" cy="96" r="80"
                  className="fill-none stroke-[#FFD600] stroke-[24]"
                  strokeDasharray="502.6"
                  initial={{ strokeDashoffset: 502.6 }}
                  animate={{ strokeDashoffset: 502.6 - (502.6 * (stats?.syncRate || 0)) / 100 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </svg>
              <span className="absolute text-5xl font-black">{stats?.syncRate}%</span>
            </div>
            <p className="text-lg font-bold opacity-80 uppercase tracking-tight">
              {stats?.syncRate > 70 ? "Excellent alignment with your energy." : "Try to follow the Oracle's lead more closely."}
            </p>
          </motion.div>

          {/* Quick Stats Column */}
          <div className="flex flex-col gap-6">
            <div className="cartoon-card p-6 bg-[#2979FF] text-white border-4 border-black">
              <div className="flex items-center gap-3 mb-2 font-black text-xs uppercase opacity-80">
                <CheckCircle2 size={16} /> Manifested
              </div>
              <div className="text-5xl font-black">{stats?.manifested}</div>
            </div>

            <div className="cartoon-card p-6 bg-white border-4 border-black">
              <div className="flex items-center gap-3 mb-2 font-black text-xs uppercase opacity-50">
                <XCircle size={16} /> Deferred
              </div>
              <div className="text-5xl font-black">{stats?.totalRejections}</div>
            </div>

            <div className="cartoon-card p-6 bg-[#FFD600] border-4 border-black">
              <div className="flex items-center gap-3 mb-2 font-black text-xs uppercase">
                <TrendingUp size={16} /> Total Choices
              </div>
              <div className="text-5xl font-black">{stats?.totalSuggestions}</div>
            </div>
          </div>
        </div>

        {/* Energy Heatmap Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="cartoon-card p-8 bg-white border-4 border-black"
        >
          <h2 className="text-2xl md:text-3xl font-black uppercase mb-10 border-b-8 border-black inline-block tracking-tighter">
            Energy Heatmap
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats?.heatmap?.map(item => (
              <div key={item.block} className="flex flex-col items-center">
                <div className="w-full bg-black/5 border-4 border-black rounded-2xl h-40 relative overflow-hidden flex items-end">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.avgEnergy / 5) * 100}%` }}
                    className="w-full bg-[#FFD600] border-t-4 border-black"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-4xl font-black">{item.count > 0 ? item.avgEnergy : '-'}</span>
                  </div>
                </div>
                <span className="mt-4 font-black uppercase text-xs tracking-widest">{item.block}</span>
                <span className="text-[10px] text-black/40 font-black uppercase">{item.count} TASKS</span>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center font-bold text-sm opacity-60 uppercase">
            Shows your average energy deployment across daily time blocks.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
