import React, { useState } from 'react';
import UserNavbar from '../components/UserNavbar';

// Моки для профиля пользователя (в реальном проекте — данные из API или localStorage)
const mockProfile = {
  name: 'Имя пользователя',
  email: 'user@email.com',
  interests: ['New Technology', 'Travel', 'Games'],
  birthDate: '2000-01-01',
  gender: 'Man',
  avatar: '',
};

export default function UserProfile() {
  const [profile, setProfile] = useState(mockProfile);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(profile);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave() {
    setProfile(form);
    setEdit(false);
  }

  return (
    <>
      <UserNavbar />
      <div className="max-w-2xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold">
            {profile.avatar || profile.name[0]}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
            <div className="text-gray-500">{profile.email}</div>
          </div>
        </div>
        {edit ? (
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Имя</label>
              <input name="name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
            </div>
            <div>
              <label className="block mb-1">Дата рождения</label>
              <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
            </div>
            <div>
              <label className="block mb-1">Пол</label>
              <select name="gender" value={form.gender} onChange={handleChange} className="border rounded px-3 py-2 w-full">
                <option value="Man">Мужчина</option>
                <option value="Woman">Женщина</option>
                <option value="Non-binary">Другое</option>
                <option value="Prefer not to say">Не указывать</option>
              </select>
            </div>
            <button className="mt-4 px-6 py-2 rounded bg-teal-600 text-white font-bold" onClick={handleSave}>Сохранить</button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <span className="font-semibold">Дата рождения:</span> {profile.birthDate}
            </div>
            <div>
              <span className="font-semibold">Пол:</span> {profile.gender}
            </div>
            <div>
              <span className="font-semibold">Интересы:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.interests.map((i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm">{i}</span>
                ))}
              </div>
            </div>
            <button className="mt-4 px-6 py-2 rounded bg-teal-600 text-white font-bold" onClick={() => setEdit(true)}>Редактировать</button>
          </div>
        )}
      </div>
    </>
  );
} 