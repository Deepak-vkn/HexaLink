import React from 'react';

interface NoContentProps {
  title: string;
}

const NoContent: React.FC<NoContentProps> = ({ title }) => {
  return (
    <div>
      <div className="text-center mt-10 bg-white p-6 rounded-lg shadow">
        <img
          src="/api/placeholder/400/300"
          alt="Connect with professionals"
          className="mx-auto mb-4 rounded-lg"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>

        {title === 'No posts yet!' ? (
          <>
            <p className="text-gray-600 mb-4">
              Start connecting with professionals to see their latest updates and opportunities.
            </p>
            <p className="text-gray-500">
              Follow industry leaders, companies, and colleagues to fill your feed with relevant content.
            </p>
            <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Discover People to Follow
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              You will see updates about your connections and activities here.
            </p>
            <p className="text-gray-500">
              Stay connected to stay informed about the latest notifications.
            </p>
            <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Explore Notifications
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NoContent;
