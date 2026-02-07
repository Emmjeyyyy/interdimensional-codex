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
      
      <div className="bg-black border border-rm-green/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,140,20,0.1)] relative min-h-[600px]">
         {/* Banner */}
         <div className="h-48 bg-gray-900/50 animate-pulse-slow"></div>

         <div className="px-6 md:px-10 pb-10">
            {/* Avatar Header */}
            <div className="flex flex-col items-center -mt-24 mb-10 relative">
               <div className="w-48 h-48 rounded-full bg-black border-4 border-black p-1">
                  <div className="w-full h-full rounded-full bg-gray-800/80 animate-pulse-slow"></div>
               </div>
               <div className="mt-6 space-y-3 flex flex-col items-center w-full">
                  <div className="h-10 bg-gray-800/50 rounded w-1/2 md:w-1/3 animate-pulse-slow" />
                  <div className="h-10 w-40 rounded-full bg-gray-800/50 animate-pulse-slow" />
               </div>
            </div>
            
            {/* Grid */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
               <div className="space-y-6">
                  <div className="h-24 bg-gray-800/30 rounded-xl animate-pulse-slow"></div>
                  <div className="h-24 bg-gray-800/30 rounded-xl animate-pulse-slow"></div>
               </div>
               <div className="space-y-6">
                  <div className="h-24 bg-gray-800/30 rounded-xl animate-pulse-slow"></div>
                  <div className="h-24 bg-gray-800/30 rounded-xl animate-pulse-slow"></div>
               </div>
            </div>

            {/* Episodes */}
            <div className="max-w-4xl mx-auto pt-6 border-t border-gray-800/50">
               <div className="h-8 w-40 bg-gray-800/50 rounded mb-4 animate-pulse-slow" />
               <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-10 w-24 bg-gray-800/30 rounded animate-pulse-slow" />
                  ))}
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