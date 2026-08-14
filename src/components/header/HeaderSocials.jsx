import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub, FaHackerrank, FaStackOverflow } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const HeaderSocials = () => {
  return (
    <div className="header__socials">
      <a
        href="https://www.linkedin.com/in/sukumar-kavishan/"
        target={"_blank"}
        rel="noreferrer"
      >
        <BsLinkedin />
      </a>
      <a href="https://github.com/KavishanSukumar" target={"_blank"} rel="noreferrer">
        <FaGithub />
      </a>
      <a href="https://www.hackerrank.com/KavishanSukumar" target={"_blank"} rel="noreferrer">
        <FaHackerrank />
      </a>
      <a
        href="https://stackoverflow.com/users/13060709/kavishan-sukumar"
        target={"_blank"}
        rel="noreferrer"
      >
        <FaStackOverflow />
      </a>
      <a href="https://leetcode.com/kavishansukumar/" target={"_blank"} rel="noreferrer">
        <SiLeetcode />
      </a>
    </div>
  );
};

export default HeaderSocials;
