import React, { useState } from 'react';

const mockGroups = [
  { id: 1, name: 'React Developers', members: 120, created_at: '2024-04-10' },
  { id: 2, name: 'Frontend Enthusiasts', members: 80, created_at: '2024-04-12' },
  { id: 3, name: 'Athens AI Meetup', members: 45, created_at: '2024-04-15' },
  { id: 4, name: 'Travel Lovers', members: 200, created_at: '2024-04-18' },
];

export default function AdminGroups() {
  const [groups, setGroups] = useState(mockGroups);

  function handleDelete(id: number) {
    if (!confirm('Удалить группу?')) return;
    setGroups(groups.filter(g => g.id !== id));
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold mb-6">Группы</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Участников</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Создана</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {groups.map(group => (
            <tr key={group.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{group.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{group.members}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{group.created_at}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleDelete(group.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 