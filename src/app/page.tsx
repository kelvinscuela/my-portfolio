"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";

// Import local image
import profileImage from '../../public/images/image.png';
import gitHub from '../../public/images/project.png';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

interface PortfolioData {
  hero: {
    name: string;
    title: string;
    description: string;
  };
  about: {
    description: string;
    highlights: string[];
  };
  skills: {
    name: string;
    level: number;
  }[];
  experience1: {
    position: string;
    company: string;
    duration: string;
    description: string;
  }[];
  experience: {
    position: string;
    company: string;
    duration: string;
    description: string;
  }[];
  projects: {
    title: string;
    description: string;
    link: string;
  }[];
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => (
  <section id={id} className="snap-start p-8 min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
    <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-purple-600 animate-fadeIn">{title}</h2>
    <div className="w-full max-w-4xl animate-slideIn">{children}</div>
  </section>
);

const Home: React.FC = () => {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    fetch('/Portfolio.json')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  if (!data) return <div className="flex justify-center items-center h-screen text-white bg-gray-900">This needs to load something...</div>;

  return (
    <main className="snap-y snap-mandatory overflow-y-scroll h-screen scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
      <Section id="hero" title="Welcome">
        <div className="flex flex-col items-center justify-center text-center">
          <Image
            src={profileImage}
            alt={data.hero.name}
            width={200}
            height={200}
            className="rounded-full mb-6 border-4 border-blue-500 hover:border-purple-500 transition-all duration-300"
          />
          <h1 className="text-5xl font-bold mb-2 animate-fadeIn">{data.hero.name}</h1>
          <p className="text-2xl text-blue-400 mb-4 animate-fadeIn">{data.hero.title}</p>
          <p className="text-lg animate-fadeIn">{data.hero.description}</p>
        </div>
      </Section>
      
      <Section id="about" title="About Me">
        <p className="text-lg mb-6">{data.about.description}</p>
        <ul className="list-disc list-inside space-y-2">
          {data.about.highlights.map((highlight, index) => (
            <li key={index} className="text-blue-300 hover:text-purple-300 transition-colors duration-300">{highlight}</li>
          ))}
        </ul>
      </Section>
      
      <Section id="skills" title="Skills">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.skills.map((skill, index) => (
            <div key={index} className="mb-4">
              <span className="text-lg font-semibold">{skill.name}</span>
              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Section>


      
      <Section id="experience" title="Education">
        {data.experience1.map((exp, index) => (
          <div key={index} className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
            <h3 className="text-xl font-bold text-blue-400">{exp.position} at {exp.company}</h3>
            <p className="text-sm text-gray-400 mb-2">{exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </Section>

    
      
      <Section id="experience" title="Experience">
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
            <h3 className="text-xl font-bold text-blue-400">{exp.position} at {exp.company}</h3>
            <p className="text-sm text-gray-400 mb-2">{exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </Section>

      
      <Section id="projects" title="Projects">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.projects.map((project, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
              <Image src={gitHub} alt={project.title} width={400} height={200} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="mb-4">{project.description}</p>
                <a href={project.link} className="text-blue-400 hover:text-purple-400 transition-colors duration-300">View Project →</a>
              </div>
            </div>
          ))}
        </div>
      </Section>
      
      <Section id="contact" title="Contact Me">
        <div className="text-center">
          <p className="mb-2">Email: <a href={`mailto:${data.contact.email}`} className="text-blue-400 hover:text-purple-400 transition-colors duration-300">{data.contact.email}</a></p>
          <p className="mb-2">Phone: {data.contact.phone}</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href={data.contact.linkedin} className="text-blue-400 hover:text-purple-400 transition-colors duration-300">LinkedIn</a>
            <a href={data.contact.github} className="text-blue-400 hover:text-purple-400 transition-colors duration-300">GitHub</a>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Home;