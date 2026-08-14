import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import "./about.css";
import { FiBookOpen } from "react-icons/fi";

const EducationModel = forwardRef((props, ref) => {
  const [display, setDisplay] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      OpenModelEducation: () => OpenModelEducation(),
      CloseModelEducation: () => CloseModelEducation(),
    };
  });

  const OpenModelEducation = () => {
    setDisplay(true);
  };
  const CloseModelEducation = () => {
    setDisplay(false);
  };
  if (!display) {
    return null;
  } else {
    return ReactDOM.createPortal(
      <div className="container modal__wrapper">
        <div onClick={CloseModelEducation} className="modal__backdrop" />
        <div className="modal__box">
          <div className="aboutmecomponent__container">
            <h3>Education</h3>
            <div className="aboutmecomponent__content">
              <article className="aboutmecomponent__details">
                <FiBookOpen className="aboutmecomponent__details-icon" />
                <div>
                  <h4>University of Colombo School of Computing</h4>
                  <small className="text-light">
                    B. Sc. (Hons) in Software Engineering (Reading)
                  </small>
                  <small className="text-light">
                    Current GPA&nbsp;
                    <span style={{ fontWeight: "bold" }}>3.57/4.00</span>
                  </small>
                </div>
                <div style={{ textAlign: "right" }}>
                  <small className="text-light">2020-2024</small>
                </div>
              </article>
              <article className="aboutmecomponent__details">
                <FiBookOpen className="aboutmecomponent__details-icon" />
                <div>
                  <h4>St Peter's College, Colombo 04</h4>
                  <small className="text-light">Advanced Level</small>
                  <br />
                  <small className="text-light">
                    Physics-A <br /> Combined Mathematics-B <br /> Chemistry-B
                  </small>
                </div>
                <div style={{ textAlign: "right" }}>
                  <small className="text-light">2016-2018</small>
                </div>
              </article>
              <article className="aboutmecomponent__details">
                <FiBookOpen className="aboutmecomponent__details-icon" />
                <div>
                  <h4>Noor International School, Kalutara South</h4>
                  <small className="text-light">Ordinary Level</small>
                  <br />
                  <small className="text-light">7 A's and 2 B's</small>
                </div>
                <div style={{ textAlign: "right" }}>
                  <small className="text-light">2004-2015</small>
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
export default EducationModel;
