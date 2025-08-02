import React from 'react';
const typeInput= {
  defaultInput: "w-full border border-gray-300 rounded px-3 py-2 focus:border-[#006450] hover:border-[#006450]",
  disabledInput: "w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed",
  errorInput: "w-full border border-red-500 rounded px-3 py-2 focus:border-[#006450]",
  hoverInput: "w-full border border-gray-300 rounded px-3 py-2 hover:border-[#006450]"
}
export const Input = ({ type, placeholder }) => {
  if(type === "defaultInput"){
   return <input
    className={typeInput.defaultInput}
    placeholder={placeholder}
  />
  } else if(type === "disabledInput"){
    return <input
      className={typeInput.disabledInput}
      placeholder={placeholder}
      disabled
    />
  } else if(type === "errorInput"){
    return <input
      className={typeInput.errorInput}
      placeholder={placeholder}
    />
  } else if(type === "hoverInput"){
    return <input
      className={typeInput.hoverInput}
      placeholder={placeholder}
    />
  }
};

