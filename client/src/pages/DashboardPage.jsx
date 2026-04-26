import { useState, useEffect } from 'react';
import { getStatsRequest } from '../api/tasks';
import { motion } from 'framer-motion';
import { TrendingUp, XCircle, CheckCircle2 } from 'lucide-react';
import Card from '../components/ui/Card';

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
    <div className="w-16 h-16 border-8 border-black border-t-transparent rounded-full animate-spin mt-20" />
  );

  return (
    <div className="max-w-4xl w-full">
      <header className="mb-12 pt-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] italic">
          STATS & FLOW
        </h1>
        <p className="text-sm font-black uppercase tracking-widest text-white/50 mt-2 italic">
          Your alignment with the divine energy
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="col-span-1 md:col-span-2"
        >
          <Card className="h-full p-8 md:p-12 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl md:text-2xl mb-6 uppercase font-black tracking-tight">Adherence Rate</h2>
            <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center mb-6">
              <svg className="w-full h-full -rotate-90">
                <circle cx="96" cy="96" r="80" className="fill-none stroke-black/5 stroke-[24]" />
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
            <p className="text-lg font-bold opacity-80 uppercase tracking-tight italic">
              {stats?.syncRate > 70 ? "Excellent alignment." : "Follow the Oracle more closely."}
            </p>
          </Card>
        </motion.div>

        <div className="flex flex-col gap-6">
          <Card variant="blue" className="p-6 text-white text-center">
            <div className="flex items-center justify-center gap-3 mb-2 font-black text-xs uppercase opacity-80"><CheckCircle2 size={16} /> Manifested</div>
            <div className="text-5xl font-black">{stats?.manifested}</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2 font-black text-xs uppercase opacity-50"><XCircle size={16} /> Deferred</div>
            <div className="text-5xl font-black">{stats?.totalRejections}</div>
          </Card>
          <Card variant="yellow" className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2 font-black text-xs uppercase"><TrendingUp size={16} /> Total Choices</div>
            <div className="text-5xl font-black">{stats?.totalSuggestions}</div>
          </Card>
        </div>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Card className="p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-black uppercase mb-10 border-b-8 border-black inline-block tracking-tighter">Energy Heatmap</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats?.heatmap?.map(item => (
              <div key={item.block} className="flex flex-col items-center">
                <div className="w-full bg-black/5 border-4 border-black rounded-2xl h-40 relative overflow-hidden flex items-end">
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(item.avgEnergy / 5) * 100}%` }} className="w-full bg-[#FFD600] border-t-4 border-black" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-4xl font-black">{item.count > 0 ? item.avgEnergy : '-'}</span>
                  </div>
                </div>
                <span className="mt-4 font-black uppercase text-xs tracking-widest">{item.block}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
