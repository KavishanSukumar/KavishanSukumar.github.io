import React from "react";
import "./contact.css";
import { MdOutlineEmail } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";

function Contact() {
  return (
    <section id="contact">
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      {/* Availability chip */}
      <div className="contact__availability">
        <span className="contact__availability-dot" />
        Open to global opportunities &nbsp;·&nbsp; Australia &nbsp;·&nbsp; Europe &nbsp;·&nbsp; Singapore &nbsp;·&nbsp; UAE
      </div>

      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <MdOutlineEmail className="contact__icon" />
            <h4>Email</h4>
            <h5>kavishansukumar@gmail.com</h5>
            <a href="mailto:kavishansukumar@gmail.com" target="_blank" rel="noreferrer">
              Send an Email
            </a>
          </article>

          <article className="contact__option">
            <BsLinkedin className="contact__icon" />
            <h4>LinkedIn</h4>
            <h5>Sukumar Kavishan</h5>
            <a
              href="https://www.linkedin.com/in/sukumar-kavishan/"
              target="_blank"
              rel="noreferrer"
            >
              View Profile
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Contact;

