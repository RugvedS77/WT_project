import { useState } from 'react';
import SettingsNavigation from '../components/Settings/SettingsNavigation';
import SettingsTabs from '../components/Settings/SettingsTabs';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Account');

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <i className="fas fa-cog mr-3"></i> Account Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SettingsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <SettingsTabs activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}