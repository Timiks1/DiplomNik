import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServer } from '../contexts/ServerContext';

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const serverService = useServer();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await serverService.login(username, password);
      if (response.token) { // Проверяем наличие токена в ответе
        console.log('Login successful, navigating to /news');
        setIsAuthenticated(true); // Обновление состояния аутентификации
        navigate('/news'); // Перенаправление на базовую страницу
        window.location.reload(); // Перезагружаем страницу

      } else {
        setError('Неправильный логин или пароль');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Ошибка авторизации');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center">Вход</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Логин
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
