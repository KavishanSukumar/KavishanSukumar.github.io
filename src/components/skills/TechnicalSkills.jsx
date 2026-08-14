import React from "react";
import "./technicalskills.css";
import { BsPatchCheckFill } from "react-icons/bs";
import { motion } from "framer-motion";

/* ---- Data ---------------------------------------------------------- */

const skillGroups = [
  {
    id: "languages",
    title: "Programming Languages",
    skills: [
      { name: "Java",       level: "Expert",        pct: 92 },
      { name: "TypeScript", level: "Experienced",   pct: 82 },
      { name: "JavaScript", level: "Experienced",   pct: 80 },
      { name: "Python",     level: "Intermediate",  pct: 60 },
      { name: "SQL",        level: "Experienced",   pct: 80 },
      { name: "C# / C++",  level: "Familiar",      pct: 42 },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    skills: [
      { name: "Quarkus",              level: "Experienced",  pct: 85 },
      { name: "Spring Boot",          level: "Experienced",  pct: 83 },
      { name: "React (TypeScript)",   level: "Experienced",  pct: 80 },
      { name: "Node.js / Express",    level: "Intermediate", pct: 65 },
      { name: "Flutter / React Native", level: "Familiar",  pct: 45 },
    ],
  },
  {
    id: "cloud",
    title: "Database & Cloud",
    skills: [
      { name: "PostgreSQL / MySQL", level: "Experienced",  pct: 84 },
      { name: "Redis",              level: "Experienced",  pct: 80 },
      { name: "AWS (EKS, EC2, S3)", level: "Experienced",  pct: 76 },
      { name: "Docker",             level: "Experienced",  pct: 82 },
      { name: "Kubernetes",         level: "Experienced",  pct: 72 },
      { name: "Azure DevOps",       level: "Experienced",  pct: 75 },
      { name: "MongoDB",            level: "Intermediate", pct: 58 },
    ],
  },
  {
    id: "architecture",
    title: "Architecture & Security",
    skills: [
      { name: "Microservices & Event-Driven", sub: "ActiveMQ / Pub-Sub" },
      { name: "WebSockets / UDP",             sub: "Real-time data streaming" },
      { name: "Keycloak / OAuth2 / RBAC",     sub: "Identity & Access Management" },
      { name: "OWASP Top 10",                 sub: "Application Security" },
      { name: "Secure Code Review",           sub: "AI-assisted & manual" },
      { name: "Domain-Driven Design (DDD)",   sub: "Bounded contexts" },
      { name: "CQRS",                         sub: "Command Query Responsibility Segregation" },
      { name: "Flyway",                       sub: "DB Schema Migrations" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Practices",
    skills: [
      { name: "Git / GitHub",         sub: "Version control & PR workflows" },
      { name: "CI/CD Pipelines",      sub: "Azure DevOps, GitHub Actions" },
      { name: "SonarQube",            sub: "Code quality & security gates" },
      { name: "Swagger / OpenAPI",    sub: "API documentation" },
      { name: "Postman",              sub: "API testing & automation" },
      { name: "Gemini MCP",           sub: "AI-assisted PR review automation" },
      { name: "Jira / Linear",        sub: "Agile project management" },
    ],
  },
  {
    id: "fintech",
    title: "Fintech Domain Knowledge",
    skills: [
      { name: "Capital Markets & OMS",          sub: "Equity trading, order book, CSE" },
      { name: "Fixed Income & Govt Securities", sub: "T-Bills, T-Bonds, Repos, CBSL" },
      { name: "SWIFT Messaging",                sub: "DVP / RVP settlement instructions" },
      { name: "KYC / AML Compliance",           sub: "Workflow management & audit trails" },
      { name: "Wealth Management",              sub: "EOD pipelines, portfolio reconciliation" },
      { name: "Primary Dealer Operations",      sub: "CBSL regulatory compliance" },
      { name: "FIX Protocol",                   sub: "Financial information exchange awareness" },
      { name: "T+2 / T+1 Settlement Cycles",   sub: "Settlement risk & lifecycle" },
    ],
  },
];

/* ---- Proficiency Bar (only for groups with pct) -------------------- */

const SkillWithBar = ({ skill }) => (
  <article className="skill__details skill__details--bar">
    <div className="skill__details-top">
      <div className="skill__details-left">
        <BsPatchCheckFill className="skill__check-icon" />
        <h4>{skill.name}</h4>
      </div>
      <small className="text-light">{skill.level}</small>
    </div>
    <div className="skill__bar-track">
      <motion.div
        className="skill__bar-fill"
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.pct}%` }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true }}
      />
    </div>
  </article>
);

/* ---- Simple Skill (for architecture / tools / fintech) ------------- */

const SkillSimple = ({ skill }) => (
  <article className="skill__details">
    <BsPatchCheckFill className="skill__check-icon" />
    <div>
      <h4>{skill.name}</h4>
      {skill.sub && <small className="text-light">{skill.sub}</small>}
    </div>
  </article>
);

/* ---- Skill Group Card ---------------------------------------------- */

const SkillGroup = ({ group, index }) => {
  const hasBar = group.skills[0]?.pct !== undefined;
  return (
    <motion.div
      className="skill__group"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      style={{ transitionDelay: `${index * 0.07}s` }}
    >
      <h3>{group.title}</h3>
      <div className={`skill__list ${hasBar ? "skill__list--bars" : ""}`}>
        {group.skills.map((skill, i) =>
          hasBar ? (
            <SkillWithBar key={i} skill={skill} />
          ) : (
            <SkillSimple key={i} skill={skill} />
          )
        )}
      </div>
    </motion.div>
  );
};

/* ---- Component ----------------------------------------------------- */

function TechnicalSkills() {
  return (
    <section id="skills">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.05 }}
      >
        <h5>What I Bring to the Table</h5>
        <h2>Technical Expertise</h2>

        <div className="container skills__container">
          {skillGroups.map((group, index) => (
            <SkillGroup key={group.id} group={group} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default TechnicalSkills;
