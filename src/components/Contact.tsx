import { Box, Container, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const socialLinks = [
    {
      icon: <GitHubIcon />,
      label: 'GitHub',
      url: 'https://github.com/seifsamehtolba',
    },
    {
      icon: <LinkedInIcon />,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ssitolba/',
    },
    {
      icon: <EmailIcon />,
      label: 'Email',
      url: 'mailto:contact@seiftolba.xyz',
    },
    {
      icon: <ChatIcon />,
      label: 'Discord',
      url: 'https://discord.gg/A4uCqGuB',
    },
  ];

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: { xs: 4, sm: 6 },
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: { xs: 3, sm: 4 },
          }}
        >
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h2"
            sx={{
              fontWeight: 700,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #60a5fa 30%, #3b82f6 90%)'
                : 'linear-gradient(45deg, #2563eb 30%, #1d4ed8 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              width: '100%',
            }}
          >
            Connect with Me
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.8,
              px: { xs: 2, sm: 0 },
            }}
          >
            Feel free to reach out through any of these platforms. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 1.5, sm: 2 },
              justifyContent: 'center',
              maxWidth: '600px',
              mx: 'auto',
              px: { xs: 2, sm: 0 },
            }}
          >
            {socialLinks.map((link) => (
              <motion.div
                key={link.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconButton
                  component="a"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  sx={{
                    color: 'text.primary',
                    bgcolor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)',
                    },
                    width: { xs: 48, sm: 56 },
                    height: { xs: 48, sm: 56 },
                  }}
                >
                  {link.icon}
                </IconButton>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact; 