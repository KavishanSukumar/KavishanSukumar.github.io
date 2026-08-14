import { motion } from "framer-motion";
import con360 from "../../assets/con360.webp";
import entero from "../../assets/entero.webp";
import Nocturne from "../../assets/Nocturne.webp";
import "./projects.css";

const data = [
  {
    id: 1,
    type: "Research · Computer Vision",
    title: "Nocturne — Real-Time Night Driving Assistance",
    image: Nocturne,
    badge: "IEEE IECON 2024",
    badgeType: "ieee",
    description:
      "Real-time computer vision system leveraging YOLOv8, PyTorch, and OpenCV for night-time detection of potholes, cyclists, and pedestrians on low-infrastructure roads. Presented at the 50th Annual IEEE Industrial Electronics Society Conference.",
    tech: ["YOLOv8", "PyTorch", "OpenCV", "Python", "Edge Inference"],
    github: "https://github.com/KavishanSukumar/Nocturne",
    demo: null,
  },
  {
    id: 2,
    type: "Full-Stack · Event Platform",
    title: "Entero — Event Management System",
    image: entero,
    badge: null,
    badgeType: null,
    description:
      "Full-stack event management platform with real-time chat, user authentication, CRUD operations, and Azure Blob Storage. Built with Node.js, Express, React, and PostgreSQL.",
    tech: ["Node.js", "Express", "React (TS)", "PostgreSQL", "Azure Blob", "Socket.io"],
    github: "https://github.com/KavishanSukumar/Entero",
    demo: null,
  },
  {
    id: 3,
    type: "Full-Stack · Construction Tech",
    title: "Construct360 — Construction Management System",
    image: con360,
    badge: null,
    badgeType: null,
    description:
      "Platform connecting users with contractors for project management, document supervision, and progress tracking. Contributed real-time chat, payment gateway integration, and authentication in Java.",
    tech: ["Java", "React", "MySQL", "Payment Gateway", "WebSockets"],
    github: "https://github.com/KavishanSukumar/Construct360deg",
    demo: null,
  },
  // {
  //   id: 4,
  //   type: "Fintech · Side Project",
  //   title: "Fintech Domain Project",
  //   image: null,
  //   badge: "In Development",
  //   badgeType: "wip",
  //   description:
  //     "A fintech-focused side project demonstrating capital markets domain knowledge. Details will be published upon completion. Concepts include market data streaming, portfolio analytics, and financial message processing.",
  //   tech: ["Java", "Quarkus", "WebSockets", "Redis"],
  //   github: null,
  //   demo: null,
  //   wip: true,
  // },
];

export const Projects = () => {
  return (
    <section id="projects">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <h5>My Recent Works</h5>
        <h2>Projects</h2>
        <div className="container project__container">
          {data.map(({ id, type, title, image, badge, badgeType, description, tech, github, demo, wip }) => (
            <motion.article
              key={id}
              className={`project__item ${wip ? "project__item--wip" : ""}`}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {/* Project type label */}
              <span className="project__type">{type}</span>

              {/* Image or WIP placeholder */}
              <div className="project__item-image">
                {image ? (
                  <img src={image} alt={title} loading="lazy" />
                ) : (
                  <div className="project__item-image-placeholder">
                    <span>🚧</span>
                    <p>In Development</p>
                  </div>
                )}
                {/* Conference / status badge */}
                {badge && (
                  <span className={`project__badge project__badge--${badgeType}`}>
                    {badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="project__item-content">
                <h3>{title}</h3>
                <p className="project__description">{description}</p>

                {/* Tech stack chips */}
                <div className="project__tech">
                  {tech.map((t, i) => (
                    <span key={i} className="project__tech-tag">{t}</span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="project__item-cta">
                  {github ? (
                    <a href={github} className="btn btn-primary" target="_blank" rel="noreferrer">
                      GitHub ↗
                    </a>
                  ) : (
                    <span className="btn project__btn--disabled">
                      {wip ? "Coming Soon" : "Private Repo"}
                    </span>
                  )}
                  {demo && (
                    <a href={demo} className="btn" target="_blank" rel="noreferrer">
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
