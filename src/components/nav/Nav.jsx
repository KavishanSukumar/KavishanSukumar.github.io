import React, { useState, useEffect } from "react";
import "./nav.css";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { MdOutlineWorkOutline } from "react-icons/md";
import { BiBook } from "react-icons/bi";
import { GoBeaker } from "react-icons/go";
import { TiDocumentText } from "react-icons/ti";
import { TbMessage } from "react-icons/tb";

const NAV_ITEMS = [
  { id: "#",            icon: <AiOutlineHome />,          label: "Home" },
  { id: "#about",       icon: <AiOutlineUser />,           label: "About" },
  { id: "#research",    icon: <GoBeaker />,                 label: "Research" },
  { id: "#workhistory", icon: <MdOutlineWorkOutline />,    label: "Experience" },
  { id: "#skills",      icon: <BiBook />,                  label: "Skills" },
  { id: "#projects",    icon: <TiDocumentText />,          label: "Projects" },
  { id: "#contact",     icon: <TbMessage />,               label: "Contact" },
];

function Nav() {
  const [activeNav, setActiveNav] = useState("#");

  useEffect(() => {
    const sectionIds = ["about", "research", "workhistory", "skills", "projects", "contact"];

    const handleScroll = () => {
      if (window.scrollY < 200) setActiveNav("#");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observers = [];
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(`#${entry.target.id}`);
        }
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: "0px 0px -50% 0px",
        threshold: 0,
      });
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <nav aria-label="Site navigation">
      {NAV_ITEMS.map(({ id, icon, label }) => (
        <a
          key={id}
          href={id}
          onClick={() => setActiveNav(id)}
          className={activeNav === id ? "active" : ""}
          aria-label={label}
          title={label}
        >
          <span className="nav__icon">{icon}</span>
          <span className="nav__label">{label}</span>
        </a>
      ))}
    </nav>
  );
}

export default Nav;
