const Legenda = ({ children, label, id }) => {
  return (
    <div
      id={id}
      className="mt-4 rounded-xl border border-gray-200 bg-white p-3"
    >
      <p className="text-xs font-medium text-gray-700 mb-2">{label}</p>
      {children}
    </div>
  );
};
export default Legenda;
