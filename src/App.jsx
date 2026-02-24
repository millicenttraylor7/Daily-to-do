import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './shared/Header';
import TodosPage from './pages/TodosPage';
import About from './pages/About';
import './App.css';

function App() {
  const location = useLocation();
  const [title, setTitle] = useState('');

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setTitle('Todo List');
        break;
      case '/about':
        setTitle('About');
        break;
      default:
        setTitle('Not Found');
        break;
    }
  }, [location.pathname]);

  return (
    <div>
      <Header title={title} />
      <Routes>
        <Route path="/" element={<TodosPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
