import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  className = '', 
  variant = 'white',
  ...props 
}) => {
  const variants = {
    white: 'bg-white',
    yellow: 'bg-[#FFD600]',
    pink: 'bg-[#FF4081]',
    blue: 'bg-[#2979FF]',
    green: 'bg-[#00E676]',
    black: 'bg-black text-white',
  };

  return (
    <div 
      className={`cartoon-card ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['white', 'yellow', 'pink', 'blue', 'green', 'black'])
};

export default Card;
