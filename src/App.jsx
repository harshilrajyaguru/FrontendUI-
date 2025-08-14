import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext.jsx';
import Layout from './components/Layout.jsx';
import ListView from './pages/ListView.jsx';
import BoardView from './pages/BoardView.jsx';
import './index.css';

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<BoardView />} />
            <Route path="list" element={<ListView />} />
            <Route path="board" element={<BoardView />} />
          </Route>
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;