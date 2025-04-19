import React from 'react';

export default function PostPreview({ content, image, platforms, scheduledTime }) {
  return (
    <div className="space-y-4">
      {platforms.map(platform => (
        <div key={platform} className="border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <i className={`fab fa-${platform.toLowerCase()} text-xl`}></i>
            <span className="font-medium capitalize">{platform}</span>
          </div>
          
          <div className="space-y-3">
            <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
            
            {image && (
              <div className="mt-2">
                <img
                  src={image}
                  alt="Post preview"
                  className="max-h-48 rounded-lg object-cover"
                />
              </div>
            )}
            
            {scheduledTime && (
              <p className="text-sm text-gray-500">
                Scheduled for: {new Date(scheduledTime).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}