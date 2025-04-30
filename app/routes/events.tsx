import React, { useState } from 'react';
import UserNavbar from '../components/UserNavbar';

// Моки событий
const mockEvents = [
  {
    id: 1,
    title: 'React Meetup',
    date: '2024-05-01',
    joined: true,
  },
  {
    id: 2,
    title: 'Hackathon',
    date: '2024-05-10',
    joined: false,
  },
  {
    id: 3,
    title: 'Frontend Conf',
    date: '2024-04-20',
    joined: true,
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState(mockEvents);
  const [selectedDate, setSelectedDate] = useState('');

  function handleJoin(id: number) {
    setEvents(events.map(e => e.id === id ? { ...e, joined: true } : e));
  }
  function handleLeave(id: number) {
    setEvents(events.map(e => e.id === id ? { ...e, joined: false } : e));
  }

  const filteredEvents = selectedDate
    ? events.filter(e => e.date === selectedDate)
    : events;

  return (
    <>
      <UserNavbar />
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Мои события</h2>
        <div className="flex gap-8 flex-col md:flex-row">
          <div className="flex-1">
            <label className="block mb-2 font-semibold">Фильтр по дате</label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="border rounded px-3 py-2 w-full mb-4"
            />
            <button
              className="mb-4 px-4 py-2 rounded bg-gray-200"
              onClick={() => setSelectedDate('')}
              disabled={!selectedDate}
            >
              Сбросить фильтр
            </button>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Список событий</h3>
            <ul className="space-y-4">
              {filteredEvents.length === 0 && <li className="text-gray-500">Нет событий</li>}
              {filteredEvents.map(event => (
                <li key={event.id} className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-bold">{event.title}</div>
                    <div className="text-gray-500 text-sm">{event.date}</div>
                  </div>
                  <div className="mt-2 md:mt-0">
                    {event.joined ? (
                      <button
                        className="px-4 py-2 rounded bg-red-100 text-red-700 font-bold"
                        onClick={() => handleLeave(event.id)}
                      >
                        Покинуть
                      </button>
                    ) : (
                      <button
                        className="px-4 py-2 rounded bg-teal-600 text-white font-bold"
                        onClick={() => handleJoin(event.id)}
                      >
                        Присоединиться
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
} 