import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-black/40 border border-rm-green/30 rounded-lg overflow-hidden h-[320px] animate-pulse-slow relative">
      <div className="h-64 bg-gray-800/50 w-full" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-800/50 rounded w-3/4" />
        <div className="h-4 bg-gray-800/50 rounded w-1/2" />
      </div>
      <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
    </div>
  );
};

export const DetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-pulse-slow">
      <div className="h-10 bg-gray-800/50 rounded w-1/3 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-800/50 rounded-lg" />
        <div className="space-y-4">
          <div className="h-6 bg-gray-800/50 rounded w-full" />
          <div className="h-6 bg-gray-800/50 rounded w-5/6" />
          <div className="h-6 bg-gray-800/50 rounded w-4/6" />
          <div className="h-24 bg-gray-800/50 rounded w-full mt-8" />
        </div>
      </div>
    </div>
  );
};

export const ListSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};