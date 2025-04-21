import { Box, Container, Typography, Card, CardMedia, CardContent, Button, Chip, Stack } from '@mui/material';
import { GitHub as GitHubIcon, Launch as LaunchIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github?: string;
  demo?: string;
}

const projects = [
  {
    title: 'GUC Portal',
    description: 'A React-based frontend for students at GUC, integrated with a Flask API. Features user authentication, course management, student dashboard, and admin tools.',
    image: '/images/guc-portal.png',
    tech: ['React', 'Flask', 'Selenium', 'Tailwind CSS'],
    github: 'https://github.com/seifsamehtolba/guc-portal',
    demo: undefined
  },
  {
    title: 'GUC API',
    description: 'A Flask backend with Selenium-powered data scraping for the GUC Portal. Handles real-time university data, user sessions, and secure API communication.',
    image: '/images/guc-api.png',
    tech: ['Python', 'Flask', 'Selenium', 'SQLite'],
    github: 'https://github.com/seifsamehtolba/guc-api',
    demo: undefined
  },
  {
    title: 'Discord Suggestions Bot',
    description: 'A feature-rich Discord bot implementing a complete suggestion system with categories, voting, and admin controls. Perfect for community-driven servers.',
    image: '/images/suggestions-bot.png',
    tech: ['Node.js', 'Discord.js', 'SQLite', 'JavaScript'],
    github: 'https://github.com/seifsamehtolba/suggestions-discord-bot',
    demo: 'https://www.youtube.com/watch?v=C4GVfLJP8Fs'
  },
  {
    title: 'Discord Invoice Bot',
    description: 'A Discord bot for managing invoices and payments within Discord servers. Features payment tracking, invoice generation, and financial reporting.',
    image: '/images/invoice-bot.png',
    tech: ['Node.js', 'Discord.js', 'SQLite', 'JavaScript'],
    github: 'https://github.com/seifsamehtolba/discord-invoicebot',
    demo: undefined
  }
];

const ProjectCard = ({ project }: { project: Project }) => (
  <Card
    component={motion.div}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      '&:hover .project-overlay': {
        opacity: 1,
      },
      '&:hover .project-image': {
        transform: 'scale(1.05)',
      },
    }}
  >
    <Box sx={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}>
      <CardMedia
        component="img"
        image={project.image}
        alt={project.title}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          bgcolor: 'background.paper',
          padding: 1,
          transition: 'transform 0.3s ease-in-out',
        }}
        className="project-image"
      />
      <Box
        className="project-overlay"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        {project.github && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<GitHubIcon />}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Button>
        )}
        {project.demo && (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<LaunchIcon />}
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </Button>
        )}
      </Box>
    </Box>
    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
        {project.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
        {project.description}
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
        {project.tech.map((tech) => (
          <Chip
            key={tech}
            label={tech}
            size="small"
            color="primary"
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '& .MuiChip-label': {
                fontWeight: 500,
              },
            }}
          />
        ))}
      </Stack>
    </CardContent>
  </Card>
);

const Work = () => (
  <Box
    component="section"
    id="work"
    sx={{
      py: { xs: 12, md: 16 },
      bgcolor: 'background.default',
    }}
  >
    <Container maxWidth="lg">
      <Typography
        component={motion.h2}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        variant="h2"
        align="center"
        gutterBottom
        sx={{ mb: 8 }}
      >
        Featured Work
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 4,
          width: '100%',
        }}
      >
        {projects.map((project) => (
          <Box key={project.title}>
            <ProjectCard project={project} />
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

export default Work; 