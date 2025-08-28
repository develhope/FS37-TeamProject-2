import React from "react";

const typeButton = {
  primaryButton:
    "bg-[#006450] text-white px-7 py-2 rounded hover:bg-green-700 flex gap-2",
  secondaryButton:
    "bg-[#FFFDD0] text-[#006450] px-7 py-2 rounded hover:bg-[#F5F1E6]",
  tertiaryButton:
    "bg-transparent border border-[#006450] text-[#006450] px-10 py-2 rounded hover:bg-[#E6F5F1] flex gap-2",
  disableButton:
    "bg-[#006450] text-white px-7 py-2 rounded opacity-50 cursor-not-allowed",
};

export const Button = ({ label, children, operazione, type }) => {
  if (label === "primary") {
    return (
      <button
        type={type}
        onClick={operazione}
        className={typeButton.primaryButton}
      >
        {children || "Primary"}
      </button>
    );
  } else if (label === "secondary") {
    return (
      <button
        type={type}
        onClick={operazione}
        className={typeButton.secondaryButton}
      >
        {children || "Secondary"}
      </button>
    );
  } else if (label === "tertiary") {
    return (
      <button
        type={type}
        onClick={operazione}
        className={typeButton.tertiaryButton}
      >
        {children || "Tertiary"}
      </button>
    );
  } else {
    return (
      <button
        type={type}
        onClick={operazione}
        className={typeButton.disableButton}
        disabled
      >
        {children || "Disabled"}
      </button>
    );
  }
};
