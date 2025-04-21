import { Box, Container, Typography, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: { xs: 12, md: 16 },
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component={motion.h2}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          variant="h2"
          gutterBottom
          sx={{ 
            mb: 6,
            textAlign: 'center',
          }}
        >
          About Me
        </Typography>

        <Grid
          container
          spacing={4}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                aspectRatio: '1/1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                maxWidth: '300px',
                mx: 'auto',
              }}
            >
              <Box
                component={motion.img}
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
                src="/images/pfp.png"
                alt="Seif Tolba"
                sx={{
                  maxWidth: '80%',
                  maxHeight: '80%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  background: 'transparent',
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                sx={{
                  maxWidth: '600px',
                  mx: 'auto',
                }}
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                  sx={{ mb: 2 }}
                >
                  I'm Seif Tolba, a freelance developer and Computer Engineering student passionate about crafting innovative software solutions. My journey in tech is driven by a commitment to continuous learning and building impactful projects.
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                  sx={{ mb: 2 }}
                >
                  I specialize in full-stack development, with expertise in React, TypeScript, Node.js, and modern web technologies.
                  I'm passionate about creating intuitive user experiences and writing clean, maintainable code.
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                >
                  I'm always excited to take on new challenges and collaborate on interesting projects.
                  Let's build something amazing together!
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About; 