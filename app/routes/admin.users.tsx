// @ts-ignore
import React, { useEffect, useState } from 'react';
// @ts-ignore
import { Link } from 'react-router-dom';

interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
  birth_date?: string;
  gender?: string;
  interests?: string[];
  joined_groups?: number[];
  onboarding_completed?: boolean;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // @ts-ignore
    fetch(`${import.meta.env.VITE_API_URL}/admin/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    })
    .then(data => {
      setUsers(data);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  const handleDelete = (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    const token = localStorage.getItem('token');
    // @ts-ignore
    fetch(`${import.meta.env.VITE_API_URL}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to delete user');
      setUsers(users.filter(user => user.id !== userId));
    })
    .catch(err => {
      setError(err.message);
    });
  };

  const filteredUsers = users.filter((u: User) =>
    u.username.toLowerCase().includes(filter.toLowerCase()) ||
    u.email.toLowerCase().includes(filter.toLowerCase())
  );

  // Функция для форматирования даты
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Не указана';
    return new Date(dateString).toLocaleDateString();
  };

  // Функция для перевода пола на русский
  const translateGender = (gender?: string) => {
    if (!gender) return 'Не указан';
    const translations: {[key: string]: string} = {
      'male': 'Мужской',
      'female': 'Женский',
      'non-binary': 'Небинарный',
      'prefer-not-to-say': 'Предпочитает не указывать'
    };
    return translations[gender] || gender;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-4xl mx-auto mt-10 p-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Пользователи</h3>
        <input
          type="text"
          placeholder="Поиск по имени или email"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>
      <div className="border-t border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Onboarding</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user: User) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer" onClick={() => setSelectedUser(user)}>{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.is_admin ? 'Admin' : 'User'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.onboarding_completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {user.onboarding_completed ? 'Завершён' : 'Не завершён'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Модальное окно с информацией о пользователе */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 min-w-[400px] max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setSelectedUser(null)}>&times;</button>
            <h4 className="text-xl font-bold mb-4">Информация о пользователе</h4>
            
            <div className="grid grid-cols-1 gap-3">
              {/* Основная информация */}
              <h5 className="font-semibold text-gray-700 border-b pb-1 mt-2">Основные данные</h5>
              <div className="mb-2"><b>Имя:</b> {selectedUser.username}</div>
              <div className="mb-2"><b>Email:</b> {selectedUser.email}</div>
              <div className="mb-2"><b>Роль:</b> {selectedUser.is_admin ? 'Админ' : 'Пользователь'}</div>
              <div className="mb-2"><b>Статус:</b> {selectedUser.is_active ? 'Активен' : 'Неактивен'}</div>
              <div className="mb-2"><b>Дата регистрации:</b> {formatDate(selectedUser.created_at)}</div>
            
              {/* Данные профиля */}
              <h5 className="font-semibold text-gray-700 border-b pb-1 mt-4">Профиль пользователя</h5>
              <div className="mb-2"><b>Статус онбординга:</b> {selectedUser.onboarding_completed ? 'Завершен' : 'Не завершен'}</div>
              <div className="mb-2"><b>Дата рождения:</b> {formatDate(selectedUser.birth_date)}</div>
              <div className="mb-2"><b>Пол:</b> {translateGender(selectedUser.gender)}</div>
              <div className="mb-2">
                <b>Интересы:</b><br/>
                {selectedUser.interests && selectedUser.interests.length > 0 
                  ? <div className="flex flex-wrap gap-1 mt-1">
                      {selectedUser.interests.map(interest => (
                        <span key={interest} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {interest}
                        </span>
                      ))}
                    </div>
                  : <span className="text-gray-500">Не указаны</span>}
              </div>
              <div className="mb-2">
                <b>Присоединенные группы:</b><br/>
                {selectedUser.joined_groups && selectedUser.joined_groups.length > 0 
                  ? <div className="flex flex-wrap gap-1 mt-1">
                      {selectedUser.joined_groups.map(groupId => (
                        <span key={groupId} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          Группа #{groupId}
                        </span>
                      ))}
                    </div>
                  : <span className="text-gray-500">Не присоединился ни к одной группе</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 