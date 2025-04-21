import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box
      id="about"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: { xs: 2, md: 4 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        ref={ref}
        sx={{
          maxWidth: '1200px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 4,
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src="/images/pfp.png"
            alt="Seif Tolba"
            style={{
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: theme.shadows[4],
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              color: theme.palette.text.primary,
              fontWeight: 'bold',
            }}
          >
            About Me
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              color: theme.palette.text.secondary,
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
              color: theme.palette.text.secondary,
              lineHeight: 1.8,
            }}
          >
            When I'm not coding, you can find me exploring new technologies, contributing to open-source
            projects, or sharing my knowledge with the developer community.
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default About; 