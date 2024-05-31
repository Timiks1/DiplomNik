import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AppRouter from './routes/AppRouter';
import { ServerProvider } from './contexts/ServerContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  return (
    <ServerProvider>
      <div className='flex flex-col min-h-screen'>
        {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />} {/* Передаем setIsAuthenticated */}
        <main className={`w-full mx-auto flex-1 my-6 max-w-screen-xl px-2.5 bg-gray-50 shadow-xl rounded-lg ${isAuthenticated ? '' : 'flex items-center justify-center'}`}>
          <AppRouter isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        </main>
      </div>
    </ServerProvider>
  );
}

export default App;
