import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'

const ContactInfo = ({ icon, title, content, link, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex items-start"
    >
      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg mr-4">
        {icon}
      </div>
      <div>
        <h3 className="font-bold mb-1">{title}</h3>
        {link ? (
          <a 
            href={link} 
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            {content}
          </a>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">{content}</p>
        )}
      </div>
    </motion.div>
  )
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Create a simple JSON payload instead of FormData
      const formPayload = {
        access_key: '9baf865b-5097-43ce-935a-052e859170bf',
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: formData.subject ? `New contact from portfolio: ${formData.subject}` : 'New contact from portfolio',
        from_name: formData.name, // Use the actual name from the form
        botcheck: '', // Empty botcheck field to prevent spam
        // Add a honeypot field
        hp: '',
        // Add a resubmitted flag to indicate this is a legitimate submission
        resubmitted: true
      };
      
      console.log('Sending form data:', formPayload);
      
      // Use the fetch API to submit the form with JSON
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formPayload)
      });
      
      const data = await response.json();
      console.log('Response from Web3Forms:', data);
      
      if (data.success) {
        console.log('Form submitted successfully!');
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error('Form submission error:', data);
        // Check if it's a spam error and provide a more helpful message
        if (data.message && data.message.includes('spam')) {
          alert('Your message was flagged as spam. Please try again with a different message or contact me directly at abhi740000@gmail.com');
        }
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Get In Touch
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Let's Talk</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              Feel free to reach out if you're looking for a developer, have a question, 
              or just want to connect. I'm always open to discussing new projects, 
              creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="space-y-6">
              <ContactInfo 
                icon={<FiMail size={20} />}
                title="Email"
                content="abhi740000@gmail.com"
                link="mailto:abhi740000@gmail.com"
                delay={0.3}
              />
              
              <ContactInfo 
                icon={<FiPhone size={20} />}
                title="Phone"
                content="+91-9696541389"
                link="tel:+919696541389"
                delay={0.4}
              />
              
              <ContactInfo 
                icon={<FiMapPin size={20} />}
                title="Location"
                content="Dehradun, India"
                delay={0.5}
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot fields to prevent spam */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
              <input type="text" name="hp" className="hidden" style={{ display: 'none' }} />
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <FiSend className="mr-2" />
                    Send Message
                  </span>
                )}
              </button>
              
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-green-100 text-green-800 rounded-md text-sm"
                >
                  Your message has been sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-100 text-red-800 rounded-md text-sm"
                >
                  There was an error sending your message. Please try again with a different message or email me directly at <a href="mailto:abhi740000@gmail.com" className="underline font-medium">abhi740000@gmail.com</a>.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact