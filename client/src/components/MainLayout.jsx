import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
  const location = useLocation();

  const bgColors = {
    '/dashboard': 'bg-[#FF4081]',
    '/oracle': 'bg-[#FFD600]',
    '/add-task': 'bg-[#F0F0F0]',
  };

  const currentBg = bgColors[location.pathname] || 'bg-[#F0F0F0]';

  return (
    <div className={`min-h-screen w-full flex flex-col items-center p-4 md:p-8 transition-colors duration-300 ${currentBg}`}>
      <div className="w-full flex-1 flex flex-col items-center">
        <Outlet />
      </div>

      <Navbar />
    </div>
  );
};

export default MainLayout;
