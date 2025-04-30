import React, { useState } from 'react';

// Моки для интересов, категорий и т.д.
const INTEREST_CATEGORIES = [
  {
    name: 'Popular Interests',
    interests: ['Social', 'New in town', 'Fun Times', 'Social Networking', 'Outdoors', 'Make New Friends', 'New Technology', 'Fitness'],
  },
  {
    name: 'Social Activities',
    interests: ['Dining Out', 'Social Networking', 'Women\'s Social', 'New in town', 'Social', 'Fun Times', 'Singles'],
  },
  {
    name: 'Travel & Outdoor',
    interests: ['Weekend Adventures', 'Outdoors', 'Adventure', 'Outdoor Adventures', 'Hiking', 'Travel', 'Outdoor Fitness'],
  },
  {
    name: 'Sports & Fitness',
    interests: ['Walking', 'Sports and Recreation', 'Fitness', 'Recreational Sports', 'Weight Loss', 'Group Fitness Training', 'Exercise'],
  },
  {
    name: 'Identity & Language',
    interests: ['English as a Second Language', 'LGBT', 'English Language', 'Culture Exchange', 'Language Exchange', 'Language & Culture', 'International Friends'],
  },
  {
    name: 'Technology',
    interests: ['New Technology', 'Software Development', 'Web Development', 'Computer Programming', 'Web Technology', 'Technology Startups', 'Open Source'],
  },
  {
    name: 'Career & Business',
    interests: ['Business Strategy', 'Entrepreneurship', 'Entrepreneur Networking', 'Professional Development', 'Professional & Bussiness Networking', 'Startup Businesses', 'Small Business'],
  },
  {
    name: 'Hobbies & Passions',
    interests: ['Wine', 'Film', 'Watching Movies', 'Reading', 'Book Club', 'Photography', 'Crafts'],
  },
  {
    name: 'Science & Education',
    interests: ['Science', 'Education', 'Learning', 'Workshops', 'Lectures'],
  },
];

const GENDERS = ['Woman', 'Man', 'Non-binary', 'Prefer not to say'];

export default function OnboardingStepper({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [birthDate, setBirthDate] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  // Step 1: Interests
  function handleInterestToggle(interest: string) {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : prev.length < 3
        ? [...prev, interest]
        : prev
    );
  }

  // Step 2: Birthdate
  // Step 3: Gender
  // Step 4: Finish

  function nextStep() {
    setStep((s) => s + 1);
  }
  function prevStep() {
    setStep((s) => Math.max(0, s - 1));
  }

  // Step rendering
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        {step === 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Выберите интересы</h2>
            <p className="mb-2 text-gray-500">Выберите минимум 3 интереса</p>
            <div className="space-y-4 max-h-72 overflow-y-auto mb-4">
              {INTEREST_CATEGORIES.map((cat) => (
                <div key={cat.name}>
                  <div className="font-semibold mb-1">{cat.name}</div>
                  <div className="flex flex-wrap gap-2">
                    {cat.interests.map((interest) => (
                      <button
                        key={interest}
                        className={`px-3 py-1 rounded-full border ${selectedInterests.includes(interest) ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        onClick={() => handleInterestToggle(interest)}
                        disabled={
                          !selectedInterests.includes(interest) && selectedInterests.length >= 3
                        }
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="mt-4 w-full py-2 rounded bg-teal-600 text-white font-bold disabled:bg-gray-300"
              disabled={selectedInterests.length < 3}
              onClick={nextStep}
            >
              Далее
            </button>
          </>
        )}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Дата рождения</h2>
            <input
              type="date"
              className="border rounded px-3 py-2 w-full mb-4"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
            <div className="flex justify-between">
              <button className="px-4 py-2 rounded bg-gray-200" onClick={prevStep}>Назад</button>
              <button
                className="px-4 py-2 rounded bg-teal-600 text-white font-bold disabled:bg-gray-300"
                disabled={!birthDate}
                onClick={nextStep}
              >
                Далее
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Пол</h2>
            <div className="space-y-2 mb-4">
              {GENDERS.map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={gender === g}
                    onChange={() => setGender(g)}
                  />
                  {g}
                </label>
              ))}
            </div>
            <div className="flex justify-between">
              <button className="px-4 py-2 rounded bg-gray-200" onClick={prevStep}>Назад</button>
              <button
                className="px-4 py-2 rounded bg-teal-600 text-white font-bold disabled:bg-gray-300"
                disabled={!gender}
                onClick={nextStep}
              >
                Далее
              </button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Онбординг завершён!</h2>
            <div className="mb-4">Спасибо за ответы. Ваш профиль будет настроен по вашим предпочтениям.</div>
            <button
              className="w-full py-2 rounded bg-teal-600 text-white font-bold"
              onClick={onFinish}
            >
              Перейти в профиль
            </button>
          </>
        )}
      </div>
    </div>
  );
} 