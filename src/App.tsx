import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { ThemeProvider, CssBaseline, Box, useMediaQuery, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { PlayArrow, Pause, Close } from '@mui/icons-material';
import Header from './components/Header';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import Skills from './components/Skills';
import Services from './components/Services';
import PortfolioPresentation from './components/PortfolioPresentation';
import { light, dark } from './theme';

type ColorMode = 'light' | 'dark';

interface ColorModeContextType {
  mode: ColorMode;
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isMobile = useMediaQuery('(max-width:600px)');
  const [mode, setMode] = useState<ColorMode>(prefersDarkMode ? 'dark' : 'light');
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMobileDialog, setShowMobileDialog] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('colorMode') as ColorMode | null;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('colorMode', newMode);
      },
    }),
    [mode]
  );

  const theme = useMemo(() => (mode === 'light' ? light : dark), [mode]);

  const togglePlay = () => {
    if (isMobile) {
      setShowMobileDialog(true);
      return;
    }

    if (isPlaying) {
      setIsPlaying(false);
      setIsPresentationMode(false);
    } else {
      setIsPlaying(true);
      setIsPresentationMode(true);
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          transition: theme.transitions.create(['background-color', 'color'], {
            duration: theme.transitions.duration.standard,
          }),
        }}>
          <Header isPlaying={isPlaying} onTogglePlay={togglePlay} />
          <Box component="main">
            {isPresentationMode ? (
              <PortfolioPresentation onExit={() => {
                setIsPresentationMode(false);
                setIsPlaying(false);
              }} />
            ) : (
              <>
                <IconButton
                  onClick={togglePlay}
                  sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    bgcolor: 'background.paper',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
                <Dialog
                  open={showMobileDialog}
                  onClose={() => setShowMobileDialog(false)}
                  PaperProps={{
                    sx: {
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: 'divider',
                    }
                  }}
                >
                  <DialogTitle sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    pb: 1
                  }}>
                    <Typography variant="h6" component="div">
                      Mobile View Notice
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => setShowMobileDialog(false)}
                      sx={{ color: 'text.secondary' }}
                    >
                      <Close />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      For the best experience, we recommend viewing this presentation on a desktop or tablet device.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      The presentation mode includes animations and interactive elements that are optimized for larger screens.
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button 
                      onClick={() => setShowMobileDialog(false)}
                      sx={{ 
                        color: 'primary.main',
                        '&:hover': {
                          bgcolor: 'action.hover'
                        }
                      }}
                    >
                      Got it
                    </Button>
                  </DialogActions>
                </Dialog>
                <Hero />
                <Work />
                <About />
                <Services />
                <Skills />
                <Contact />
              </>
            )}
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
