import React from 'react';
const typeInput= {
  defaultInput: "w-full border border-gray-300 rounded px-3 py-2 focus:border-[#006450] hover:border-[#006450] placeholder-gray-800 text-gray-800",
  disabledInput: "w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed placeholder-gray-800 text-gray-800",
  errorInput: "w-full border border-red-500 rounded px-3 py-2 focus:border-[#006450] placeholder-gray-800 text-gray-800",
  hoverInput: "w-full border border-gray-300 rounded px-3 py-2 hover:border-[#006450] placeholder-gray-800 text-gray-800"
}
export const Input = ({ type, placeholder, onChange, mode }) => {
  if(mode === "defaultInput"){
   return <input
    className={typeInput.defaultInput}
    placeholder={placeholder}
    onChange={onChange}
    type= {type}
  />
  } else if(mode === "disabledInput"){
    return <input
      className={typeInput.disabledInput}
      placeholder={placeholder}
      disabled
      type= {type}
    />
  } else if(mode === "errorInput"){
    return <input
      className={typeInput.errorInput}
      placeholder={placeholder}
      onChange={onChange}
      type= {type}
    />
  } else if(mode === "hoverInput"){
    return <input
      className={typeInput.hoverInput}
      placeholder={placeholder}
      onChange={onChange}
      type= {type}
    />
  }
};

