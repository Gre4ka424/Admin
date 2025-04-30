import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/users', label: 'Пользователи' },
  { to: '/admin/profiles', label: 'Профили' },
  { to: '/admin/groups', label: 'Группы' },
  { to: '/admin/events', label: 'События' },
  { to: '/admin/content', label: 'Контент' },
];

export default function AdminNavbar() {
  const location = useLocation();
  return (
    <nav className="w-full bg-white shadow flex items-center px-6 py-3 mb-8">
      <div className="flex-1 flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`font-semibold px-3 py-1 rounded hover:bg-teal-50 transition-colors ${location.pathname.startsWith(item.to) ? 'bg-teal-100 text-teal-800' : 'text-gray-700'}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <button
        className="ml-auto px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold"
        onClick={() => {
          window.location.href = '/';
        }}
      >
        Выйти
      </button>
    </nav>
  );
} 