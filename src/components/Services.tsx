import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import {
  SmartToy as BotIcon,
  Storage as BackendIcon,
  Code as FrontendIcon,
} from '@mui/icons-material';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  highlighted?: boolean;
}

const services: Service[] = [
  {
    title: 'Discord Bot Development',
    description: 'Expert in creating custom Discord bots with 5+ years of experience. Specializing in feature-rich bots with advanced functionality like suggestion systems, payment tracking, and community management tools.',
    icon: <BotIcon sx={{ fontSize: 40 }} />,
    highlighted: true,
  },
  {
    title: 'Backend Development',
    description: 'Experienced in building robust and scalable backend solutions including RESTful APIs, database design, and server architecture. Proficient with Node.js, Python/Flask, and various database technologies.',
    icon: <BackendIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Frontend Web Development',
    description: 'Creating modern, responsive web applications using React, TypeScript, and cutting-edge frontend technologies.',
    icon: <FrontendIcon sx={{ fontSize: 40 }} />,
  },
];

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      sx={{
        height: '100%',
        minHeight: 380,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: service.highlighted ? 'primary.main' : 'background.paper',
        boxShadow: (theme) => 
          service.highlighted 
            ? `0 8px 32px ${theme.palette.primary.main}20` 
            : `0 8px 32px ${theme.palette.primary.main}10`,
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: (theme) => 
            service.highlighted 
              ? `0 12px 40px ${theme.palette.primary.main}30`
              : `0 12px 40px ${theme.palette.primary.main}20`,
          transition: 'all 0.3s ease-in-out',
        },
      }}
    >
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 3,
            height: '100%',
          }}
        >
          <Box
            sx={{
              color: service.highlighted ? 'white' : 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              borderRadius: '50%',
              bgcolor: service.highlighted ? 'primary.light' : 'primary.main10',
            }}
          >
            {service.icon}
          </Box>
          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: service.highlighted ? 'white' : 'text.primary',
            }}
          >
            {service.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: service.highlighted ? 'white' : 'text.secondary',
              lineHeight: 1.7,
              flex: 1,
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {service.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const Services = () => {
  return (
    <Box
      component="section"
      id="services"
      sx={{
        py: { xs: 12, md: 16 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            mb: 8,
            textAlign: 'center',
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
              mb: 3,
              color: 'primary.main',
              fontWeight: 700,
            }}
          >
            Services
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Specialized expertise in web development, design, and digital solutions
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 4
          }}
        >
          {services.map((service) => (
            <Box key={service.title}>
              <ServiceCard service={service} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Services; 