import React from 'react';

const typeButton={
  primaryButton: "bg-[#006450] text-white px-4 py-2 rounded hover:bg-green-700",
  secondaryButton: "bg-[#FFFDD0] text-[#006450] px-4 py-2 rounded hover:bg-[#F5F1E6]",
  tertiaryButton:"bg-transparent border border-[#006450] text-[#006450] px-4 py-2 rounded hover:bg-[#E6F5F1]",
  disableButton: "bg-[#006450] text-white px-4 py-2 rounded opacity-50 cursor-not-allowed"
}

export const Button = ({ label }) => {
  if(label === "Primary"){
    return <button className={typeButton.primaryButton}>{label}</button>;
  } else if(label === "Secondary"){
    return <button className={typeButton.secondaryButton}>{label}</button>;
  } else if(label === "Tertiary"){
    return <button className={typeButton.tertiaryButton}>{label}</button>;
  } else {
    return <button className={typeButton.disableButton} disabled>{label}</button>;
  }
};