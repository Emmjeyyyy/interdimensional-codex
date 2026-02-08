import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-sci-frame p-1 rounded-sm">
      <div className="bg-sci-screen border-4 border-sci-panel rounded-lg mb-2 h-72 sm:h-96 overflow-hidden relative">
         <div className="w-full h-full bg-sci-panel animate-pulse opacity-50"></div>
         <div className="absolute inset-0 scanlines opacity-20"></div>
      </div>
      <div className="bg-sci-panel border border-sci-frameLight p-3 mt-auto h-16 flex flex-col justify-center space-y-2">
         <div className="h-4 bg-sci-frameLight/20 w-3/4 mx-auto animate-pulse"></div>
         <div className="h-3 bg-sci-frameLight/10 w-1/2 mx-auto animate-pulse border-t border-sci-frame pt-1"></div>
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

export const TextCardSkeleton: React.FC = () => {
  return (
    <div className="bg-sci-frame p-1 rounded-sm h-[180px]">
       <div className="bg-sci-panel border border-sci-frameLight h-full p-4 flex flex-col relative">
          <div className="flex justify-between mb-4">
             <div className="w-16 h-3 bg-sci-frameLight/20 animate-pulse"></div>
             <div className="w-6 h-6 bg-sci-frameLight/20 animate-pulse"></div>
          </div>
          <div className="flex-grow flex flex-col justify-center items-center space-y-3">
             <div className="w-3/4 h-6 bg-sci-frameLight/20 animate-pulse"></div>
             <div className="w-1/2 h-3 bg-sci-frameLight/10 animate-pulse"></div>
          </div>
       </div>
    </div>
  );
};

export const TextListSkeleton: React.FC<{ count?: number }> = ({ count = 12 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <TextCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const CharacterDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto w-full animate-fade-in">
      <div className="h-5 w-32 bg-sci-frame/50 rounded mb-6 animate-pulse" />
      
      <div className="bg-sci-panel border-2 border-sci-frame rounded-sm shadow-xl p-6 md:p-10 flex flex-col lg:flex-row gap-6 lg:gap-10">
         <div className="lg:w-1/3">
             <div className="aspect-square bg-sci-base border-2 border-sci-frame relative overflow-hidden mb-6">
                 <div className="absolute inset-0 bg-sci-frameLight/10 animate-pulse"></div>
             </div>
             <div className="h-10 bg-sci-frame w-full animate-pulse"></div>
         </div>
         
         <div className="lg:w-2/3 space-y-6">
             <div className="h-12 bg-sci-frameLight/20 w-3/4 animate-pulse"></div>
             <div className="h-px bg-sci-frame w-full"></div>
             <div className="grid grid-cols-2 gap-6">
                 <div className="h-24 bg-sci-base border border-sci-frame animate-pulse"></div>
                 <div className="h-24 bg-sci-base border border-sci-frame animate-pulse"></div>
                 <div className="h-24 bg-sci-base border border-sci-frame col-span-2 animate-pulse"></div>
             </div>
         </div>
      </div>
    </div>
  );
};

export const LocationEpisodeDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto w-full animate-fade-in">
      <div className="h-5 w-32 bg-sci-frame/50 rounded mb-6 animate-pulse" />

      <div className="bg-sci-panel border-2 border-sci-frame rounded-sm shadow-xl p-6 md:p-8 mb-8 h-48 relative">
          <div className="h-8 bg-sci-frameLight/20 w-1/2 mb-4 animate-pulse"></div>
          <div className="h-4 bg-sci-frameLight/10 w-1/4 animate-pulse"></div>
      </div>

      <div className="flex items-center mb-6">
        <div className="w-6 h-6 bg-sci-frameLight/50 rounded mr-3" />
        <div className="h-8 w-48 bg-sci-frameLight/20 rounded" />
      </div>

      <ListSkeleton count={8} />
    </div>
  );
};