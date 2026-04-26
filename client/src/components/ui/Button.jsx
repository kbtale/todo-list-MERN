import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  className = '', 
  variant = 'white', 
  size = 'md',
  ...props 
}) => {
  const variants = {
    white: 'bg-white text-black',
    yellow: 'bg-[#FFD600] text-black',
    pink: 'bg-[#FF4081] text-white',
    blue: 'bg-[#2979FF] text-white',
    green: 'bg-[#00E676] text-black',
    black: 'bg-black text-white',
    ghost: 'bg-transparent border-transparent shadow-none hover:bg-black/5 hover:translate-x-0 hover:translate-y-0 active:translate-y-0'
  };

  const sizes = {
    xs: 'px-2 py-1 text-[10px]',
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-xl',
    icon: 'p-3'
  };

  return (
    <button 
      className={`cartoon-button flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['white', 'yellow', 'pink', 'blue', 'green', 'black', 'ghost']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'icon'])
};

export default Button;
