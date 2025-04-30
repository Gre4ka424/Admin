import React, { useState } from 'react';
import UserNavbar from '../components/UserNavbar';

// Моки событий для календаря
const mockEvents = [
  { id: 1, title: 'React Meetup', date: '2024-05-01' },
  { id: 2, title: 'Hackathon', date: '2024-05-10' },
  { id: 3, title: 'Frontend Conf', date: '2024-04-20' },
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState('');

  const eventsForDate = selectedDate
    ? mockEvents.filter(e => e.date === selectedDate)
    : [];

  return (
    <>
      <UserNavbar />
      <div className="max-w-2xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Календарь событий</h2>
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Выберите дату</label>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <h3 className="font-semibold mb-2">События на выбранную дату</h3>
          {eventsForDate.length === 0 ? (
            <div className="text-gray-500">Нет событий</div>
          ) : (
            <ul className="space-y-2">
              {eventsForDate.map(event => (
                <li key={event.id} className="border rounded p-3">
                  <div className="font-bold">{event.title}</div>
                  <div className="text-gray-500 text-sm">{event.date}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
} 