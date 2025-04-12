import Profile from '../components/Profile';

export default function ProfilePage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <Profile />
      </div>
    </div>
  );
}