// NotFound.js
import React from "react";
import styles from "../contact/bubble.module.css";
 // Import the bubble styles

const ContactUS = () => {
  return (
    <div className="grid h-screen place-content-center bg-black">
      <BubbleText />
    </div>
  );
};

const BubbleText = () => {
  return (
    <h2 className="text-center text-8xl font-thin text-indigo-200">
      {"bowlpulp@gmail.com".split().map((child, idx) => (
        <span className={styles.hoverText} key={idx}>
          {child}
        </span>
      ))}
    </h2>
  );
};

export default ContactUS;
