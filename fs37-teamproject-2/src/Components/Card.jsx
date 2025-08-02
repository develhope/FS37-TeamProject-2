import React from 'react';

const Card = ({ title, children, linkText }) => (
  <div className="flex flex-col justify-center bg-white rounded-2xl shadow p-6">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-center w-full max-w-xs mx-auto">
      {children}
    </p>
    <a className="mt-4 text-[#006450] font-medium hover:underline">
      {linkText}
    </a>
  </div>
);

export default Card;