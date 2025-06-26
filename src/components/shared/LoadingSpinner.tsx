const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
      <div className="w-16 h-16 border-4 border-t-4 border-t-green-500 border-green-200 rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
