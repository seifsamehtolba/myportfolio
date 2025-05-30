import { Box, Container, Typography, LinearProgress, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ReactLogo from '../assets/react.svg';

interface Skill {
  name: string;
  level: number;
  logo: string;
}

const skills: Skill[] = [
  { name: 'React/Next.js', level: 90, logo: ReactLogo },
  { name: 'TypeScript/JavaScript', level: 90, logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg' },
  { name: 'Node.js', level: 85, logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg' },
  { name: 'Python/Flask', level: 85, logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
  { name: 'SQL/NoSQL', level: 80, logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg' },
  { name: 'UI/UX Design', level: 75, logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg' },
];

const SkillBar = ({ skill }: { skill: Skill }) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 24,
              height: 24,
            }}
          >
            <img 
              src={skill.logo} 
              alt={`${skill.name} logo`}
              style={{ 
                width: '100%', 
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            {skill.name}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: 'primary.main',
          }}
        >
          {skill.level}%
        </Typography>
      </Box>
      <Box
        component={motion.div}
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <LinearProgress
          variant="determinate"
          value={skill.level}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.08)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
              background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
            },
          }}
        />
      </Box>
    </Box>
  );
};

const Skills = () => {
  return (
    <Box
      component="section"
      id="skills"
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
            Skills
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Proficiency in modern technologies and development practices
          </Typography>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            p: 4,
            borderRadius: 3,
            bgcolor: 'background.paper',
            boxShadow: (theme) => `0 8px 32px ${theme.palette.primary.main}10`,
          }}
        >
          <Box sx={{ display: 'grid', gap: 6, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            <Box>
              {skills.slice(0, Math.ceil(skills.length / 2)).map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </Box>
            <Box>
              {skills.slice(Math.ceil(skills.length / 2)).map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Skills; 