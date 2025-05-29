import { motion } from 'framer-motion';
import Terminal from '../components/Terminal';

const TerminalHome = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hello, I'm <span className="text-black dark:text-white">Abhishek Yadav</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
            Software Developer & Problem Solver
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Interact with my terminal below to navigate the portfolio
          </p>
        </motion.div>
        
        <Terminal />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10 text-center text-gray-500 dark:text-gray-400 text-sm"
        >
          <p>Type "help" to see available commands</p>
          
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalHome;