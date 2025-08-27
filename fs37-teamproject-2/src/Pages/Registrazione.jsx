import { useState } from "react";
 const style = "w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-[#006450] hover:border-[#006450] outline-none";
function Registrazione() {
   
    const [user, setUser] = useState({});
    function handleChange(e) {
        const {name, value} = e.target;
        setUser((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
 
    }
    async function handleRegistrazione () {
      try {
        const result = await fetch("http://localhost:3000/registrazione", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({utente: user})}) 
        const data = await result.json()
        console.log (data.message)
      }
      catch (error) {
        console.error(error)
      }
    }
    async function handleRegistrazione (e) {
      e.preventDefault();
      try {
        const result = await fetch("http://localhost:3000/registrazione", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({utente: user})}) 
        const data = await result.json()
        console.log (data.message)
      }
      catch (error) {
        console.error(error)
      }
    }
    return(
        <>
         <main className="flex-1 flex items-center justify-center p-8 bg-gray-50">
                <form className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
                  <h2 className="text-3xl font-semibold text-center mb-6">Accedi al tuo account</h2>
                  <div className="space-y-4">
                    <input onChange={handleChange}
                      type="email"
                      name="email"
                      placeholder="Email"
                      className= {style}
                    />
                    <input onChange={handleChange}
                      type="password"
                      name="password"
                      placeholder="Password"
                      className= {style}
                    />
                      <input onChange={handleChange}
                      type="text"
                      name="nome"
                      placeholder="Nome"
                      className= {style}
                    />
                      <input onChange={handleChange}
                      type="text"
                      name="cognome"
                      placeholder="Cognome"
                      className= {style}
                    />
                  </div>
                
                  <button type="submit" className="w-full bg-[#006450] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#00503D] transition">
                    Registrati
                  </button>
        
                  <div className="flex items-center my-6">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="mx-2 text-gray-400">oppure</span>
                    <hr className="flex-grow border-t border-gray-300" />
                  </div>
        
                  <p className="text-center text-sm text-gray-500 mt-6">
                    Hai già un account?{' '}
                    <a href="#" className="text-[#006450] font-medium hover:underline">
                      Effettua il login
                    </a>
                  </p>
                </form>
              </main>
        </>
    )
}

export default Registrazione;