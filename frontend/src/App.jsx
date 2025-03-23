import React from 'react';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PropertyDetailPage from './components/PropertyDetailPage';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
      <DndProvider backend={HTML5Backend}> 
          <Router>
              <Navbar />
              <Routes>
                  <Route path="/" element={<SearchPage />} />
                  <Route path="/property/:id" element={<PropertyDetailPage />} />
              </Routes>
              <Footer />
          </Router>
      </DndProvider>
  );
}

export default App;