import Calendar from '../components/Calendar';

export default function CalendarPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <i className="far fa-calendar-alt mr-3"></i> Post Calendar
          </h2>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center">
            <i className="fas fa-plus mr-2"></i> New Post
          </button>
        </div>
        <Calendar />
      </div>
    </div>
  );
}