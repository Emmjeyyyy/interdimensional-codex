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
import { Database } from 'lucide-react';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-sci-base flex flex-col font-sans selection:bg-sci-accent selection:text-black">
        <Navbar />
        <div className="h-1 bg-gradient-to-r from-transparent via-sci-accent to-transparent opacity-30"></div>
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
        
        <footer className="bg-sci-panel border-t border-sci-frame py-6 text-center mt-auto">
          <div className="container mx-auto px-4 flex flex-col items-center">
            <div className="flex items-center text-sci-text text-xs uppercase tracking-[0.2em] mb-2 opacity-60">
              <Database className="w-3 h-3 mr-2" />
              <span>System Status: Online</span>
            </div>
            <p className="font-display text-sci-text text-sm">
              INTERDIMENSIONAL CODEX // V.2.0.4
            </p>
            <div className="w-24 h-1 bg-sci-frame mt-4 relative overflow-hidden">
               <div className="absolute inset-0 bg-sci-accent animate-pulse opacity-50"></div>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;