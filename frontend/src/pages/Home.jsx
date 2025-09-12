import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/reel.css';
import ReelFeed from '../components/ReelFeed';
import VisitorStore from '../components/VisitorStore';
import Navbar from '../components/Navbar';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [storeItems, setStoreItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Home component mounted'); // Debugging log
    const fetchVideos = async () => {
      try {
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
        setError('Failed to load videos. Please try again later.');
      }
    };

    const fetchStoreItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/food');
        console.log('Fetched store items:', response.data);
        const items = response.data.foodItems || [];
        setStoreItems(items);
        setError(null);
      } catch (error) {
        console.error('Error fetching store items:', error);
        setError('Failed to load store items. Please try again later.');
      }
    };

    fetchVideos();
    fetchStoreItems();
  }, []);

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
      setError('Failed to like/unlike video.');
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
      setError('Failed to save/unsave video.');
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      {error && <div className="error-message">{error}</div>}
      <VisitorStore items={storeItems} />
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