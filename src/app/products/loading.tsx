import React from 'react'

const loading = () => {
  return (
    <div className="w-full mx-auto px-4 pt-[1rem] grid grid-cols-1 lg:grid-cols-2 gap-6 h-screen">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border rounded-xl p-6 space-y-3 h-[25rem]">
          <div className="h-[15rem] bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

export default loading