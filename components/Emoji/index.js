import React from "react";

const Emoji = ({ label, children, style, className }) => (
  <span role="img" aria-label={label} className={className} style={style}>
    {children}
  </span>
);

export default Emoji;
