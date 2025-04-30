import React, { useState } from 'react';
import UserNavbar from '../components/UserNavbar';

const mockGroups = [
  { id: 1, name: 'React Developers', members: 120, joined: true },
  { id: 2, name: 'Frontend Enthusiasts', members: 80, joined: false },
  { id: 3, name: 'Athens AI Meetup', members: 45, joined: false },
  { id: 4, name: 'Travel Lovers', members: 200, joined: true },
];

export default function GroupsPage() {
  const [groups, setGroups] = useState(mockGroups);

  function handleJoin(id: number) {
    setGroups(groups.map(g => g.id === id ? { ...g, joined: true } : g));
  }
  function handleLeave(id: number) {
    setGroups(groups.map(g => g.id === id ? { ...g, joined: false } : g));
  }

  return (
    <>
      <UserNavbar />
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Мои группы</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map(group => (
            <div key={group.id} className="border rounded p-6 flex flex-col justify-between">
              <div>
                <div className="font-bold text-lg mb-1">{group.name}</div>
                <div className="text-gray-500 text-sm mb-2">{group.members} участников</div>
              </div>
              <div>
                {group.joined ? (
                  <button
                    className="px-4 py-2 rounded bg-red-100 text-red-700 font-bold w-full mt-2"
                    onClick={() => handleLeave(group.id)}
                  >
                    Покинуть
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 rounded bg-teal-600 text-white font-bold w-full mt-2"
                    onClick={() => handleJoin(group.id)}
                  >
                    Присоединиться
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 