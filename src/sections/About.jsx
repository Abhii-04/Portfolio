import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-title"
        >
          About Me
        </motion.h2>
        
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">
              A passionate Computer Science Student based in Dehradun, India
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              I am a dedicated Computer Science student pursuing B.Tech in Computer Science and Engineering 
              with a specialization in Fullstack AI at the University of Petroleum and Energy Studies. 
              I'm passionate about creating efficient and user-friendly applications that solve real-world problems.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              My technical journey spans across various domains including web development, 
              compiler design, and real-time applications. I've worked on projects ranging from 
              performance analysis between CPU and GPU compilers to real-time device tracking and chat applications.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              When I'm not coding, you can find me participating in hackathons, 
              technical competitions, or contributing to open-source projects .
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold mb-2">Name:</h4>
                <p className="text-gray-700 dark:text-gray-300">Abhishek Yadav</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Email:</h4>
                <p className="text-gray-700 dark:text-gray-300">abhi740000@gmail.com</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Phone:</h4>
                <p className="text-gray-700 dark:text-gray-300">+91-9696541389</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Education:</h4>
                <p className="text-gray-700 dark:text-gray-300">B.Tech in CSE (2022-26)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About