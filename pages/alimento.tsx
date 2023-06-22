import Link from "next/link";
import Layout from "components/Layout";
import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import Table from "components/Table";
import { useAuth } from "components/AuthContext";
import BotaoRemover from "components/BotaoRemover";

export default function Alimento() {
   
  const [showModal, setShowModal] = useState(false);
  const { authToken, login, logout } = useAuth();

  console.log("TOKEN:",authToken)

  const columns = useMemo(
      () => [
        {
          Header: "Lista de Alimentos",
          columns: [
            {
              Header: "Id",
              accessor: "id",
            },
            {
              Header: "Nome",
              accessor: "nome",
            },
            {
              Header: "Descrição",
              accessor: "descricao",
            },
            {
              Header: "Ações",
              accessor: "remover",
            },
          ],
        }
      ],
      []
  );

  const [data, setData] = useState([]);

  const AdicionarAlimento = (e) => {

    e.preventDefault();
    setShowModal(false)
    
    const nome_alimento = document.getElementById("grid-nome-alimento").value;
    const descricao_alimento = document.getElementById("grid-descricao-alimento").value;

    var contId = 1;

    if(data.length > 0)
    {
      const ultimoItem = data[data.length - 1];
      contId = ultimoItem.id+1;
    }
      
    const novo_alimento = {
      id:contId, nome: nome_alimento, descricao: descricao_alimento
    };
  
    setData((prevData) => [...prevData, novo_alimento]); 
  }

  const onClickRemover = (id) => {
    const novaLista = data.filter(item => item.id !== id);
    setData(novaLista);
  };

  ////////////////////////////////////////////////////////////////////////////

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const filteredData = data.filter((item) => {
      const itemName = item.nome || ""; 
      return itemName.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredData(filteredData);
  }, [searchValue, data]);

  return (
      <Layout>
        {showModal ? (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Cadastro de Alimento
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <form className="w-full max-w-lg m-2 ...">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                          Nome
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-nome-alimento" type="text" placeholder="Melancia"/>
                        <p className="text-red-500 text-xs italic">Campo Obrigatório.</p>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Descrição
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-descricao-alimento" type="text" placeholder="Fruta"/>
                    </div>
                    <div className="w-full md:w-2/3 px-3 mt-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Armazenamento
                        </label>
                        {/* todo:criar componente */}
                        <select label="Select Version" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                          <option>Armário</option>
                          <option>Freezer</option>
                          <option>Geladeira</option>
                      </select>
                    </div>
                  </div>  
                </form>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={AdicionarAlimento}
                >
                  Adicionar Alimento
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        ) : null}
        
        <button onClick={() => setShowModal(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-3 ..." data-modal-target="popup-modal" data-modal-toggle="popup-modal">
          Adicionar Alimento
        </button>
        
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative m-2 ...">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-black" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd">
                    </path>
                </svg>
            </div>
            <input type="text" id="table-search" value={searchValue} onChange={handleSearchChange}  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Busca"/>
        </div>
        <Table columns={columns} data={filteredData} onClickRemover={onClickRemover}/>
      </Layout>
  )
}