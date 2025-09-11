import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/reel.css"
import ReelFeed from './ReelFeed';

const Home = () => {
  const [videos, setVideos] = useState([]);
 
  // Fetch videos on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/food", {
          withCredentials: true
        });
        console.log(response.data);
        setVideos(response.data.foodItems || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Handle like/unlike video
  const likeVideo = async (item) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: item._id },
        { withCredentials: true }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, likeCount: v.likeCount + (response.data.like ? 1 : -1) }
            : v
        )
      );

      console.log(response.data.like ? "Video liked" : "Video unliked");
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  // Handle save/unsave video
  const saveVideo = async (item) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: item._id },
        { withCredentials: true }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, savesCount: v.savesCount + (response.data.save ? 1 : -1) }
            : v
        )
      );
    } catch (error) {
      console.error("Error saving video:", error);
    }
  };

  return (
    <ReelFeed
      items={videos}
      onLike={likeVideo}
      onSave={saveVideo}
      emptyMessage="No videos available."
    />
  );
};

export default Home;
