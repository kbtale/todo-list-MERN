import React from 'react';
import PropTypes from 'prop-types';

const Input = React.forwardRef(({ 
  className = '', 
  label = '', 
  error = '',
  ...props 
}, ref) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-[10px] font-black uppercase text-black/40 pl-1 italic">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`cartoon-input bg-white text-black border-4 border-black focus:bg-yellow-50 ${className} ${error ? 'border-red-500 bg-red-50' : ''}`}
        {...props}
      />
      {error && (
        <span className="text-[10px] font-bold text-red-500 uppercase pl-1 mt-1">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string
};

export default Input;
