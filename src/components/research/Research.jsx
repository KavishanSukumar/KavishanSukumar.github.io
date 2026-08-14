import React from "react";
import "./research.css";
import { motion } from "framer-motion";
import { HiOutlineDocumentText } from "react-icons/hi";
import { SiIeee } from "react-icons/si";
import { GoBeaker } from "react-icons/go";

const publications = [
  {
    id: 1,
    type: "Conference Paper",
    conference: "IEEE IECON 2024",
    fullConference: "50th Annual Conference of the IEEE Industrial Electronics Society",
    year: "2024",
    title: "Nocturne: Real-Time Night Driving Assistance System for Low-Infrastructure Roads",
    description:
      "A real-time computer vision system using YOLOv8, PyTorch, and OpenCV to detect potholes, cyclists, and pedestrians under low-light conditions. Developed to address road safety challenges in emerging markets with limited infrastructure.",
    tags: ["YOLOv8", "PyTorch", "OpenCV", "Real-Time CV", "Edge Inference"],
    badgeType: "ieee",
    link: null, // Add IEEE DOI link when available
  },
  {
    id: 2,
    type: "Abstract Published",
    conference: "Annual Research Symposium 2023",
    fullConference: "University of Colombo — Faculty of Science",
    year: "2023",
    title: "Nocturne: AI-Assisted Night Vision for Road Hazard Detection",
    description:
      "Abstract accepted and presented at the Annual Research Symposium 2023, University of Colombo. Explored model architecture choices and inference optimisation strategies for real-time detection on resource-constrained hardware.",
    tags: ["Computer Vision", "Object Detection", "Model Optimization"],
    badgeType: "symposium",
    link: null,
  },
];

const PublicationCard = ({ pub, index }) => (
  <motion.article
    className={`research__card research__card--${pub.badgeType}`}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay: index * 0.12 }}
    viewport={{ once: true, amount: 0.15 }}
  >
    {/* Type label */}
    <div className="research__card-type">
      {pub.badgeType === "ieee" ? (
        <SiIeee className="research__card-type-icon" />
      ) : (
        <GoBeaker className="research__card-type-icon" />
      )}
      <span>{pub.type}</span>
    </div>

    {/* Conference badge */}
    <div className={`research__conference-badge research__conference-badge--${pub.badgeType}`}>
      <span className="research__conference-name">{pub.conference}</span>
      <span className="research__conference-year">{pub.year}</span>
    </div>

    {/* Paper title */}
    <h3 className="research__card-title">
      <HiOutlineDocumentText className="research__title-icon" />
      {pub.title}
    </h3>

    {/* Institution */}
    <p className="research__institution">{pub.fullConference}</p>

    {/* Description */}
    <p className="research__description">{pub.description}</p>

    {/* Tags */}
    <div className="research__tags">
      {pub.tags.map((tag, i) => (
        <span key={i} className="research__tag">{tag}</span>
      ))}
    </div>

    {/* Link */}
    {pub.link && (
      <a
        href={pub.link}
        className="btn"
        target="_blank"
        rel="noreferrer"
        style={{ marginTop: "1.2rem" }}
      >
        View Publication ↗
      </a>
    )}
  </motion.article>
);

function Research() {
  return (
    <section id="research">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.05 }}
      >
        <h5>Academic Contributions</h5>
        <h2>Research &amp; Publications</h2>

        <div className="container research__container">
          {publications.map((pub, index) => (
            <PublicationCard key={pub.id} pub={pub} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Research;
