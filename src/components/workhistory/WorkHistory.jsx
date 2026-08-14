import React, { useState } from 'react';
import './workhistory.css';
import { motion, AnimatePresence } from 'framer-motion';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { BsBuildingsFill } from 'react-icons/bs';

const experiences = [
  {
    id: 1,
    date: 'Aug 10, 2026 – Present',
    title: 'Senior Software Engineer',
    company: 'IronOne Technologies (Pvt) Ltd.',
    domain: 'Fintech · Capital Markets',
    current: true,
    projects: [
      {
        name: 'Leadership & Architecture',
        bullets: [
          'Promoted to Senior Software Engineer, owning architectural design for mission-critical financial systems across capital markets platforms.',
          'Driving platform-wide adoption of secure-by-design principles, code quality standards, and AI-assisted PR review automation.',
          'Leading API structuring, cross-team technical decisions, and engineering best practices across all active product lines.',
        ],
        tags: ['Architecture', 'Secure Design', 'Technical Leadership', 'AI-Assisted Review'],
      },
    ],
  },
  {
    id: 2,
    date: 'Jun 2024 – Aug 2026',
    title: 'Software Engineer',
    company: 'IronOne Technologies (Pvt) Ltd.',
    domain: 'Fintech · Capital Markets',
    current: false,
    projects: [
      {
        name: 'ATrad — Stock Market Order Management System',
        subDomain: 'Equity Trading · Colombo Stock Exchange (CSE)',
        bullets: [
          'Migrated market data delivery from REST polling to WebSocket streaming — achieving real-time order book and trade confirmation updates.',
          'Implemented Redis distributed caching for market data, decreasing direct database hits by 72% during peak trading hours.',
          'Resolved thread contention and deadlocks using thread-safe data structures, dropping server CPU usage to 20%.',
          'Integrated ActiveMQ to decouple order ingestion from downstream processing via a Publish-Subscribe pattern, improving throughput and fault isolation.',
        ],
        tags: ['Java', 'WebSockets', 'Redis', 'ActiveMQ', 'Multithreading', 'Performance Profiling'],
      },
      {
        name: 'Primary Dealer Management Platform',
        subDomain: 'Fixed Income · Government Securities · CBSL Regulated',
        bullets: [
          'Engineered core platform modules for T-Bill/T-Bond auctions, Repurchase Agreements, and secondary market trades per CBSL regulatory standards.',
          'Enforced strict security via Keycloak RBAC, KYC workflow management, and comprehensive audit trail logging for full regulatory compliance.',
          'Containerized microservices with Docker/Kubernetes on AWS EKS; automated database schema migrations using Flyway.',
          'Integrated Azure DevOps with Gemini MCP for AI-assisted PR reviews, automating secure-coding and vulnerability checks across the codebase.',
        ],
        tags: ['Quarkus', 'React (TS)', 'Keycloak', 'Docker', 'Kubernetes', 'AWS EKS', 'Flyway', 'Gemini MCP'],
      },
      {
        name: 'Wealth Management System',
        subDomain: 'Multi-Asset Portfolio · SWIFT Settlement',
        bullets: [
          'Engineered End-of-Day (EOD) processing pipelines for cross-instrument portfolio reconciliation and comprehensive multi-asset reporting modules.',
          'Implemented automated SWIFT message generation for DVP/RVP settlement instructions, enabling straight-through processing with custodian banks.',
          'Extended AI-assisted PR review automation to enforce secure-coding practices across portfolio and transaction modules.',
        ],
        tags: ['Quarkus (Reactive)', 'React (TS)', 'SWIFT Messaging', 'Docker', 'AWS', 'EOD Processing'],
      },
    ],
  },
  {
    id: 3,
    date: 'Nov 2022 – May 2023',
    title: 'Software Engineer Intern',
    company: 'Inova IT Systems (Pvt) Ltd.',
    domain: 'Software Consulting',
    current: false,
    projects: [
      {
        name: 'Project Analytics & CRM Backend',
        bullets: [
          'Built a scalable dynamic project analytics dashboard powered by ClickUp APIs, React (TypeScript), and Power BI for real-time data visualization.',
          'Designed resilient Spring Boot RESTful APIs for backend ticketing and CRM allocation workflows across web and mobile platforms.',
        ],
        tags: ['React (TS)', 'Spring Boot', 'Power BI', 'ClickUp API'],
      },
    ],
  },
  {
    id: 4,
    date: 'Jan 2021 – Jun 2024',
    title: 'Freelance Software Developer',
    company: 'Self Employed',
    domain: 'Part-Time · Full-Stack',
    current: false,
    projects: [
      {
        name: 'Full-Stack Client Projects',
        bullets: [
          'Delivered end-to-end web applications for local businesses, independently managing requirements, database design, and deployment.',
          'Built monolithic PHP/MySQL solutions covering e-commerce, inventory management, and booking systems.',
        ],
        tags: ['PHP', 'MySQL', 'HTML/CSS/JS'],
      },
    ],
  },
];

const ProjectBlock = ({ project }) => (
  <div className="wh__project">
    <div className="wh__project-header">
      <span className="wh__project-name">{project.name}</span>
      {project.subDomain && (
        <span className="wh__project-subdomain">{project.subDomain}</span>
      )}
    </div>
    <ul className="wh__bullets">
      {project.bullets.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
    <div className="wh__tags">
      {project.tags.map((tag, i) => (
        <span key={i} className="wh__tag">{tag}</span>
      ))}
    </div>
  </div>
);

const ExperienceCard = ({ exp, index }) => {
  const [expanded, setExpanded] = useState(exp.current || index < 2);

  return (
    <motion.div
      className={`wh__card ${exp.current ? 'wh__card--current' : ''}`}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Left accent bar */}
      <div className="wh__card-bar" />

      <div className="wh__card-body">
        {/* Header row */}
        <div className="wh__card-header" onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }}>
          <div className="wh__card-meta">
            <div className="wh__card-title-row">
              <h3 className="wh__title">{exp.title}</h3>
              {exp.current && <span className="wh__badge--current">Current</span>}
            </div>
            <div className="wh__company-row">
              <BsBuildingsFill className="wh__company-icon" />
              <span className="wh__company">{exp.company}</span>
              <span className="wh__domain-pill">{exp.domain}</span>
            </div>
            <span className="wh__date">{exp.date}</span>
          </div>
          <button className="wh__expand-btn" aria-label="Toggle details">
            {expanded ? <MdExpandLess /> : <MdExpandMore />}
          </button>
        </div>

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              className="wh__card-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {exp.projects.map((proj, i) => (
                <ProjectBlock key={i} project={proj} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const WorkHistory = () => {
  return (
    <section id="workhistory">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.05 }}
      >
        <h5>My Professional Career</h5>
        <h2>Work History</h2>

        <div className="container workhistory__container">
          <div className="wh__list">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WorkHistory;
