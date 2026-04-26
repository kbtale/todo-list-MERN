import { Link, useLocation } from 'react-router-dom';
import { Eye, Plus, BarChart3, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/oracle', icon: <Eye />, label: 'Oracle', color: 'bg-[#FFD600]' },
    { path: '/add-task', icon: <Plus />, label: 'Add Task', color: 'bg-[#FF4081]' },
    { path: '/dashboard', icon: <BarChart3 />, label: 'Stats', color: 'bg-[#2979FF]' },
  ];

  const hiddenRoutes = ['/login', '/register'];
  if (hiddenRoutes.includes(location.pathname)) return null;

  return (
    <nav className="sticky bottom-8 mt-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4 pointer-events-auto">
      <div className="cartoon-card bg-white p-3 flex gap-4 flex-row items-center">
        <Link 
          to="/" 
          className={`cartoon-button p-4 ${location.pathname === '/' ? 'bg-black text-white' : 'bg-white text-black'}`}
        >
          <Home size={24} />
        </Link>
        
        <div className="h-10 w-1 bg-black rounded-full mx-2" />

        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`cartoon-button flex items-center gap-2 px-4 py-3 whitespace-nowrap
              ${location.pathname === item.path 
                ? `${item.color} -translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]` 
                : 'bg-white text-black shadow-none'
              }`}
          >
            {item.icon}
            <span className="hidden md:block">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
