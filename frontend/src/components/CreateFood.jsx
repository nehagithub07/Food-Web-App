 
import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/reel.css';
import Navbar from './Navbar';

const CreateFood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [fileError, setFileError] = useState('');
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const maxNameLength = 50;
  const maxDescriptionLength = 200;
  const maxFileSizeMB = 100;

  useEffect(() => {
    console.log('CreateFood component mounted');
    if (!videoFile) {
      setVideoURL('');
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    return () => {
      console.log('Revoking video URL');
      URL.revokeObjectURL(url);
    };
  }, [videoFile]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setVideoFile(null);
      setFileError('');
      return;
    }
    if (!file.type.startsWith('video/')) {
      setFileError('Please select a valid video file (MP4, WebM, MOV).');
      return;
    }
    if (file.size / 1024 / 1024 > maxFileSizeMB) {
      setFileError(`File size exceeds ${maxFileSizeMB}MB limit.`);
      return;
    }
    setFileError('');
    setVideoFile(file);
    console.log('Selected video file:', file.name);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      setFileError('Please drop a valid video file (MP4, WebM, MOV).');
      return;
    }
    if (file.size / 1024 / 1024 > maxFileSizeMB) {
      setFileError(`File size exceeds ${maxFileSizeMB}MB limit.`);
      return;
    }
    setFileError('');
    setVideoFile(file);
    console.log('Dropped video file:', file.name);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
    console.log('Opening file dialog');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('video', videoFile);

      console.log('Submitting form data:', { name, description, videoFileName: videoFile?.name });
      const response = await axios.post('http://localhost:3000/api/food', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Food created:', response.data);
      setName('');
      setDescription('');
      setVideoFile(null);
      setFileError('');
      navigate('/');
    } catch (error) {
      console.error('Error creating food:', error);
      setServerError(error.response?.data?.message || 'Failed to create food. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = useMemo(() => !name.trim() || !videoFile || isLoading, [name, videoFile, isLoading]);

  return (
    <div className="create-food-page">
      <Navbar />
      <div className="create-food-container" role="region" aria-labelledby="create-food-title">
        <header>
          <h1 id="create-food-title" className="create-food-title">Create Food Item</h1>
          <p className="create-food-subtitle">Upload a short video, give it a name, and add a description.</p>
        </header>

        <form className="create-food-form" onSubmit={onSubmit} noValidate>
          {serverError && <p className="error-message" role="alert">{serverError}</p>}

          <div className="field-group">
            <label htmlFor="foodVideo">Food Video</label>
            <input
              id="foodVideo"
              ref={fileInputRef}
              className="file-input-hidden"
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={onFileChange}
              aria-describedby="file-hint"
              aria-required="true"
            />

            <div
              className="file-dropzone"
              role="button"
              tabIndex={0}
              onClick={openFileDialog}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openFileDialog();
                }
              }}
              onDrop={onDrop}
              onDragOver={onDragOver}
              aria-describedby="file-hint"
            >
              <div className="file-dropzone-inner">
                <svg className="file-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M10.8 3.2a1 1 0 0 1 .4-.08h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v7.2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6.4a1 1 0 0 1 1-1h1.6V3.2a1 1 0 0 1 1-1h1.6a1 1 0 0 1 .6.2z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M9 12.75v-1.5c0-.62.67-1 1.2-.68l4.24 2.45c.53.3.53 1.05 0 1.35L10.2 16.82c-.53.31-1.2-.06-1.2-.68v-1.5"
                    fill="currentColor"
                  />
                </svg>
                <div className="file-dropzone-text">
                  <strong>Tap to upload</strong> or drag and drop
                </div>
                <div className="file-hint" id="file-hint">
                  MP4, WebM, MOV • Max {maxFileSizeMB}MB
                </div>
              </div>
            </div>

            {fileError && <p className="error-message" role="alert">{fileError}</p>}

            {videoFile && (
              <div className="file-chip" aria-live="polite">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9 12.75v-1.5c0-.62.67-1 1.2-.68l4.24 2.45c.53.3.53 1.05 0 1.35L10.2 16.82c-.53.31-1.2-.06-1.2-.68v-1.5" />
                </svg>
                <span className="file-chip-name">{videoFile.name}</span>
                <span className="file-chip-size">{(videoFile.size / 1024 / 1024).toFixed(1)} MB</span>
                <div className="file-chip-actions">
                  <button type="button" className="create-food-cancel" onClick={openFileDialog} disabled={isLoading}>
                    Change
                  </button>
                  <button
                    type="button"
                    className="create-food-cancel danger"
                    onClick={() => {
                      setVideoFile(null);
                      setFileError('');
                    }}
                    disabled={isLoading}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {videoURL && (
            <div className="video-preview">
              <video className="video-preview-el" src={videoURL} controls playsInline preload="metadata" aria-label="Video preview" />
            </div>
          )}

          <div className="field-group">
            <label htmlFor="foodName">
              Name{' '}
              <span className="char-count">
                ({name.length}/{maxNameLength})
              </span>
            </label>
            <input
              id="foodName"
              type="text"
              placeholder="e.g., Spicy Paneer Wrap"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, maxNameLength))}
              required
              aria-describedby="name-hint"
              aria-required="true"
            />
            <span className="small-note" id="name-hint">
              Maximum {maxNameLength} characters
            </span>
          </div>

          <div className="field-group">
            <label htmlFor="foodDesc">
              Description{' '}
              <span className="char-count">
                ({description.length}/{maxDescriptionLength})
              </span>
            </label>
            <textarea
              id="foodDesc"
              rows={4}
              placeholder="Write a short description: ingredients, taste, spice level, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, maxDescriptionLength))}
              aria-describedby="desc-hint"
              aria-required="true"
            />
            <span className="small-note" id="desc-hint">
              Maximum {maxDescriptionLength} characters
            </span>
          </div>

          <div className="form-actions">
            <button
              className="create-food-submit"
              type="submit"
              disabled={isDisabled}
              aria-busy={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Food'}
            </button>
            <button
              className="create-food-cancel"
              type="button"
              onClick={() => navigate('/')}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
 