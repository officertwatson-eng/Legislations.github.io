import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import MyCasePage from './pages/MyCasePage';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [myCaseItems, setMyCaseItems] = useState([]);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save and apply dark mode
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load My Case from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('myCaseItems');
    if (saved) {
      try {
        setMyCaseItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load My Case:', e);
      }
    }
  }, []);

  // Save My Case to localStorage
  useEffect(() => {
    localStorage.setItem('myCaseItems', JSON.stringify(myCaseItems));
  }, [myCaseItems]);

  const addToMyCase = (item) => {
    setMyCaseItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const removeFromMyCase = (itemId) => {
    setMyCaseItems(prev => prev.filter(i => i.id !== itemId));
  };

  const clearMyCase = () => {
    setMyCaseItems([]);
  };

  return (
    <Router basename="/Legislations.github.io">
      <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-950 text-white' : 'bg-white text-gray-900'}`}> 
        <Header darkMode={darkMode} setDarkMode={setDarkMode} myCaseCount={myCaseItems.length} />
        
        <main className="flex-1">
          <Routes>
            <Route 
              path="/" 
              element={<HomePage addToMyCase={addToMyCase} myCaseItems={myCaseItems} />}
            />
            <Route 
              path="/results/:category" 
              element={<ResultsPage addToMyCase={addToMyCase} myCaseItems={myCaseItems} />}
            />
            <Route 
              path="/my-case" 
              element={<MyCasePage items={myCaseItems} removeFromMyCase={removeFromMyCase} clearMyCase={clearMyCase} />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;