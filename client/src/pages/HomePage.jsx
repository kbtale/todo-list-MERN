import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#F0F0F0] flex flex-col items-center justify-center p-6 text-center text-black">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="cartoon-card bg-white p-12 md:p-16 max-w-3xl border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
      >
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none">
          The Oracle
        </h1>
        
        <p className="text-xl md:text-2xl font-bold bg-black text-white px-6 py-3 inline-block mb-12 uppercase tracking-tight">
          Energy-Aware Task Management
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link to="/oracle" className="cartoon-button bg-[#2979FF] text-white text-2xl py-5 px-10 flex items-center gap-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">
            Open Oracle <LayoutDashboard />
          </Link>
          
          <Link to="/add-task" className="cartoon-button bg-[#FFD600] text-black text-2xl py-5 px-10 flex items-center gap-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">
            New Task <PlusCircle />
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t-4 border-gray-100 flex justify-center gap-8 text-sm font-black uppercase text-gray-400">
          <Link to="/login" className="hover:text-black transition-colors">Login</Link>
          <Link to="/register" className="hover:text-black transition-colors">Create Account</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
