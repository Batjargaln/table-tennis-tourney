import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors rounded-full';

  const variants = {
    default: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    primary: 'bg-blue-100 text-blue-900 hover:bg-blue-200',
    secondary: 'bg-purple-100 text-purple-900 hover:bg-purple-200',
    success: 'bg-green-100 text-green-900 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-900 hover:bg-yellow-200',
    danger: 'bg-red-100 text-red-900 hover:bg-red-200',
    outline: 'border border-gray-200 text-gray-900 hover:bg-gray-100',
    transparent: 'bg-white/10 backdrop-blur-lg text-white border border-white/20 hover:bg-white/20'
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1'
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;