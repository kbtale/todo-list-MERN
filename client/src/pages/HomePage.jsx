import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, User, LogIn } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-[#F0F0F0] flex flex-col items-center justify-center p-6 text-center text-black font-bold">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="cartoon-card bg-white p-10 md:p-16 max-w-3xl border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
      >
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none italic">
          THE ORACLE
        </h1>
        
        <p className="text-xl md:text-2xl font-black bg-black text-white px-6 py-3 inline-block mb-12 uppercase tracking-tight -rotate-1">
          Precision Task Management
        </p>

        {isAuthenticated ? (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link to="/oracle" className="cartoon-button bg-[#2979FF] text-white text-2xl py-5 px-10 flex items-center gap-3 border-4 border-black">
                GO TO ORACLE <LayoutDashboard />
              </Link>
              
              <Link to="/add-task" className="cartoon-button bg-[#FFD600] text-black text-2xl py-5 px-10 flex items-center gap-3 border-4 border-black">
                NEW TASK <PlusCircle />
              </Link>
            </div>
            <p className="uppercase text-xs font-black opacity-30">Logged in as {user?.username}</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link to="/login" className="cartoon-button bg-[#2979FF] text-white text-2xl py-5 px-10 flex items-center gap-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              LOGIN <LogIn />
            </Link>
            
            <Link to="/register" className="cartoon-button bg-white text-black text-2xl py-5 px-10 flex items-center gap-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              REGISTER <User />
            </Link>
          </div>
        )}

      </motion.div>
    </div>
  );
};

export default HomePage;
