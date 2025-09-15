import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/reel.css';
import ReelFeed from '../components/ReelFeed';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

const Saved = () => {
  const [savedVideos, setSavedVideos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Saved component mounted');
    const fetchSavedVideos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/food/save', { 
          withCredentials: true 
        });
        console.log('Fetched saved videos:', response.data);
        
        const savedItems = response.data.savedFoods || [];
        const videosWithUrl = savedItems.map(savedItem => ({
          ...savedItem.food,
          video: savedItem.food.video || '',
          likeCount: savedItem.food.likeCount || 0,
          savesCount: savedItem.food.savesCount || 0,
        }));
        
        setSavedVideos(videosWithUrl);
        setError(null);
      } catch (error) {
        console.error('Error fetching saved videos:', error);
        if (error.response?.status === 401) {
          setError('Please log in to view your saved videos.');
          navigate('/user/login');
        } else {
          setError('Failed to load saved videos. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedVideos();
  }, [navigate]);

  const likeVideo = async (item) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/food/like',
        { foodId: item._id },
        { withCredentials: true }
      );

      setSavedVideos((prev) =>
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
        setError('Please log in to like videos.');
        navigate('/user/login');
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

      // If unsaved, remove from saved list
      if (!response.data.save) {
        setSavedVideos((prev) => prev.filter((v) => v._id !== item._id));
      } else {
        setSavedVideos((prev) =>
          prev.map((v) =>
            v._id === item._id
              ? { ...v, savesCount: v.savesCount + 1 }
              : v
          )
        );
      }
      console.log(response.data.save ? 'Video saved' : 'Video unsaved');
    } catch (error) {
      console.error('Error saving video:', error);
      if (error.response?.status === 401) {
        setError('Please log in to save videos.');
        navigate('/user/login');
      } else {
        setError('Failed to save/unsave video.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="home-container">
        <Navbar />
        <div className="empty-state">Loading your saved videos...</div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="home-container">
      <Navbar />
      {error && <div className="error-message">{error}</div>}
      <ReelFeed
        items={savedVideos}
        onLike={likeVideo}
        onSave={saveVideo}
        emptyMessage="No saved videos yet. Start exploring and save your favorites!"
      />
      <BottomNav />
    </div>
  );
};

export default Saved;