import { useState } from 'react';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    // Create array of day numbers for current month
    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    // Create array with empty slots for days before first day of month
    const emptySlots = [];
    for (let i = 0; i < firstDay; i++) {
      emptySlots.push(null);
    }

    // Combine empty slots and days
    const calendarDays = [...emptySlots, ...daysArray];

    // Sample scheduled posts data
    const scheduledPosts = {
      15: { count: 2, platforms: ['facebook', 'twitter'] },
      20: { count: 1, platforms: ['instagram'] }
    };

    return (
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <div key={day} className="text-center font-semibold py-2">
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => (
          <div 
            key={index} 
            className={`border rounded p-2 h-24 ${day === null ? 'bg-gray-50' : ''} ${
              selectedDate === day ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50'
            }`}
            onClick={() => day && setSelectedDate(day)}
          >
            {day && (
              <>
                <div className="text-right">{day}</div>
                {scheduledPosts[day] && (
                  <div className="mt-1 text-xs">
                    <div className="text-blue-600">{scheduledPosts[day].count} scheduled</div>
                    <div className="flex space-x-1 mt-1">
                      {scheduledPosts[day].platforms.map(platform => (
                        <i 
                          key={platform} 
                          className={`fab fa-${platform} ${
                            platform === 'facebook' ? 'text-blue-500' : 
                            platform === 'twitter' ? 'text-blue-400' : 
                            'text-pink-500'
                          }`}
                        ></i>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3 className="text-xl font-semibold">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button 
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      {renderDays()}
      {selectedDate && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">
            Posts on {months[currentDate.getMonth()]} {selectedDate}, {currentDate.getFullYear()}
          </h4>
          <p className="text-sm text-gray-600">
            {selectedDate === 15 ? (
              <>
                <div className="mb-2">• New Product Launch (10:00 AM)</div>
                <div>• Weekly Newsletter (3:00 PM)</div>
              </>
            ) : selectedDate === 20 ? (
              "Instagram Story Update (1:30 PM)"
            ) : "No posts scheduled"}
          </p>
        </div>
      )}
    </div>
  );
}