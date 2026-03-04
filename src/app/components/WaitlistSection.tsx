import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { FlaskConical, CheckCircle2 } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../../styles/phone-input.css';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export function WaitlistSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d19ebccd/waitlist`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email, name, phone }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit waitlist entry');
      }

      setSubmitted(true);
      setEmail('');
      setName('');
      setPhone('');
      
      // Reset after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Waitlist submission error:', err);
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" ref={ref} className="min-h-screen bg-zinc-950 py-24 px-6 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Icon */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 border border-zinc-700 flex items-center justify-center bg-black">
            <FlaskConical className="w-10 h-10 text-zinc-500" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl text-white font-light mb-6">
            Join the Laboratory
          </h2>
          <div className="h-px w-32 bg-zinc-800 mx-auto mb-8"></div>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Be among the first to receive <strong className="text-white font-normal">Batch 001</strong>. 
            Limited quantity available for the inaugural roast. 
          </p>
        </motion.div>

        {/* Form or Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {submitted ? (
            <div className="bg-black border border-zinc-700 p-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="text-2xl text-white font-light mb-3">Welcome to the Laboratory</h3>
              <p className="text-zinc-400 font-mono text-sm">
                You've been added to the waitlist for Batch 001.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-black border border-zinc-700 p-8 md:p-12">
              {error && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-800 text-red-400 text-sm font-mono">
                  {error}
                </div>
              )}
              
              <div className="space-y-6 mb-8">
                <div>
                  <label htmlFor="name" className="block text-zinc-500 text-xs tracking-widest mb-3 font-mono">
                    YOUR NAME
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dr. Evil"
                    required
                    disabled={isSubmitting}
                    className="bg-zinc-950 border-zinc-700 text-white placeholder:text-zinc-600 h-14 text-lg focus:border-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-zinc-500 text-xs tracking-widest mb-3 font-mono">
                    EMAIL ADDRESS
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="evil@laboratory.coffee"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="Please enter a valid email address (e.g., sean@drevil.info)"
                    required
                    disabled={isSubmitting}
                    className="bg-zinc-950 border-zinc-700 text-white placeholder:text-zinc-600 h-14 text-lg focus:border-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-zinc-500 text-xs tracking-widest mb-3 font-mono">
                    PHONE NUMBER (OPTIONAL)
                  </label>
                  <PhoneInput
                    id="phone"
                    value={phone}
                    onChange={setPhone}
                    placeholder="Enter phone number"
                    disabled={isSubmitting}
                    className="bg-zinc-950 border-zinc-700 text-white placeholder:text-zinc-600 h-14 text-lg focus:border-white"
                  />
                </div>
              </div>

              <Button 
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-white text-black hover:bg-zinc-200 text-sm tracking-widest py-6 h-auto font-mono disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SUBMITTING...' : 'REQUEST LABORATORY ACCESS'}
              </Button>

              {/* <p className="text-zinc-600 text-xs text-center mt-6 font-mono">
                ROAST TIMELINE: MARCH 2026 • LIMITED TO 50 SPECIMENS
              </p> */}
            </form>
          )}
        </motion.div>

        {/* Benefits */}
        {/* <motion.div
          className="grid md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center">
            <p className="text-zinc-500 text-xs tracking-widest mb-2 font-mono">BENEFIT 01</p>
            <p className="text-white text-sm">Early Access to Batch 001</p>
          </div>
          <div className="text-center">
            <p className="text-zinc-500 text-xs tracking-widest mb-2 font-mono">BENEFIT 02</p>
            <p className="text-white text-sm">Founder's Lab Report Card</p>
          </div>
          <div className="text-center">
            <p className="text-zinc-500 text-xs tracking-widest mb-2 font-mono">BENEFIT 03</p>
            <p className="text-white text-sm">Behind-the-Scenes Studio Access</p>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}