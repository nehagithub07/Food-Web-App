import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import the auth context
import { useNavigate } from 'react-router-dom'; // For redirecting to login
import '../styles/reel.css';
import ReelFeed from '../components/ReelFeed';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Check authentication status
        await checkAuth();
        if (!isAuthenticated) {
          setError('Please log in to view videos.');
          navigate('/login'); // Redirect to login page
          return;
        }

        const response = await axios.get('http://localhost:3000/api/food', { withCredentials: true });
        console.log('Fetched videos:', response.data);
        const items = response.data.foodItems || [];
        const videosWithUrl = items.map(item => ({
          ...item,
          video: item.video || (item.videos && item.videos[0]) || '',
          likeCount: item.likeCount || 0,
          savesCount: item.savesCount || 0,
        }));
        setVideos(videosWithUrl);
        setError(null);
      } catch (error) {
        console.error('Error fetching videos:', error);
        if (error.response?.status === 401) {
          setError('Unauthorized: Please log in to view videos.');
          navigate('/login');
        } else {
          setError('Failed to load videos. Please try again later.');
        }
      }
    };

    fetchVideos();
  }, [isAuthenticated, checkAuth, navigate]);

  const likeVideo = async (item) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/food/like',
        { foodId: item._id },
        { withCredentials: true }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, likeCount: response.data.like ? v.likeCount + 1 : v.likeCount - 1 }
            : v
        )
      );
      console.log(response.data.like ? 'Video liked' : 'Video unliked');
    } catch (error) {
      console.error('Error liking video:', error);
      if (error.response?.status === 401) {
        setError('Unauthorized: Please log in to like videos.');
        navigate('/login');
      } else {
        setError('Failed to like/unlike video.');
      }
    }
  };

  const saveVideo = async (item) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/food/save',
        { foodId: item._id },
        { withCredentials: true }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, savesCount: response.data.save ? v.savesCount + 1 : v.savesCount - 1 }
            : v
        )
      );
      console.log(response.data.save ? 'Video saved' : 'Video unsaved');
    } catch (error) {
      console.error('Error saving video:', error);
      if (error.response?.status === 401) {
        setError('Unauthorized: Please log in to save videos.');
        navigate('/login');
      } else {
        setError('Failed to save/unsave video.');
      }
    }
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <ReelFeed
        items={videos}
        onLike={likeVideo}
        onSave={saveVideo}
        emptyMessage="No videos available."
      />
    </div>
  );
};

export default Home;