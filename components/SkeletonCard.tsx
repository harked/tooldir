import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-5">
        <div className="h-6 w-3/4 bg-gray-300 rounded mb-3"></div>
        <div className="h-4 w-full bg-gray-200 rounded mb-1"></div>
        <div className="h-4 w-full bg-gray-200 rounded mb-1"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="h-10 w-full bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
