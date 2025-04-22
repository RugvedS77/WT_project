import PostCreation from '../components/CreatePost/PostCreation';
import PostPreview from '../components/CreatePost/PostPreview';

export default function CreatePostPage() {
  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          <PostCreation />
        </div>
      </div>
    </div>
  );
}