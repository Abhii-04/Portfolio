import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to my portfolio terminal!' },
    { type: 'system', text: 'Type "help" to see available commands.' },
    { type: 'system', text: 'Navbar there for Losers!' },
    { type: 'prompt', text: '' }
  ]);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  
  // Commands and their descriptions
  const commands = {
    help: 'Display available commands',
    about: 'Learn more about me',
    skills: 'View my technical skills',
    projects: 'See my projects',
    experience: 'Check my work experience',
    contact: 'Get in touch with me',
    clear: 'Clear the terminal',
    'joke': 'Tell a programming joke (Easter egg)'
  };

  // Focus input when terminal is clicked
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    if (terminalRef.current) {
      terminalRef.current.addEventListener('click', handleClick);
    }

    return () => {
      if (terminalRef.current) {
        terminalRef.current.removeEventListener('click', handleClick);
      }
    };
  }, []);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    // Add user input to history
    const newHistory = [...history.slice(0, -1), 
      { type: 'command', text: `$ ${input}` }, 
      { type: 'prompt', text: '' }
    ];
    
    // Process command
    processCommand(input.trim().toLowerCase(), newHistory);
    
    // Clear input
    setInput('');
  };

  const processCommand = (cmd, newHistory) => {
    let response = [];
    
    // Process commands
    switch (cmd) {
        case 'help':
          response = [
            { type: 'system', text: 'Available commands:' },
            ...Object.entries(commands).map(([cmd, desc]) => (
              { type: 'system', text: `  ${cmd.padEnd(15)} - ${desc}` }
            ))
          ];
          break;
          
        case 'about':
          response = [
            { type: 'system', text: 'About Abhishek Yadav:' },
            { type: 'system', text: 'I am a passionate software developer with expertise in full-stack development.' },
            { type: 'system', text: 'I love solving complex problems and building user-friendly applications.' },
            { type: 'system', text: 'Type "skills" to see my technical expertise.' }
          ];
          window.location.href = '#about';
          break;
          
        case 'skills':
          response = [
            { type: 'system', text: 'Navigating to skills section...' }
          ];
          window.location.href = '#skills';
          break;
          
        case 'projects':
          response = [
            { type: 'system', text: 'Navigating to projects section...' }
          ];
          window.location.href = '#projects';
          break;
          
        case 'experience':
          response = [
            { type: 'system', text: 'Navigating to experience section...' }
          ];
          window.location.href = '#experience';
          break;
          
        case 'contact':
          response = [
            { type: 'system', text: 'Navigating to contact section...' }
          ];
          window.location.href = '#contact';
          break;
          
        case 'clear':
          setHistory([
            { type: 'prompt', text: '' }
          ]);
          return;
          

          

          
        case 'joke':
          const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs!",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
            "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
            "Why do Java developers wear glasses? Because they don't C#!",
            "What's a programmer's favorite hangout place? The Foo Bar."
          ];
          const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
          response = [{ type: 'system', text: randomJoke }];
          break;
          
        default:
          response = [{ type: 'error', text: `Command not found: ${cmd}. Type "help" for available commands.` }];
      }
    
    setHistory([...newHistory.slice(0, -1), ...response, newHistory[newHistory.length - 1]]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden shadow-xl border border-gray-700"
    >
      {/* Terminal header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto text-gray-400 text-sm font-mono">
          abhishek@portfolio ~ 
        </div>
      </div>
      
      {/* Terminal body */}
      <div 
        ref={terminalRef}
        className="bg-black text-green-400 p-4 h-96 overflow-y-auto font-mono text-sm"
      >
        {history.map((item, index) => (
          <div 
            key={index} 
            className={`mb-1 ${
              item.type === 'error' ? 'text-red-400' : 
              item.type === 'command' ? 'text-white' : ''
            }`}
          >
            {item.text}
            {item.type === 'prompt' && (
              <form onSubmit={handleSubmit} className="inline">
                <span className="text-white">$ </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  className="bg-transparent border-none outline-none text-white w-64"
                  aria-label="Terminal input"
                />
              </form>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Terminal;