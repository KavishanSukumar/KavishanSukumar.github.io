import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import "./footer.css";
import logo from "../../assets/logo.webp";

function Footer() {
  return (
    <footer>
      <button
        className="footer__logo"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <img src={logo} alt="Sukumar Kavishan logo" className="footer__logo-image" />
      </button>

      <ul className="permalinks">
        <li>
          <button
            className="footer__nav-home"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Home
          </button>
        </li>
        <li><a href="#about">About</a></li>
        <li><a href="#research">Research</a></li>
        <li><a href="#workhistory">Experience</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="footer__socials">
        <a href="https://www.linkedin.com/in/sukumar-kavishan/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <BsLinkedin />
        </a>
        <a href="https://github.com/KavishanSukumar" target="_blank" rel="noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://leetcode.com/kavishansukumar/" target="_blank" rel="noreferrer" aria-label="LeetCode">
          <SiLeetcode />
        </a>
      </div>

      <div className="footer__meta">
        <p className="footer__tagline">Senior Software Engineer &nbsp;·&nbsp; Fintech &nbsp;·&nbsp; Capital Markets</p>
        <p className="footer__availability">
          📍 Sri Lanka &nbsp;·&nbsp; Open to global relocation &nbsp;—&nbsp; AU · EU · SG · Dubai
        </p>
        <p className="footer__copy">© {new Date().getFullYear()} Sukumar Kavishan. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
