import React, { useState } from 'react';

const PreferencesTab = () => {
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('Light');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Preferences</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Language</label>
          <select
            className="mt-1 border p-2 rounded w-full"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Theme</label>
          <select
            className="mt-1 border p-2 rounded w-full"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">Receive Email Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="w-5 h-5"
          />
        </div>
      </div>

      <button className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Save Preferences
      </button>
    </div>
  );
};

export default PreferencesTab;
