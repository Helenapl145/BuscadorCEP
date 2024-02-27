import { useState } from "react";
import { FiSearch } from "react-icons/fi"
import api from "./services/api";

import "./style.css"

function App() {
  const [input, setInput] = useState("")
  const [data, setData] = useState()


  async function handleSearch() {
    setData()
    if(input === ''){
      alert("Digite algum CEP")
      return
    }

    try {
      const response = await api.get(`${input}/json/`)

      if(response.data.erro){
        alert("CEP não encontrado")
        return
      }
    
      setData(response.data)
    
    } catch (error) {
      alert("CEP não encontrado")
    }


    setInput("")
   
  }


  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
          type="text"
          maxLength={8}
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch">
          <FiSearch 
            size={25} 
            color="#ffff"
            onClick={handleSearch}/>
        </button>
      </div>

     {data && (
       <main className="main">
        <h2>CEP: {data.cep}</h2>

        <span>{data.logradouro}</span>
        <span>{data.bairro}</span>
        <span>{data.localidade} - {data.uf}</span>
      </main>
     )}

    </div>
  );
}

export default App;
