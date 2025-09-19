import React from "react";

const typeButton = {
  primaryButton:
    "bg-[#006450] text-white px-7 py-2 rounded hover:bg-green-700 flex gap-2",
  secondaryButton:
    "bg-[#FFFDD0] text-[#006450] px-7 py-2 rounded hover:bg-[#F5F1E6]",
  navbarButton: "bg-[#FFFDD0] text-[#006450] w-full flex justify-center whitespace-nowrap text-sm sm:text-base rounded-xl px-3.5 py-2 transition-colors focus:outline-none",
  tertiaryButton:
    "bg-transparent border border-[#006450] text-[#006450] px-10 py-2 rounded hover:bg-[#E6F5F1] flex gap-2",
  disableButton:
    "bg-[#006450] text-white px-7 py-2 rounded opacity-50 cursor-not-allowed",
};

export const Button = ({ label, children, operazione, type = "button", disabled, noHover = true }) => {
  let className = typeButton.disableButton;

  if (label === "primary") className = disabled ? typeButton.disableButton : typeButton.primaryButton;
  else if (label === "secondary") className = typeButton.secondaryButton;
  else if (label === "tertiary") className = typeButton.tertiaryButton;
   else if (label === "navbarButton") className = typeButton.navbarButton;
if (noHover) {
  className = className
    .split(" ")
    .filter((cls) => !cls.startsWith("hover:"))
    .join(" ");
}

  return (
    <button
      type={type}
      onClick={operazione}
      className={className}
      disabled={disabled}
    >
      {children || "Button"}
    </button>
  );
};
