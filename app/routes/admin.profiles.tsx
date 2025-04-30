// @ts-ignore
import React, { useEffect, useState } from 'react';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  birth_date: string | null;
  gender: string | null;
  interests: string[];
  joined_groups: number[];
  onboarding_completed: boolean;
}

export default function AdminProfiles() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoading(true);
    // @ts-ignore
    fetch(`${import.meta.env.VITE_API_URL}/admin/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch user profiles');
      return res.json();
    })
    .then(data => {
      setProfiles(data);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
  };

  const handleSelectProfile = (profile: UserProfile) => {
    setSelectedProfile(profile);
    setEditData({
      birth_date: profile.birth_date,
      gender: profile.gender,
      interests: [...(profile.interests || [])],
      joined_groups: [...(profile.joined_groups || [])],
      onboarding_completed: profile.onboarding_completed
    });
    setEditMode(false);
  };

  const handleSaveProfile = () => {
    if (!selectedProfile) return;
    
    const token = localStorage.getItem('token');
    // @ts-ignore
    fetch(`${import.meta.env.VITE_API_URL}/api/profile/${selectedProfile.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(editData)
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to update profile');
      return res.json();
    })
    .then(() => {
      // Обновляем данные в списке
      setProfiles(profiles.map(p => 
        p.id === selectedProfile.id ? { ...p, ...editData } : p
      ));
      setSelectedProfile(prev => prev ? { ...prev, ...editData } : null);
      setEditMode(false);
      alert('Профиль успешно обновлен');
    })
    .catch(err => {
      alert(`Ошибка: ${err.message}`);
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  // Функция для форматирования даты
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Не указана';
    return new Date(dateString).toLocaleDateString();
  };

  // Функция для перевода пола на русский
  const translateGender = (gender?: string | null) => {
    if (!gender) return 'Не указан';
    const translations: {[key: string]: string} = {
      'male': 'Мужской',
      'female': 'Женский',
      'non-binary': 'Небинарный',
      'prefer-not-to-say': 'Предпочитает не указывать'
    };
    return translations[gender] || gender;
  };

  const renderProfileDetails = () => {
    if (!selectedProfile) return null;
    
    if (editMode) {
      return (
        <div className="border p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Редактирование профиля</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Дата рождения</label>
            <input 
              type="date" 
              className="border rounded px-3 py-2 w-full"
              value={editData.birth_date || ''} 
              onChange={e => handleInputChange('birth_date', e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Пол</label>
            <select 
              className="border rounded px-3 py-2 w-full"
              value={editData.gender || ''} 
              onChange={e => handleInputChange('gender', e.target.value)}
            >
              <option value="">Не выбрано</option>
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
              <option value="non-binary">Небинарный</option>
              <option value="prefer-not-to-say">Предпочитает не указывать</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Онбординг завершен</label>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2"
                checked={editData.onboarding_completed} 
                onChange={e => handleInputChange('onboarding_completed', e.target.checked)}
              />
              <span>Отметить как завершенный</span>
            </div>
          </div>
          
          <div className="flex gap-2 mt-6">
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleSaveProfile}
            >
              Сохранить
            </button>
            <button 
              className="border border-gray-300 px-4 py-2 rounded"
              onClick={() => setEditMode(false)}
            >
              Отмена
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="border p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Профиль пользователя</h3>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
            onClick={() => setEditMode(true)}
          >
            Редактировать
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          <div className="mb-2"><b>Имя пользователя:</b> {selectedProfile.username}</div>
          <div className="mb-2"><b>Email:</b> {selectedProfile.email}</div>
          <div className="mb-2"><b>Дата рождения:</b> {formatDate(selectedProfile.birth_date)}</div>
          <div className="mb-2"><b>Пол:</b> {translateGender(selectedProfile.gender)}</div>
          <div className="mb-2"><b>Статус онбординга:</b> {selectedProfile.onboarding_completed ? 'Завершен' : 'Не завершен'}</div>
          
          <div className="mb-2">
            <b>Интересы:</b>
            {selectedProfile.interests && selectedProfile.interests.length > 0 ? (
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedProfile.interests.map(interest => (
                  <span key={interest} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {interest}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-gray-500 ml-2">Не указаны</span>
            )}
          </div>
          
          <div className="mb-2">
            <b>Группы:</b>
            {selectedProfile.joined_groups && selectedProfile.joined_groups.length > 0 ? (
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedProfile.joined_groups.map(groupId => (
                  <span key={groupId} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Группа #{groupId}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-gray-500 ml-2">Не присоединился к группам</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Управление профилями пользователей</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Список пользователей */}
        <div className="md:col-span-1">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Пользователи</h3>
            <div className="divide-y">
              {profiles.map(profile => (
                <div 
                  key={profile.id}
                  className={`py-3 px-2 cursor-pointer hover:bg-gray-50 ${selectedProfile?.id === profile.id ? 'bg-blue-50' : ''}`}
                  onClick={() => handleSelectProfile(profile)}
                >
                  <div className="font-medium">{profile.username}</div>
                  <div className="text-sm text-gray-500">{profile.email}</div>
                  <div className="mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${profile.onboarding_completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {profile.onboarding_completed ? 'Онбординг завершен' : 'Онбординг не завершен'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Детали профиля */}
        <div className="md:col-span-2">
          {selectedProfile ? (
            renderProfileDetails()
          ) : (
            <div className="border p-4 rounded-lg flex items-center justify-center h-full">
              <p className="text-gray-500">Выберите пользователя для просмотра профиля</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 