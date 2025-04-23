import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useScrollTrigger,
  Slide,
  Tooltip,
  Zoom,
  tooltipClasses,
  TooltipProps,
} from '@mui/material';
import {
  Menu as MenuIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  PlayArrow,
  Pause,
} from '@mui/icons-material';
import { useColorMode } from '../App';
import { styled } from '@mui/material/styles';

const navItems = ['Home', 'Work', 'Services', 'Skills', 'About', 'Contact'];

interface HideOnScrollProps {
  children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

interface HeaderProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

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

const Header = ({ isPlaying, onTogglePlay }: HeaderProps) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const { mode, toggleColorMode } = useColorMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPlayTooltip, setShowPlayTooltip] = useState(false);
  const [showThemeTooltip, setShowThemeTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check if user has seen tooltips before
    const hasSeenTooltips = localStorage.getItem('hasSeenTooltips');
    if (!hasSeenTooltips) {
      // Show play tooltip first
      setTimeout(() => setShowPlayTooltip(true), 1000);
      // Show theme tooltip after play tooltip
      setTimeout(() => {
        setShowPlayTooltip(false);
        setShowThemeTooltip(true);
      }, 4000);
      // Hide theme tooltip
      setTimeout(() => {
        setShowThemeTooltip(false);
        localStorage.setItem('hasSeenTooltips', 'true');
      }, 7000);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: isScrolled
            ? mode === 'dark'
              ? 'rgba(15, 23, 42, 0.9)'
              : 'rgba(255, 255, 255, 0.9)'
            : 'transparent',
          transition: 'all 0.3s ease-in-out',
          borderBottom: isScrolled ? 1 : 0,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: isScrolled ? 64 : 80, transition: 'height 0.3s ease-in-out' }}>
            {/* Mobile menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <Tooltip 
                title="Menu" 
                open={showPlayTooltip}
                arrow
                TransitionComponent={Zoom}
              >
                <IconButton
                  size="large"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiPaper-root': {
                    backdropFilter: 'blur(10px)',
                    backgroundColor: mode === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item}
                    onClick={handleCloseNavMenu}
                    sx={{
                      '&:hover': {
                        backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                      },
                    }}
                  >
                    <ScrollLink
                      to={item.toLowerCase()}
                      smooth={true}
                      offset={-64}
                      style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                    >
                      <Typography textAlign="center">{item}</Typography>
                    </ScrollLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop menu */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {navItems.map((item) => (
                <ScrollLink
                  key={item}
                  to={item.toLowerCase()}
                  smooth={true}
                  offset={-64}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    sx={{
                      color: 'inherit',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '0%',
                        height: '2px',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#FFD700',
                        transition: 'width 0.3s ease-in-out',
                      },
                      '&:hover::after': {
                        width: '100%',
                      },
                    }}
                  >
                    {item}
                  </Button>
                </ScrollLink>
              ))}
            </Box>

            <Box
              sx={{
                position: 'absolute',
                right: 16,
                display: 'flex',
                gap: 3,
                alignItems: 'center',
              }}
            >
              <StyledTooltip
                title={
                  <Typography sx={{ lineHeight: 1.5 }}>
                    {isPlaying 
                      ? "Exit presentation mode"
                      : "Start guided tour with music\nUse Space to play/pause\nArrow keys to navigate"}
                  </Typography>
                }
                open={showPlayTooltip}
                arrow
                placement="bottom"
                TransitionComponent={Zoom}
                enterDelay={100}
                leaveDelay={200}
              >
                <IconButton
                  onClick={onTogglePlay}
                  sx={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
              </StyledTooltip>
              <StyledTooltip
                title={
                  <Typography>
                    Switch to {mode === 'dark' ? 'light' : 'dark'} mode
                  </Typography>
                }
                open={showThemeTooltip}
                arrow
                placement="bottom"
                TransitionComponent={Zoom}
                enterDelay={100}
                leaveDelay={200}
              >
                <IconButton
                  onClick={toggleColorMode}
                  sx={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </StyledTooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header; 