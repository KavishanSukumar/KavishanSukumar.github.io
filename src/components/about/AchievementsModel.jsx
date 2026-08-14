import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import "./about.css";
import { FaArrowAltCircleUp } from "react-icons/fa";

const AchievementsModel = forwardRef((props, ref) => {
  const [display, setDisplay] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      OpenModelAchievements: () => OpenModelAchievements(),
      CloseModelAchievements: () => CloseModelAchievements(),
    };
  });

  const OpenModelAchievements = () => {
    setDisplay(true);
  };
  const CloseModelAchievements = () => {
    setDisplay(false);
  };
  if (!display) {
    return null;
  } else {
    return ReactDOM.createPortal(
      <div className="container modal__wrapper">
        <div onClick={CloseModelAchievements} className="modal__backdrop" />
        <div className="modal__box">
          <div className="aboutmecomponent__container">
            <h3>Achievements</h3>
            <div className="aboutmecomponent__content">
              <article className="aboutmecomponent__details">
                <FaArrowAltCircleUp className="aboutmecomponent__details-icon" style={{ color: '#00629B' }} />
                <div>
                  <h4>
                    IEEE IECON 2024 — Industrial Electronics Society
                  </h4>
                  <small className="text-light">
                    Research accepted for presentation at the 50th Annual Conference of the IEEE Industrial Electronics Society (IECON 2024)
                  </small>
                </div>
                <div style={{ textAlign: "right" }}>
                  <small className="text-light">2024</small>
                </div>
              </article>
              <article className="aboutmecomponent__details">
                <FaArrowAltCircleUp className="aboutmecomponent__details-icon" />
                <div>
                  <h4>
                    Nocturne — Annual Research Symposium 2023
                  </h4>
                  <small className="text-light">Abstract published at the Annual Research Symposium 2023, University of Colombo</small>
                </div>
                <div style={{ textAlign: "right" }}>
                  <small className="text-light">2023</small>
                </div>
              </article>
              <article className="aboutmecomponent__details">
                <FaArrowAltCircleUp className="aboutmecomponent__details-icon" />
                <div>
                  <h4>HackX 2021 -Finalist</h4>
                </div>
              </article>
              <article className="aboutmecomponent__details">
                <FaArrowAltCircleUp className="aboutmecomponent__details-icon" />
                <div>
                  <h4>Participated in,</h4>
                  <small className="text-light">
                    INSL-2021 | Revolux-2021 | Fresh Hack 1.0 | ReidXtreme 1.0
                  </small>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById("modal-root")
    );
  }
});
export default AchievementsModel;
