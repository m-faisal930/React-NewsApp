import './App.css';
import React from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App (){
  
    const pageSize = 15;
    const apiKey = process.env.REACT_APP_NEWS_API;
    return (
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route  path="/" element={<News key="/" pageSize={pageSize} country="in" category="general" apiKey={apiKey} />} />
            <Route  path="/technology" element={<News key="technology" pageSize={pageSize} country="in" category="technology" apiKey={apiKey} />} />
            <Route path="/business" element={<News  key="business" pageSize={pageSize} country="in" category="business" apiKey={apiKey} />} />
            <Route  path="/entertainment" element={<News key="entertainment"  pageSize={pageSize} country="in" category="entertainment" apiKey={apiKey} />} />
            <Route  path="/science" element={<News key="science"  pageSize={pageSize} country="in" category="science" apiKey={apiKey} />} />
            <Route path="/sports" element={<News  key="sports" pageSize={pageSize} country="in" category="sports" apiKey={apiKey} />} />
            <Route path="/health" element={<News  key="health" pageSize={pageSize} country="in" category="health" apiKey={apiKey} />} />
          </Routes>
        </div>
      </Router>
    );
  
}
