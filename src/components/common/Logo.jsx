/**
 * Logo Component
 * Reusable logo component
 */
const Logo = ({ size = 'default', className = '' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    default: 'h-10 w-10',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      {/* TODO: Replace with actual logo image */}
      <div className="w-full h-full bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
        C
      </div>
    </div>
  );
};

export default Logo;
