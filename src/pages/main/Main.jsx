import React from "react";
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
    <>
      <Header />
      <Nav />
      <About />
      <Research />
      <WorkHistory />
      <TechnicalSkills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
