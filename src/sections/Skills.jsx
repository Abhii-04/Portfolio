import { motion } from 'framer-motion'
import { 
  SiJavascript, SiTypescript, SiReact, 
  SiNodedotjs, SiMongodb, 
  SiTailwindcss, SiGit, SiDocker, 
  SiPython, SiGraphql
} from 'react-icons/si'
import { FaAws, FaDatabase, FaServer, FaCode } from 'react-icons/fa'

const SkillCard = ({ icon, name, level }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-bold mb-2">{name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{level}</p>
    </motion.div>
  )
}

const Skills = () => {
  const languageSkills = [
    { name: 'C/C++', icon: <FaCode />, level: 'Advanced' },
    { name: 'Python', icon: <SiPython />, level: 'Intermediate' },
    { name: 'JavaScript', icon: <SiJavascript />, level: 'Intermediate' },
    { name: 'HTML/CSS', icon: <FaCode />, level: 'Intermediate' },
  ]
  
  const frameworkSkills = [
    { name: 'React', icon: <SiReact />, level: 'Intermediate' },
    { name: 'Node.js', icon: <SiNodedotjs />, level: 'Intermediate' },
    { name: 'Flask', icon: <FaServer />, level: 'Intermediate' },
    { name: 'Django', icon: <FaServer />, level: 'Intermediate' },
    { name: 'Express', icon: <FaServer />, level: 'Intermediate' },
    { name: 'Flutter', icon: <FaCode />, level: 'Intermediate' },
  ]
  
  const otherSkills = [
    { name: 'Git/GitHub', icon: <SiGit />, level: 'Intermediate' },
    { name: 'MongoDB', icon: <SiMongodb />, level: 'Intermediate' },
    { name: 'Firebase', icon: <FaDatabase />, level: 'Intermediate' },
    { name: 'MySQL', icon: <FaDatabase />, level: 'Intermediate' },
    { name: 'OpenCV', icon: <FaCode />, level: 'Intermediate' },
    { name: 'YOLO', icon: <FaCode />, level: 'Intermediate' },
  ]

  return (
    <section id="skills" className="py-20">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-title"
        >
          My Skills
        </motion.h2>
        
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-xl font-bold mb-6 border-l-4 border-black dark:border-white pl-3"
          >
            Programming Languages
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {languageSkills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                icon={skill.icon}
                name={skill.name}
                level={skill.level}
              />
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-xl font-bold mb-6 border-l-4 border-black dark:border-white pl-3"
          >
            Frameworks & Libraries
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {frameworkSkills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                icon={skill.icon}
                name={skill.name}
                level={skill.level}
              />
            ))}
          </div>
        </div>
        
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-xl font-bold mb-6 border-l-4 border-black dark:border-white pl-3"
          >
            Other Skills
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {otherSkills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                icon={skill.icon}
                name={skill.name}
                level={skill.level}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills