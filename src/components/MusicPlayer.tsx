import React, { useState, useRef, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const musicPreference = localStorage.getItem('musicPreference');
    
    // Only initialize audio if it hasn't been created yet
    if (!audioRef.current) {
      audioRef.current = new Audio('/music/background-music.mp3');
      audioRef.current.loop = true;
    }

    // Set initial time to 20 seconds
    audioRef.current.currentTime = 20;

    // Try to play if user hasn't explicitly turned it off
    if (musicPreference !== 'off') {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      localStorage.setItem('musicPreference', 'off');
    } else {
      audioRef.current.currentTime = 20;
      audioRef.current.play();
      localStorage.setItem('musicPreference', 'on');
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isPlaying ? 'playing' : 'paused'}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          onClick={togglePlay}
          sx={{
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          {isPlaying ? (
            <Pause sx={{ fontSize: 24 }} />
          ) : (
            <PlayArrow sx={{ fontSize: 24 }} />
          )}
        </IconButton>
      </motion.div>
    </AnimatePresence>
  );
};

export default MusicPlayer; 