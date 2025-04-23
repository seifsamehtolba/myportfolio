import { Box, Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <Box
      component={motion.section}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.default',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.1), transparent 70%)',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          component={motion.div}
          variants={containerVariants}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 6,
            alignItems: 'center',
          }}
        >
          <motion.div variants={itemVariants}>
            <Box
              component="img"
              src="/images/pfp.png"
              alt="Seif Tolba"
              sx={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: '50%',
                margin: '0 auto',
                display: 'block',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 0 20px rgba(96, 165, 250, 0.2)'
                    : '0 0 20px rgba(37, 99, 235, 0.2)',
                },
              }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              component="h2"
              sx={{
                fontWeight: 700,
                marginBottom: 3,
                color: 'text.primary',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '40%',
                  height: '4px',
                  bottom: '-8px',
                  left: '30%',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(90deg, transparent, #60a5fa, transparent)'
                    : 'linear-gradient(90deg, transparent, #2563eb, transparent)',
                  borderRadius: '2px',
                },
              }}
            >
              About Me
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                marginBottom: 3,
                lineHeight: 1.8,
              }}
            >
              I'm a passionate Full Stack Developer with expertise in building modern web applications.
              My journey in software development started with a deep curiosity about how things work
              and has evolved into a career focused on creating efficient, scalable, and user-friendly
              solutions.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.8,
              }}
            >
              When I'm not coding, you can find me exploring new technologies, contributing to open-source
              projects, or sharing my knowledge with the developer community.
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default About; 