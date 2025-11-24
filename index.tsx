import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// --- Data & Constants ---

const SERVICES = [
  { id: 1, title: 'Factories Act', hindi: 'फैक्ट्री एक्ट लाइसेंस', icon: 'fa-industry', desc: 'Comprehensive licensing, renewals, and compliance audits for factories.' },
  { id: 2, title: 'ESI & PF', hindi: 'ईएसआई और पीएफ', icon: 'fa-users-gear', desc: 'Monthly filing, challan generation, and employee grievance handling.' },
  { id: 3, title: 'Pollution NOC', hindi: 'प्रदूषण नियंत्रण एनओसी', icon: 'fa-smog', desc: 'CTE/CTO approvals from UP Pollution Control Board.' },
  { id: 4, title: 'Fire NOC', hindi: 'अग्निशमन एनओसी', icon: 'fa-fire-extinguisher', desc: 'Fire safety audits and No Objection Certificate procurement.' },
  { id: 5, title: 'Labor License', hindi: 'लेबर लाइसेंस', icon: 'fa-id-card-clip', desc: 'Contract labor regulation and abolition act registration.' },
  { id: 6, title: 'Shop Registration', hindi: 'दुकान एवं स्थापना', icon: 'fa-store', desc: 'Registration under Shop & Establishment Act for offices.' },
  { id: 7, title: 'Payroll Compliance', hindi: 'वेतन और बोनस', icon: 'fa-file-invoice-dollar', desc: 'Bonus, Gratuity, and Minimum Wages compliance management.' },
  { id: 8, title: 'Electrical Safety', hindi: 'विद्युत सुरक्षा', icon: 'fa-bolt', desc: 'DG Set approvals and electrical safety inspections.' },
  { id: 9, title: 'Map Approval', hindi: 'नक्शा स्वीकृति', icon: 'fa-map-location-dot', desc: 'Factory building plan approval from authority.' },
  { id: 10, title: 'MSME / Udyam', hindi: 'एमएसएमई पंजीकरण', icon: 'fa-award', desc: 'Udyam Aadhar registration for small business benefits.' },
  { id: 11, title: 'Legal Notices', hindi: 'कानूनी नोटिस', icon: 'fa-gavel', desc: 'Drafting replies to government inspection notices.' },
  { id: 12, title: 'Consultancy', hindi: 'परामर्श सेवाएं', icon: 'fa-handshake-angle', desc: 'General industrial dispute resolution and guidance.' },
];

const CONTACT_INFO = {
  phone: '9811155576',
  email: 'arvind.hi05@gmail.com',
  address: 'Shop No.-6, 1st Floor, SHD Complex, Shatabdi Enclave, Sector-49, Noida, UP.'
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Expertise', href: '#services' },
    { name: 'Firm Profile', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-brand-forest border-brand-gold/30 py-3 shadow-lg' : 'bg-brand-forest border-transparent py-5'}`}>
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-12 h-12 border border-brand-gold rounded-none flex items-center justify-center text-xl bg-brand-forest text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-forest transition-colors duration-300">
            <i className="fa-solid fa-scale-balanced"></i>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl text-white tracking-wide uppercase">
              Consultation House
            </span>
            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-brand-gold">
              Legal & Compliance Experts
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-sans text-sm font-medium text-white/80 hover:text-brand-gold uppercase tracking-wider transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-brand-gold after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-forest px-6 py-2 rounded-sm font-serif italic text-sm transition-all flex items-center gap-2"
          >
             <i className="fa-solid fa-phone text-xs"></i> {CONTACT_INFO.phone}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-2xl text-brand-gold"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-bars-staggered'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 bg-brand-forest z-40 transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-10 relative">
           <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-brand-gold text-3xl">
             <i className="fa-light fa-times"></i>
           </button>
           
           <div className="flex flex-col space-y-8 mt-20 border-l-2 border-brand-gold pl-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-3xl font-serif text-white hover:text-brand-gold transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
          
           <div className="mt-auto">
             <p className="text-brand-gold/60 text-xs uppercase tracking-widest mb-4">Get in Touch</p>
             <a href={`tel:${CONTACT_INFO.phone}`} className="text-2xl font-serif text-white block mb-2">
                +91 98111 55576
             </a>
             <div className="text-white/60 font-sans text-sm">Sector-49, Noida, Uttar Pradesh</div>
           </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-cream overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center">
            
            <div className="w-full lg:w-3/5 z-10">
                <div className="inline-block border-b-2 border-brand-gold pb-1 mb-6">
                    <span className="text-brand-forest font-sans font-bold text-xs uppercase tracking-[0.2em]">Established 2008</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-serif font-bold text-brand-forest leading-[1.1] mb-4">
                  Regulatory Compliance <br/> & Industrial Law
                </h1>
                
                <h2 className="text-2xl lg:text-3xl font-serif text-brand-gold italic mb-8">
                  औद्योगिक अनुपालन और कानूनी समाधान
                </h2>
                
                <p className="text-lg text-brand-charcoal/80 mb-10 leading-relaxed font-sans max-w-xl border-l-4 border-brand-gold/30 pl-6">
                  We specialize in Factories Act, Pollution Control, and Labor Law compliances. Securing your business operations in Noida & Greater Noida with absolute precision.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5">
                  <a href="#contact" className="bg-brand-forest text-white px-10 py-4 rounded-sm font-sans font-medium uppercase tracking-wider text-sm transition-all hover:bg-brand-gold hover:text-brand-forest shadow-elegant">
                    Schedule Consultation
                  </a>
                  <a href="#services" className="border border-brand-forest text-brand-forest px-10 py-4 rounded-sm font-sans font-medium uppercase tracking-wider text-sm transition-all hover:bg-brand-forest hover:text-white">
                    Our Practice Areas
                  </a>
                </div>
            </div>

            {/* Abstract Graphic */}
            <div className="w-full lg:w-2/5 mt-16 lg:mt-0 relative flex justify-center lg:justify-end">
                <div className="relative w-80 h-96 lg:w-[400px] lg:h-[500px] border border-brand-forest/10 bg-white p-4 shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500">
                     <div className="w-full h-full bg-brand-sand relative overflow-hidden">
                         <div className="absolute inset-0 opacity-20" style={{backgroundImage: "radial-gradient(#1a4d2e 1px, transparent 1px)", backgroundSize: "20px 20px"}}></div>
                         <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center border-4 border-double border-brand-gold/30 m-4">
                             <i className="fa-solid fa-scale-balanced text-6xl text-brand-forest mb-6"></i>
                             <h3 className="font-serif text-2xl text-brand-forest mb-2">100% Compliance</h3>
                             <p className="font-sans text-xs text-brand-charcoal uppercase tracking-widest">Guaranteed</p>
                         </div>
                     </div>
                </div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl"></div>
            </div>

        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 border-b border-brand-border pb-8">
            <div className="max-w-2xl">
                <span className="text-brand-gold font-sans font-bold uppercase tracking-widest text-xs mb-2 block">Areas of Practice</span>
                <h2 className="text-4xl lg:text-5xl font-serif text-brand-forest">Our Expertise</h2>
            </div>
            <div className="mt-6 lg:mt-0">
                <p className="text-brand-charcoal/70 font-sans max-w-md text-right lg:text-right text-left">
                    Comprehensive legal and statutory solutions tailored for industrial establishments.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="group bg-brand-cream p-8 border border-transparent hover:border-brand-gold/50 transition-all duration-300 relative">
              
              <div className="flex justify-between items-start mb-6">
                   <div className="w-12 h-12 bg-white border border-brand-forest/10 flex items-center justify-center text-brand-forest group-hover:bg-brand-forest group-hover:text-brand-gold transition-colors duration-300">
                        <i className={`fa-solid ${service.icon} text-xl`}></i>
                   </div>
                   <span className="font-serif text-6xl text-brand-forest/5 font-bold absolute top-4 right-4">{service.id.toString().padStart(2, '0')}</span>
              </div>
              
              <h3 className="text-xl font-serif font-bold text-brand-forest mb-2 group-hover:text-brand-gold transition-colors">
                {service.title}
              </h3>
              <h4 className="text-sm font-sans font-bold text-brand-gold mb-4 uppercase tracking-wider">
                 {service.hindi}
              </h4>
              
              <p className="text-brand-charcoal/70 text-sm leading-relaxed mb-6 font-sans border-t border-brand-forest/10 pt-4">
                {service.desc}
              </p>

              <div className="flex items-center text-xs font-bold text-brand-forest uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                 <span>Learn More</span>
                 <i className="fa-solid fa-arrow-right ml-2"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-brand-forest text-white relative overflow-hidden">
       <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/2">
            <span className="text-brand-gold font-sans font-bold uppercase tracking-widest text-xs mb-3 block">Firm Profile</span>
            <h2 className="text-3xl lg:text-5xl font-serif mb-8 leading-tight">
              A Legacy of Trust in <br/> <span className="text-brand-gold italic">Industrial Law</span>
            </h2>
            
            <div className="space-y-6 font-sans text-white/80 leading-relaxed font-light">
                <p>
                  Consultation House stands as a pillar of reliability in the industrial landscape of Noida. Since 2008, we have navigated the complex corridors of government bureaucracy to deliver seamless compliance solutions for our clients.
                </p>
                <p>
                  We act not just as consultants, but as strategic partners—safeguarding your business from legal pitfalls. From the initial factory blueprint approval to the daily management of labor records, our precision is unmatched.
                </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                    <h4 className="text-3xl font-serif text-brand-gold mb-1">15+</h4>
                    <p className="text-xs uppercase tracking-widest opacity-60">Years of Service</p>
                </div>
                 <div>
                    <h4 className="text-3xl font-serif text-brand-gold mb-1">500+</h4>
                    <p className="text-xs uppercase tracking-widest opacity-60">Factories Compliant</p>
                </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 pl-0 lg:pl-12">
             <div className="grid grid-cols-1 gap-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8">
                    <i className="fa-solid fa-gavel text-brand-gold text-3xl mb-4"></i>
                    <h4 className="font-serif text-xl mb-2">Legal Liaisoning</h4>
                    <p className="text-sm opacity-70 font-sans">Direct representation with Pollution Board, Fire Dept, and Labor Commissioner.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8">
                    <i className="fa-solid fa-file-shield text-brand-gold text-3xl mb-4"></i>
                    <h4 className="font-serif text-xl mb-2">Risk Mitigation</h4>
                    <p className="text-sm opacity-70 font-sans">Proactive audits to identify and fix non-compliance issues before they become penalties.</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-brand-sand">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto bg-white shadow-elegant">
            <div className="flex flex-col md:flex-row">
                
                <div className="w-full md:w-5/12 bg-brand-forest text-white p-12 flex flex-col justify-between relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
                     
                     <div className="relative z-10">
                        <span className="text-brand-gold text-xs uppercase tracking-widest font-bold mb-4 block">Contact Us</span>
                        <h3 className="font-serif text-3xl mb-10">Begin the Conversation</h3>
                        
                        <div className="space-y-8">
                            <div>
                                <p className="text-xs text-brand-gold uppercase tracking-wider mb-2">Visit Office</p>
                                <p className="font-serif text-lg leading-snug">{CONTACT_INFO.address}</p>
                            </div>
                            <div>
                                <p className="text-xs text-brand-gold uppercase tracking-wider mb-2">Direct Line</p>
                                <p className="font-serif text-lg">{CONTACT_INFO.phone}</p>
                            </div>
                             <div>
                                <p className="text-xs text-brand-gold uppercase tracking-wider mb-2">Email Inquiry</p>
                                <p className="font-serif text-lg">{CONTACT_INFO.email}</p>
                            </div>
                        </div>
                     </div>
                     
                     <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                         <p className="font-sans text-xs opacity-60">Monday - Saturday <br/> 10:00 AM - 7:00 PM</p>
                     </div>
                </div>

                <div className="w-full md:w-7/12 p-12">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                 <label className="block text-xs font-bold text-brand-forest uppercase tracking-widest mb-2">Name / नाम</label>
                                 <input type="text" className="w-full border-b border-brand-forest/20 py-3 focus:outline-none focus:border-brand-gold transition-colors bg-transparent" placeholder="Full Name" />
                             </div>
                             <div>
                                 <label className="block text-xs font-bold text-brand-forest uppercase tracking-widest mb-2">Phone / फ़ोन</label>
                                 <input type="tel" className="w-full border-b border-brand-forest/20 py-3 focus:outline-none focus:border-brand-gold transition-colors bg-transparent" placeholder="Mobile Number" />
                             </div>
                        </div>
                        <div>
                             <label className="block text-xs font-bold text-brand-forest uppercase tracking-widest mb-2">Subject / विषय</label>
                             <select className="w-full border-b border-brand-forest/20 py-3 focus:outline-none focus:border-brand-gold transition-colors bg-transparent text-brand-charcoal">
                                 <option>General Inquiry</option>
                                 <option>Factory License</option>
                                 <option>Pollution NOC</option>
                                 <option>Fire Safety</option>
                             </select>
                        </div>
                        <div>
                             <label className="block text-xs font-bold text-brand-forest uppercase tracking-widest mb-2">Message / संदेश</label>
                             <textarea rows={3} className="w-full border-b border-brand-forest/20 py-3 focus:outline-none focus:border-brand-gold transition-colors bg-transparent resize-none" placeholder="Describe your requirement..."></textarea>
                        </div>
                        <div className="pt-4">
                            <button type="button" className="bg-brand-forest text-white px-8 py-3 rounded-sm uppercase tracking-widest text-xs font-bold hover:bg-brand-gold hover:text-brand-forest transition-colors w-full md:w-auto">
                                Send Request
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-brand-border pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-12">
            <div className="w-16 h-16 bg-brand-forest text-brand-gold flex items-center justify-center text-2xl mb-6">
                <i className="fa-solid fa-scale-balanced"></i>
            </div>
            <h2 className="font-serif text-2xl text-brand-forest font-bold mb-2">Consultation House</h2>
            <p className="text-brand-charcoal/60 text-sm max-w-md">The gold standard in industrial compliance and legal consultancy for Noida & Greater Noida.</p>
        </div>
        
        <div className="flex justify-center gap-8 mb-12 flex-wrap">
            {['Home', 'Services', 'About', 'Contact', 'Privacy Policy'].map(item => (
                <a key={item} href="#" className="font-sans text-xs font-bold uppercase tracking-widest text-brand-forest hover:text-brand-gold transition-colors">
                    {item}
                </a>
            ))}
        </div>

        <div className="border-t border-brand-border pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-charcoal/50 font-sans">
            <p>&copy; {new Date().getFullYear()} Consultation House. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className="hover:text-brand-forest"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="#" className="hover:text-brand-forest"><i className="fa-brands fa-twitter"></i></a>
            </div>
        </div>
      </div>
    </footer>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "नमस्कार! I am the Virtual Assistant for Consultation House. How may I assist you with legal compliance today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatSession, setChatSession] = useState<any>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized && isOpen) {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const chat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: "You are a polite and formal AI assistant for 'Consultation House', a premium consultancy firm. Answer in a mix of Hindi and English. Maintain a very professional, legal-expert tone.",
                }
            });
            setChatSession(chat);
            setHasInitialized(true);
        } catch (error) {
            console.error("Error initializing chat:", error);
        }
    }
  }, [isOpen, hasInitialized]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInput("");
    setIsTyping(true);

    try {
        let responseText = "Network error. Please call our office.";
        
        if (chatSession) {
             const result = await chatSession.sendMessage({ message: userMsg });
             responseText = result.text;
        } else {
             const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
             const model = ai.models.getGenerativeModel({ model: "gemini-2.5-flash"});
             const result = await model.generateContent({
                 contents: [
                    { role: 'user', parts: [{ text: "System: You are a formal assistant for Consultation House." }]},
                    { role: 'user', parts: [{ text: userMsg }]}
                 ]
             });
             responseText = result.text;
        }
        
        setMessages(prev => [...prev, { text: responseText, sender: 'bot' }]);
    } catch (error) {
        setMessages(prev => [...prev, { text: "Connection issue. Please dial 9811155576 for immediate assistance.", sender: 'bot' }]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {!isOpen && (
        <div className="mb-3 bg-brand-forest text-white px-5 py-3 rounded-none shadow-lg max-w-[280px]">
          <p className="font-serif italic text-sm">
            Expert advice is one click away.
          </p>
        </div>
      )}

      {isOpen && (
        <div className="bg-white w-[350px] h-[500px] shadow-2xl border border-brand-border flex flex-col mb-4">
          {/* Header */}
          <div className="bg-brand-forest p-4 flex justify-between items-center text-white border-b border-brand-gold">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-gold text-brand-forest flex items-center justify-center rounded-none">
                <i className="fa-solid fa-scale-balanced text-xs"></i>
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm">Virtual Counsel</h4>
                <p className="text-[10px] opacity-80 uppercase tracking-widest">Consultation House</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-brand-gold hover:text-white transition-colors">
              <i className="fa-solid fa-times text-lg"></i>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 bg-brand-cream p-5 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-3 text-sm border ${
                    msg.sender === 'user' 
                      ? 'bg-white border-brand-forest/20 text-brand-charcoal' 
                      : 'bg-brand-forest text-white border-transparent'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-brand-forest px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-brand-gold animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-brand-gold animate-bounce delay-75"></span>
                      <span className="w-1.5 h-1.5 bg-brand-gold animate-bounce delay-150"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-brand-border">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your inquiry..."
                className="w-full bg-brand-cream border-b border-brand-forest/20 px-3 py-2 text-sm focus:outline-none focus:border-brand-forest text-brand-charcoal font-serif placeholder:font-sans"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="text-brand-forest hover:text-brand-gold transition-colors"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 shadow-2xl flex items-center justify-center text-xl transition-all duration-300 ${isOpen ? 'bg-brand-charcoal text-white' : 'bg-brand-gold text-brand-forest hover:bg-brand-forest hover:text-brand-gold'}`}
      >
        <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-message'}`}></i>
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div className="antialiased">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);