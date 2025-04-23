import { useState, useRef, useEffect } from 'react';
import {
  IconButton,
  Box,
  Typography,
  LinearProgress,
  Tooltip,
  Zoom,
  tooltipClasses,
  TooltipProps,
} from '@mui/material';
import { PlayArrow, Pause, NavigateNext, NavigateBefore, Close } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Work from './Work';
import Services from './Services';
import Contact from './Contact';

const AUTO_ADVANCE_DURATION = 7000; // 10 seconds per slide
const TRANSITION_DURATION = 0.5;
const MUSIC_START_TIME = 60; // Start music from 20 seconds

const sections = [
  { id: 'hero', component: (props: any) => <Hero {...props} isPresentationMode={true} />, title: 'Welcome' },
  { id: 'about', component: About, title: 'About Me' },
  { id: 'skills', component: Skills, title: 'Skills' },
  { id: 'work', component: Work, title: 'My Work' },
  { id: 'services', component: Services, title: 'Services' },
  { id: 'contact', component: Contact, title: 'Contact' },
];

interface PortfolioPresentationProps {
  onExit: () => void;
}

// Add type for progressInterval
type ProgressIntervalType = ReturnType<typeof setInterval> | null;

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    color: '#fff',
    fontSize: '0.875rem',
    borderRadius: '8px',
    padding: '8px 16px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'rgba(15, 23, 42, 0.95)',
    '&::before': {
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
  },
}));

const PortfolioPresentation = ({ onExit }: PortfolioPresentationProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showTooltips, setShowTooltips] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<ProgressIntervalType>(null);

  useEffect(() => {
    const musicPreference = localStorage.getItem('musicPreference');
    
    if (!audioRef.current) {
      audioRef.current = new Audio('/music/background-music.mp3');
      audioRef.current.loop = true;
    }

    // Always set the time to 20 seconds when initializing
    audioRef.current.currentTime = MUSIC_START_TIME;

    if (musicPreference !== 'off') {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          startAutoAdvance();
        })
        .catch(() => setIsPlaying(false));
    }

    // Add keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          prevSection();
          break;
        case 'ArrowRight':
          nextSection();
          break;
        case 'Escape':
          onExit();
          break;
        case ' ':
          togglePlay();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Show tooltips in sequence
    const tooltipSequence = [
      { id: 'exit', delay: 1000 },
      { id: 'play', delay: 3000 },
      { id: 'progress', delay: 5000 },
      { id: 'navigation', delay: 7000 },
    ];

    setShowTooltips(true);

    tooltipSequence.forEach(({ id, delay }) => {
      setTimeout(() => {
        setActiveTooltip(id);
      }, delay);
    });

    // Hide all tooltips after sequence
    setTimeout(() => {
      setShowTooltips(false);
      setActiveTooltip(null);
    }, 9000);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.removeEventListener('keydown', handleKeyDown);
      stopAutoAdvance();
    };
  }, []);

  const startAutoAdvance = () => {
    stopAutoAdvance();
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSection();
          return 0;
        }
        return prev + (100 / (AUTO_ADVANCE_DURATION / 100));
      });
    }, 100);
  };

  const stopAutoAdvance = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      localStorage.setItem('musicPreference', 'off');
      stopAutoAdvance();
    } else {
      // Always set the time to 20 seconds when playing
      audioRef.current.currentTime = MUSIC_START_TIME;
      audioRef.current.play();
      localStorage.setItem('musicPreference', 'on');
      startAutoAdvance();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSection = () => {
    setProgress(0);
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setProgress(0);
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const CurrentComponent = sections[currentSection].component;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'background.default',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 2,
          display: 'flex',
          gap: 2,
        }}
      >
        <StyledTooltip
          title={
            <Typography>
              Press Esc or click here to exit presentation mode
            </Typography>
          }
          open={showTooltips && activeTooltip === 'exit'}
          arrow
          placement="left"
          TransitionComponent={Zoom}
        >
          <IconButton
            onClick={onExit}
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'action.hover',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <Close />
          </IconButton>
        </StyledTooltip>
        <StyledTooltip
          title={
            <Typography>
              Press Space to play/pause the music
            </Typography>
          }
          open={showTooltips && activeTooltip === 'play'}
          arrow
          placement="left"
          TransitionComponent={Zoom}
        >
          <Box>
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
                    bgcolor: 'background.paper',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.2s ease-in-out',
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
          </Box>
        </StyledTooltip>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          zIndex: 2,
          width: '80%',
          maxWidth: 600,
        }}
      >
        <StyledTooltip
          title={
            <Typography>
              Shows progress through current section
            </Typography>
          }
          open={showTooltips && activeTooltip === 'progress'}
          arrow
          placement="top"
          TransitionComponent={Zoom}
        >
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              width: '100%',
              height: 4,
              borderRadius: 2,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 2,
              },
            }}
          />
        </StyledTooltip>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <StyledTooltip
            title={
              <Typography>
                Use Left Arrow or click here for previous section
              </Typography>
            }
            open={showTooltips && activeTooltip === 'navigation'}
            arrow
            placement="top"
            TransitionComponent={Zoom}
          >
            <IconButton
              onClick={prevSection}
              sx={{
                bgcolor: 'background.paper',
                '&:hover': {
                  bgcolor: 'action.hover',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <NavigateBefore />
            </IconButton>
          </StyledTooltip>
          <Typography variant="h6" sx={{ color: 'text.primary', minWidth: 120, textAlign: 'center' }}>
            {sections[currentSection].title}
          </Typography>
          <StyledTooltip
            title={
              <Typography>
                Use Right Arrow or click here for next section
              </Typography>
            }
            open={showTooltips && activeTooltip === 'navigation'}
            arrow
            placement="top"
            TransitionComponent={Zoom}
          >
            <IconButton
              onClick={nextSection}
              sx={{
                bgcolor: 'background.paper',
                '&:hover': {
                  bgcolor: 'action.hover',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <NavigateNext />
            </IconButton>
          </StyledTooltip>
        </Box>
      </Box>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: TRANSITION_DURATION }}
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '80px 20px',
            overflow: 'auto',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <CurrentComponent />
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default PortfolioPresentation; 