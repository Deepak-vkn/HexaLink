import React from 'react';

interface Post {
  _id: string;
  userId: string;
  likes: any[];
  image: string | null;
  caption: string;
  comments: any[];
  postAt: string;
  __v: number;
}

interface PostsProps {
  posts: Post[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="relative max-w-screen-md py-6 px-4 mx-auto bg-white shadow-md rounded-xl">
          {/* User Info Section */}
          <div className="flex items-center mb-4">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src="https://via.placeholder.com/150"
              alt="User profile"
            />
            <div className="ml-3">
              <h4 className="font-semibold text-blue-gray-900">You</h4>
              <p className="text-gray-500 text-sm">{new Date(post.postAt).toLocaleString()}</p>
            </div>
          </div>
          {/* Post Content */}
          <div className="relative flex flex-col mb-4 overflow-hidden text-gray-700 bg-white rounded-lg bg-clip-border">
            {post.image ? (
              <>
                <img
                  alt="Post"
                  className="h-[32rem] w-full object-contain object-center"
                  src={post.image}
                />
                {/* Icons */}
                <div className="flex justify-center mt-2"> {/* Adjusted margin-top */}
                  <div className="flex space-x-4 bg-gray-100 py-1 px-4 rounded-full shadow-lg ">
                    <button className="p-2 rounded-full bg">
                      <img
                        src="/src/Public/like.png"
                        alt="Like"
                        className="w-6 h-6"
                      />
                    </button>
                    <button className="p-2 rounded-full">
                      <img
                        src="/src/Public/comment.png"
                        alt="Comment"
                        className="w-6 h-6"
                      />
                    </button>
                    <button className="p-2 rounded-full">
                      <img
                        src="/src/Public/save.png"
                        alt="Save"
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="relative flex flex-col mb-4 overflow-hidden text-gray-700 bg-white rounded-lg bg-clip-border">
                <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  No image available
                </p>
              </div>
            )}
            {/* Post Text */}
            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700 mt-4">
              {post.caption}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
