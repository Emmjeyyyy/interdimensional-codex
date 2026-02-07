import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Characters from './pages/Characters';
import Locations from './pages/Locations';
import Episodes from './pages/Episodes';
import Favorites from './pages/Favorites';
import CharacterDetail from './pages/CharacterDetail';
import LocationDetail from './pages/LocationDetail';
import EpisodeDetail from './pages/EpisodeDetail';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-black bg-space flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
          <Routes>
            <Route path="/" element={<Characters />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<CharacterDetail />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/locations/:id" element={<LocationDetail />} />
            <Route path="/episodes" element={<Episodes />} />
            <Route path="/episodes/:id" element={<EpisodeDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <footer className="bg-black/80 text-rm-green py-6 text-center border-t border-rm-green/30 backdrop-blur-sm relative z-10 flex flex-col items-center justify-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/960px-Rick_and_Morty.svg.png?20220319060844" 
            alt="Rick and Morty" 
            className="h-8 w-auto mb-3 opacity-80"
          />
          <p className="font-display tracking-wider text-sm">
            INTERDIMENSIONAL CODEX &copy; {new Date().getFullYear()}
          </p>
          <p className="text-xs mt-2 opacity-70">Powered by The Rick and Morty API</p>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;