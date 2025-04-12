import { useEffect, useState } from "react";

export default function QuickStats() {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch stats from the backend
  async function fetchStats() {
      try {
          const token = localStorage.getItem('token');
          if (!token) {
              setError('Authentication token not found.');
              setIsLoading(false);
              return;
          }

          const response = await fetch('http://localhost:3000/api/quick-stats', {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Failed to fetch stats');
          }

          const data = await response.json();
          setStats(data);
        } catch (err) {
            console.error('Error fetching stats:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchStats();
    }, []);

    if (isLoading) {
        return <div className="text-gray-500">Loading stats...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color} ${stat.textColor} mr-4`}>
                <i className={`fas fa-${stat.icon}`}></i>
              </div>
              <div>
                <p className="text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }