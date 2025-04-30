import React from 'react';

const stats = [
  { label: 'Пользователей', value: 1240 },
  { label: 'Групп', value: 32 },
  { label: 'Событий', value: 87 },
];

const mockActivity = [
  { date: '2024-04-20', users: 5 },
  { date: '2024-04-21', users: 8 },
  { date: '2024-04-22', users: 12 },
  { date: '2024-04-23', users: 7 },
  { date: '2024-04-24', users: 15 },
  { date: '2024-04-25', users: 10 },
  { date: '2024-04-26', users: 13 },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold mb-6">Админ-панель: Статистика</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-teal-50 rounded p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-teal-700 mb-2">{s.value}</div>
            <div className="text-gray-700">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h3 className="font-semibold mb-2">Активность пользователей (за неделю)</h3>
        <div className="w-full h-48 bg-gray-100 rounded flex items-end gap-2 p-4">
          {mockActivity.map((a) => (
            <div key={a.date} className="flex flex-col items-center flex-1">
              <div
                className="w-6 bg-teal-400 rounded-t"
                style={{ height: `${a.users * 8}px` }}
                title={`Пользователей: ${a.users}`}
              ></div>
              <div className="text-xs text-gray-500 mt-1">{a.date.slice(5)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 