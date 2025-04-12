import WelcomeSection from '../components/Dashboard/WelcomeSection';
import ConnectedAccounts from '../components/Dashboard/ConnectAccounts';
import QuickStats from '../components/Dashboard/QuickStats';
import RecentActivity from '../components/Dashboard/RecentActivity';
import { useEffect } from 'react';

export default function DashboardPage() {

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <WelcomeSection />
      <ConnectedAccounts />
      <QuickStats />
      <RecentActivity />
    </div>
  );
}