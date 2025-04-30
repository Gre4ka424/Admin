import React, { useState } from 'react';

const mockEvents = [
  { id: 1, title: 'React Meetup', date: '2024-05-01', group: 'React Developers', members: 50 },
  { id: 2, title: 'Frontend Conf', date: '2024-05-10', group: 'Frontend Enthusiasts', members: 30 },
  { id: 3, title: 'AI Workshop', date: '2024-05-15', group: 'Athens AI Meetup', members: 20 },
];

export default function AdminEvents() {
  const [events, setEvents] = useState(mockEvents);

  function handleDelete(id: number) {
    if (!confirm('Удалить событие?')) return;
    setEvents(events.filter(e => e.id !== id));
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold mb-6">События</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Группа</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Участников</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {events.map(event => (
            <tr key={event.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.group}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.members}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleDelete(event.id)}
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