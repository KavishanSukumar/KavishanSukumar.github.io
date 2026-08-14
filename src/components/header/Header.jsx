import React from "react";
import "./header.css";
import CTA from "./CTA";
import me from "../../assets/me-5.webp";
import HeaderSocials from "./HeaderSocials";

function Header() {
  return (
    <header role="banner">
      <div className="container header_container">
        <h5>Hello, I'm</h5>
        <h1>Sukumar Kavishan</h1>
        <h5 className="header__role">Senior&nbsp;Software&nbsp;Engineer</h5>
        <p className="header__subtitle">
          Fintech&nbsp;·&nbsp;Capital&nbsp;Markets&nbsp;·&nbsp;Application&nbsp;Security
        </p>

        {/* IEEE Research badge — global trust anchor */}
        <div className="header__badges">
          <span className="header__badge header__badge--ieee">
            ★&nbsp;IEEE IECON 2024 — Published Researcher
          </span>
        </div>

        <p className="header__value-prop">
          Building mission-critical capital markets infrastructure — real-time OMS,&nbsp;
          SWIFT settlement &amp; regulatory compliance at scale.
        </p>

        <p className="header__availability">
          📍 Sri Lanka &nbsp;·&nbsp; Open to relocation&nbsp;—&nbsp;
          <span>AU</span>&nbsp;·&nbsp;<span>EU</span>&nbsp;·&nbsp;<span>SG</span>&nbsp;·&nbsp;<span>UAE</span>
        </p>

        <CTA />
        <HeaderSocials />

        <div className="me" aria-hidden="true">
          <img src={me} alt="Sukumar Kavishan — Senior Software Engineer" loading="eager" />
        </div>

        <a href="#contact" className="scroll__down" aria-label="Scroll down to contact">
          Scroll&nbsp;down
        </a>
      </div>
    </header>
  );
}

export default Header;
