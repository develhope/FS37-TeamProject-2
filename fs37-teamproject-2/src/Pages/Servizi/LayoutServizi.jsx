import { Outlet } from "react-router-dom";

function LayoutServizi() {
    return(
        <>
            <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-[#006450]">Area Servizi</h1>
      
      {/* Mostra il contenuto delle route figlie qui */}
      <Outlet />
    </div>
        </>
    )
}

export default LayoutServizi;