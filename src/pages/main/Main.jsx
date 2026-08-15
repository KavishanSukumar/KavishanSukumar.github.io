import React from "react";
import { motion } from "framer-motion";
import Header from "../../components/header/Header";
import Nav from "../../components/nav/Nav";
import About from "../../components/about/About";
import Research from "../../components/research/Research";
import WorkHistory from "../../components/workhistory/WorkHistory";
import TechnicalSkills from "../../components/skills/TechnicalSkills";
import { Projects } from "../../components/projects/Projects";
import Contact from "../../components/contact/Contact";
import Footer from "../../components/footer/Footer";

export default function Portfolio() {
  return (
    <motion.div
      className="portfolio__root"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Header />
      <Nav />
      <main className="portfolio__content">
        <About />
        <Research />
        <WorkHistory />
        <TechnicalSkills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  );
}
