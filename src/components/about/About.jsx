import React, { useState } from "react";
import "./about.css";
import ME from "../../assets/me-4.webp";
import { motion, AnimatePresence } from "framer-motion";
import { FiBookOpen, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { TbFileCertificate } from "react-icons/tb";
import { BsTrophy } from "react-icons/bs";
import { CiStar } from "react-icons/ci";

/* ---- Data ---------------------------------------------------------- */

const educationItems = [
  {
    institution: "University of Colombo School of Computing",
    qualification: "B.Sc. (Hons) in Software Engineering",
    detail: "GPA 3.57 / 4.00",
    period: "2020 – 2024",
  },
  {
    institution: "St Peter's College, Colombo 04",
    qualification: "Advanced Level",
    detail: "Physics-A · Combined Mathematics-B · Chemistry-B",
    period: "2016 – 2018",
  },
  {
    institution: "Noor International School, Kalutara South",
    qualification: "Ordinary Level",
    detail: "7 A's and 2 B's",
    period: "2004 – 2015",
  },
];

const achievementItems = [
  {
    title: "IEEE IECON 2024 — Industrial Electronics Society",
    detail: "Research accepted & presented at the 50th Annual Conference of the IEEE Industrial Electronics Society",
    period: "2024",
    highlight: true,
  },
  {
    title: "Annual Research Symposium 2023",
    detail: "Abstract published at the Annual Research Symposium 2023, University of Colombo",
    period: "2023",
    highlight: false,
  },
  {
    title: "HackX 2021 — Finalist",
    detail: null,
    period: "2021",
    highlight: false,
  },
];

const certificationItems = [
  {
    title: "Design Patterns",
    issuer: "University of Alberta · Coursera",
  },
  {
    title: "Advanced MySQL Topics",
    issuer: "Meta · Coursera",
  },
];

const extraItems = [
  { title: "Member – Exploration Club", org: "University of Colombo School of Computing", period: "2020–2021" },
  { title: "Member – Computer Society", org: "St Peter's College, Colombo 04", period: "2016–2018" },
  { title: "Secretary – IT Unit", org: "Noor International School", period: "2014–2015" },
  { title: "School Prefect", org: "Noor International School", period: "2014–2015" },
];

/* ---- Expandable Panel ---------------------------------------------- */

function ExpandablePanel({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`about__panel ${open ? "about__panel--open" : ""}`}>
      <button
        className="about__panel-header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="about__panel-header-left">
          {icon}
          <span>{title}</span>
        </span>
        {open ? <FiChevronUp className="about__panel-chevron" /> : <FiChevronDown className="about__panel-chevron" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="about__panel-body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---- Main Component ----------------------------------------------- */

function About() {
  return (
    <section id="about">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <h5>The Engineer Behind the Code</h5>
        <h2>About&nbsp;Me</h2>

        <div className="container about__container">
          {/* Portrait */}
          <div className="about__me">
            <div className="about__me-image">
              <img src={ME} alt="Sukumar Kavishan" loading="lazy" />
            </div>
          </div>

          {/* Content */}
          <div className="about__content">
            <p className="about__bio">
              Senior Software Engineer specialising in the infrastructure that moves money — from real-time equity
              order management on the Colombo Stock Exchange, to SWIFT-compliant government securities settlement
              platforms. 2+ years engineering mission-critical capital markets systems at IronOne Technologies,
              with a focus on high-throughput Java backends, application security (OWASP, Keycloak, OAuth2),
              and cloud-native deployments on AWS. IEEE IECON 2024 published researcher.
            </p>

            {/* Expandable panels — always surfaced, no hidden modals */}
            <div className="about__panels">

              {/* Education */}
              <ExpandablePanel
                title="Education"
                icon={<FiBookOpen className="about__panel-icon" />}
                defaultOpen={true}
              >
                {educationItems.map((item, i) => (
                  <div key={i} className="about__panel-item">
                    <div className="about__panel-item-main">
                      <span className="about__panel-item-title">{item.institution}</span>
                      <span className="about__panel-item-period">{item.period}</span>
                    </div>
                    <span className="about__panel-item-sub">{item.qualification}</span>
                    {item.detail && <span className="about__panel-item-detail">{item.detail}</span>}
                  </div>
                ))}
              </ExpandablePanel>

              {/* Achievements */}
              <ExpandablePanel
                title="Achievements"
                icon={<BsTrophy className="about__panel-icon" />}
                defaultOpen={true}
              >
                {achievementItems.map((item, i) => (
                  <div key={i} className={`about__panel-item ${item.highlight ? "about__panel-item--highlight" : ""}`}>
                    <div className="about__panel-item-main">
                      <span className="about__panel-item-title">
                        {item.highlight && <span className="about__panel-item-ieee-badge">IEEE</span>}
                        {item.title}
                      </span>
                      <span className="about__panel-item-period">{item.period}</span>
                    </div>
                    {item.detail && <span className="about__panel-item-sub">{item.detail}</span>}
                  </div>
                ))}
              </ExpandablePanel>

              {/* Certifications */}
              <ExpandablePanel
                title="Certifications"
                icon={<TbFileCertificate className="about__panel-icon" />}
                defaultOpen={false}
              >
                {certificationItems.map((item, i) => (
                  <div key={i} className="about__panel-item">
                    <span className="about__panel-item-title">{item.title}</span>
                    <span className="about__panel-item-sub">{item.issuer}</span>
                  </div>
                ))}
              </ExpandablePanel>

              {/* Extra Curricular */}
              <ExpandablePanel
                title="Extra Curricular"
                icon={<CiStar className="about__panel-icon" />}
                defaultOpen={false}
              >
                {extraItems.map((item, i) => (
                  <div key={i} className="about__panel-item">
                    <div className="about__panel-item-main">
                      <span className="about__panel-item-title">{item.title}</span>
                      <span className="about__panel-item-period">{item.period}</span>
                    </div>
                    <span className="about__panel-item-sub">{item.org}</span>
                  </div>
                ))}
              </ExpandablePanel>
            </div>

            <a href="#contact" className="btn btn-primary" style={{ marginTop: "2rem" }}>
              Let's&nbsp;Talk
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;
