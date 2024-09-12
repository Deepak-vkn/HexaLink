import React, { useEffect, useState } from 'react';
import Posts from '../../Components/user/posts';
import { getUserPosts } from '../../api/user/get';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import Loading from '../../Components/loading';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [isLoading, setIsLoading] = useState(false); 
  useEffect(() => {
    console.log('logged user is ',user)
    
    const fetchPosts = async () => {
      if (user && user._id) {
        setIsLoading(true);
        try {
          console.log('Fetching posts for userId:', user);
          const postsData = await getUserPosts(user._id);

          console.log('PostsData:', postsData);

          if (postsData.success) {
            setPosts(postsData.posts || []);
          }
          //  else {
          //   alert(postsData.message || 'No posts found.');
          // }
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
        finally {
          setIsLoading(false); 
        }
      }
    };

    fetchPosts();
  }, [user?._id]); 

  console.log('Posts state:', posts);

  return (
    <div>

{isLoading ? (
        <Loading /> 
      ) : (
        <Posts posts={posts} user={user} isUser={true}/>
      )}
      
    </div>
  );
}

export default UserPosts;
