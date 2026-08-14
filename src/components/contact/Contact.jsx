import React, { useRef, useState } from "react";
import "./contact.css";
import { MdOutlineEmail } from "react-icons/md";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import emailjs from "emailjs-com";

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("success");
          e.target.reset();
        },
        () => {
          setStatus("error");
        }
      );
  };

  return (
    <section id="contact">
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      {/* Availability chip */}
      <div className="contact__availability">
        <span className="contact__availability-dot" />
        Open to global opportunities &nbsp;·&nbsp; Australia &nbsp;·&nbsp; Europe &nbsp;·&nbsp; Singapore &nbsp;·&nbsp; Dubai
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

          <article className="contact__option">
            <BsGithub className="contact__icon" />
            <h4>GitHub</h4>
            <h5>KavishanSukumar</h5>
            <a
              href="https://github.com/KavishanSukumar"
              target="_blank"
              rel="noreferrer"
            >
              View Projects
            </a>
          </article>
        </div>

        {/* Contact Form */}
        <form ref={form} onSubmit={sendEmail} noValidate>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
            disabled={status === "sending"}
          />
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Your Email"
            required
            disabled={status === "sending"}
          />
          <input
            id="contact-subject"
            type="text"
            name="subject"
            placeholder="Subject"
            required
            disabled={status === "sending"}
          />
          <textarea
            id="contact-message"
            name="message"
            rows="7"
            placeholder="Your Message"
            required
            disabled={status === "sending"}
          ></textarea>

          <button
            type="submit"
            id="contact-submit"
            className="btn btn-primary"
            disabled={status === "sending" || status === "success"}
          >
            {status === "sending" ? "Sending…" : status === "success" ? "Message Sent ✓" : "Send Message"}
          </button>

          {status === "success" && (
            <p className="contact__feedback contact__feedback--success">
              ✓ &nbsp;Message delivered! I'll reply within 24 hours.
            </p>
          )}
          {status === "error" && (
            <p className="contact__feedback contact__feedback--error">
              ✕ &nbsp;Something went wrong. Please email me directly at kavishansukumar@gmail.com
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
