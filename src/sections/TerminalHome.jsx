import { motion } from 'framer-motion';
import Terminal from '../components/Terminal';

const TerminalHome = () => {
  return (
    <section id="home" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-16 md:px-32 lg:px-48 flex flex-col items-start justify-start ml-0 mr-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-left max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hello, I'm <span className="text-black dark:text-white">Abhishek Yadav</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
            Software Developer & Problem Solver
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Interact with my terminal to navigate the portfolio
          </p>
        </motion.div>
        
        <div className="max-w-2xl w-full">
          <Terminal />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-4 text-gray-500 dark:text-gray-400 text-sm text-left"
          >
            <p>Type "help" to see available commands</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TerminalHome;