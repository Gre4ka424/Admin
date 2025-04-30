import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

export default function AdminLayout() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Проверка прав администратора
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Проверка is_admin через API
    fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (!data.is_admin) {
        navigate('/');
      } else {
        setIsAdmin(true);
      }
    })
    .catch(() => navigate('/login'));
  }, [navigate]);

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
} 