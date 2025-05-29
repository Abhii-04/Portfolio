import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-sm">Project Image</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <div className="flex space-x-3">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                aria-label="GitHub Repository"
              >
                <FiGithub size={20} />
              </a>
            )}
            {project.live && (
              <a 
                href={project.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                aria-label="Live Demo"
              >
                <FiExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const [filter, setFilter] = useState('all')
  
  const projects = [
    {
      id: 1,
      title: 'Performance Analysis Between CPU and GPU Compilers',
      description: 'Developed custom compilers using LLVM, CUDA, and OpenCL for vector arithmetic optimization. Built lexical analyzers, parsers, and ASTs for effective code analysis. Enhanced performance in matrix multiplication using GPU processing.',
      image: '',
      technologies: ['C++', 'LLVM', 'CUDA', 'OpenCL', 'GPU Computing'],
      category: 'backend',
      github: 'https://github.com/Abhii-04/Custom-CPU',
      live: '',
    },
    {
      id: 2,
      title: 'Forencify - Multi-platform Analyzer Interface',
      description: 'Designed and developed a forensic analysis dashboard using Flask for backend and a responsive frontend. Implemented card-based interface for analyzing social media platforms like Instagram, Reddit, and WhatsApp. Integrated tools for data visualization, metadata extraction, and cross-platform evidence mapping.',
      image: '',
      technologies: ['Flask', 'Python', 'HTML/CSS', 'JavaScript', 'Data Visualization', 'Forensic Analysis'],
      category: 'fullstack',
      github: '',
      live: '',
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A personal portfolio website showcasing projects and skills with modern design and animations.',
      image: '',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
      category: 'frontend',
      github: 'https://abhii-04.github.io/Portfolio/',
      live: '',
    },
    {
      id: 4,
      title: 'Realtime Device Tracker',
      description: 'Implemented real-time location tracking using Node.js, Express, and Socket.IO. Designed dynamic data updates and monitored live device movement.',
      image: '',
      technologies: ['Node.js', 'Express', 'Socket.IO', 'JavaScript'],
      category: 'fullstack',
      github: 'https://github.com/Abhii-04/Realtime-Device-Tracker',
      live: '',
    },
    {
      id: 5,
      title: 'Realtime Chat App',
      description: 'Built a React.js-based web app for seamless real-time messaging. Integrated MongoDB for user management and Socket.IO for live communication.',
      image: '',
      technologies: ['React', 'Socket.IO', 'Node.js', 'MongoDB'],
      category: 'fullstack',
      github: 'https://github.com/Abhii-04/ChatApp',
      live: '',
    }
  ]
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)
  
  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Full Stack' },
  ]

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-title"
        >
          My Projects
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setFilter(category.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === category.value
                    ? 'bg-white dark:bg-gray-700 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a 
            href="https://github.com/Abhii-04" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-outline"
          >
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects