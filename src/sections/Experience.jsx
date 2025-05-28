import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiBriefcase, FiBook } from 'react-icons/fi'

const TabButton = ({ active, icon, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        active
          ? 'bg-black text-white dark:bg-white dark:text-black'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {children}
    </button>
  )
}

const TimelineItem = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative pl-8 pb-12 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700"
    >
      <div className="absolute left-0 top-2 w-5 h-5 rounded-full bg-black dark:bg-white -translate-x-1/2 z-10" />
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <h3 className="text-xl font-bold">{item.title}</h3>
          <div className="text-sm font-mono text-gray-600 dark:text-gray-400 mt-1 md:mt-0">
            {item.period}
          </div>
        </div>
        
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium">
            {item.company || item.institution}
          </span>
          {item.location && (
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {item.location}
            </span>
          )}
        </div>
        
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          {item.description.map((desc, i) => (
            <li key={i}>{desc}</li>
          ))}
        </ul>
        
        {item.technologies && (
          <div className="flex flex-wrap gap-2 mt-4">
            {item.technologies.map((tech) => (
              <span 
                key={tech} 
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

const Experience = () => {
  const [activeTab, setActiveTab] = useState('work')
  
  const workExperience = [
    {
      title: 'Content and Web Developer',
      company: 'Freelance',
      location: 'Remote',
      period: '2023 - Present',
      description: [
        'Created SEO-optimized content, improving website traffic and engagement',
        'Developed and managed user-friendly websites to enhance user experience',
        'Delivered tailored web solutions focused on responsiveness and performance',
        'Collaborated with clients to meet project requirements and expectations'
      ],
      technologies: ['HTML/CSS', 'JavaScript', 'React', 'SEO']
    },
    {
      title: 'Social Internship',
      company: 'Event Organization',
      location: 'Dehradun, India',
      period: '2023',
      description: [
        'Planned and coordinated events promoting environmental awareness',
        'Engaged with communities to foster eco-friendly practices',
        'Developed communication and organizational skills',
        'Worked with diverse teams to achieve common goals'
      ]
    }
  ]
  
  const education = [
    {
      title: 'B.Tech in Computer Science and Engineering (Fullstack AI)',
      institution: 'University of Petroleum and Energy Studies',
      location: 'Dehradun, India',
      period: '2022 - 2026',
      description: [
        'Specializing in Fullstack development and AI integration',
        'Technical member of the Computer Society of India (CSI) at UPES',
        'Participated in Smart India Hackathon and Flipkart Grid 6.0',
        'Organized an international hackathon with participation from over 100 teams'
      ]
    }
  ]
  
  const activeData = activeTab === 'work' ? workExperience : education

  return (
    <section id="experience" className="py-20">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Experience & Education
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <TabButton
              active={activeTab === 'work'}
              onClick={() => setActiveTab('work')}
              icon={<FiBriefcase />}
            >
              Work Experience
            </TabButton>
            <TabButton
              active={activeTab === 'education'}
              onClick={() => setActiveTab('education')}
              icon={<FiBook />}
            >
              Education
            </TabButton>
          </div>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {activeData.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
        

      </div>
    </section>
  )
}

export default Experience