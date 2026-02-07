import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-black border border-rm-green/30 rounded-xl overflow-hidden h-full min-h-[320px] relative">
      <div className="animate-pulse-slow motion-reduce:animate-none motion-reduce:opacity-50 h-full flex flex-col">
        <div className="aspect-square bg-gray-800/50 w-full" />
        <div className="p-5 space-y-3 flex-grow flex flex-col justify-center">
          <div className="h-6 bg-gray-800/50 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-800/50 rounded w-1/2" />
          <div className="mt-auto pt-4 flex justify-between items-center">
             <div className="h-3 bg-gray-800/50 rounded w-1/4" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite] motion-reduce:hidden pointer-events-none" />
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

export const CharacterDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto w-full animate-fade-in">
      <div className="h-5 w-32 bg-gray-800/50 rounded mb-6 animate-pulse-slow motion-reduce:animate-none" />
      
      <div className="bg-black border border-rm-green/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,140,20,0.1)] relative min-h-[400px]">
         <div className="md:flex h-full animate-pulse-slow motion-reduce:animate-none motion-reduce:opacity-50">
            <div className="md:w-1/3 bg-gray-800/50 h-80 md:h-auto" />
            <div className="md:w-2/3 p-8 space-y-6">
               <div className="flex justify-between items-start">
                  <div className="h-10 bg-gray-800/50 rounded w-2/3" />
                  <div className="h-12 w-12 rounded-full bg-gray-800/50" />
               </div>
               
               <div className="space-y-6 mt-8">
                  <div className="flex items-center">
                     <div className="w-5 h-5 rounded bg-gray-800/50 mr-3" />
                     <div className="h-5 bg-gray-800/50 rounded w-1/2" />
                  </div>
                  <div className="flex items-center">
                     <div className="w-5 h-5 rounded bg-gray-800/50 mr-3" />
                     <div className="h-5 bg-gray-800/50 rounded w-1/2" />
                  </div>
                  <div className="flex items-center">
                     <div className="w-5 h-5 rounded bg-gray-800/50 mr-3" />
                     <div className="h-5 bg-gray-800/50 rounded w-2/3" />
                  </div>
                  <div className="flex items-center">
                     <div className="w-5 h-5 rounded bg-gray-800/50 mr-3" />
                     <div className="h-5 bg-gray-800/50 rounded w-2/3" />
                  </div>
               </div>

               <div className="pt-6 border-t border-gray-800/50 mt-8">
                  <div className="h-6 bg-gray-800/50 rounded w-1/4 mb-4" />
                  <div className="flex flex-wrap gap-2">
                     <div className="h-8 w-24 bg-gray-800/50 rounded" />
                     <div className="h-8 w-32 bg-gray-800/50 rounded" />
                     <div className="h-8 w-20 bg-gray-800/50 rounded" />
                  </div>
               </div>
            </div>
         </div>
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite] motion-reduce:hidden pointer-events-none" />
      </div>
    </div>
  );
};

export const LocationEpisodeDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto w-full animate-fade-in">
      <div className="h-5 w-32 bg-gray-800/50 rounded mb-6 animate-pulse-slow motion-reduce:animate-none" />

      {/* Header Skeleton */}
      <div className="mb-8 p-8 border border-rm-green/30 rounded-2xl h-40 bg-black relative overflow-hidden">
        <div className="animate-pulse-slow motion-reduce:animate-none motion-reduce:opacity-50 space-y-4 h-full flex flex-col justify-center">
           <div className="flex justify-between items-start">
              <div className="h-10 bg-gray-800/50 rounded w-1/2" />
              <div className="h-12 w-12 rounded-full bg-gray-800/50" />
           </div>
           <div className="flex gap-4">
              <div className="h-6 bg-gray-800/50 rounded w-32" />
              <div className="h-6 bg-gray-800/50 rounded w-24" />
           </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite] motion-reduce:hidden pointer-events-none" />
      </div>

      {/* Grid Header */}
      <div className="flex items-center mb-6 animate-pulse-slow motion-reduce:animate-none">
        <div className="w-6 h-6 bg-gray-800/50 rounded mr-3" />
        <div className="h-8 w-48 bg-gray-800/50 rounded" />
      </div>

      {/* Grid Skeleton */}
      <ListSkeleton count={8} />
    </div>
  );
};