import React, { useState } from 'react';
import UserNavbar from '../components/UserNavbar';

const ALL_INTERESTS = [
  'New Technology', 'Travel', 'Games', 'Computer Programming', 'Weekend Adventures',
  'Sports', 'Fitness', 'Reading', 'Photography', 'Music', 'Movies', 'Art',
];

const initialInterests = ['New Technology', 'Travel', 'Games'];

export default function InterestsPage() {
  const [interests, setInterests] = useState<string[]>(initialInterests);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState<string[]>(interests);

  function toggleInterest(interest: string) {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  }

  function handleSave() {
    setInterests(selected);
    setEdit(false);
  }

  return (
    <>
      <UserNavbar />
      <div className="max-w-2xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Мои интересы</h2>
        {edit ? (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {ALL_INTERESTS.map((interest) => (
                <button
                  key={interest}
                  className={`px-3 py-1 rounded-full border ${selected.includes(interest) ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
            <button className="px-6 py-2 rounded bg-teal-600 text-white font-bold mr-2" onClick={handleSave}>Сохранить</button>
            <button className="px-6 py-2 rounded bg-gray-200 font-bold" onClick={() => setEdit(false)}>Отмена</button>
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {interests.map((interest) => (
                <span key={interest} className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm">{interest}</span>
              ))}
            </div>
            <button className="px-6 py-2 rounded bg-teal-600 text-white font-bold" onClick={() => { setSelected(interests); setEdit(true); }}>Редактировать</button>
          </>
        )}
      </div>
    </>
  );
} 