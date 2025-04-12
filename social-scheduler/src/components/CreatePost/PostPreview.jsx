export default function PostPreview({ content = '' }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Post Preview</h3>
      <div className="border rounded-lg p-4">
        <div className="flex items-center mb-4">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <p className="font-medium">Sarah Johnson</p>
            <p className="text-xs text-gray-500">Just now</p>
          </div>
        </div>
        <p className="mb-4">{content || 'Your post content will appear here...'}</p>
        <div className="border-t pt-3 flex justify-between text-gray-500">
          <button className="flex items-center hover:text-blue-500">
            <i className="far fa-thumbs-up mr-1"></i> Like
          </button>
          <button className="flex items-center hover:text-blue-500">
            <i className="far fa-comment mr-1"></i> Comment
          </button>
          <button className="flex items-center hover:text-blue-500">
            <i className="far fa-share-square mr-1"></i> Share
          </button>
        </div>
      </div>
    </div>
  );
}