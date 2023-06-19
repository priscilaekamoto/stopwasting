import Link from "next/link";
import Layout from "components/Layout";
import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import Table from "components/Table";


export default function Armazenamento() {
   
  const [showModal, setShowModal] = useState(false);

  const columns = useMemo(
      () => [
        {
          Header: "Lista de Armazenamento",
          columns: [
            {
              Header: "Nome",
              accessor: "show.name",
            },
            {
              Header: "Tipo",
              accessor: "show.type",
            },
          ],
        }
      ],
      []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      //const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
      //setData(result.data);

      setData(
        [
          {
            show:{name:"leandro shindi ekamoto", type:"tipo teste"}
          }
        ]
      );
    })();
  }, []);

  const AdicionarArmazenamento = (e) => {
    e.preventDefault();
    setShowModal(false)
    console.log("entrou na função para cadastrar armazenamento")

    
  }

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
                    Cadastro de Armazenamento
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
                  <form class="w-full max-w-lg m-2 ...">
                      <div class="flex flex-wrap -mx-3 mb-6">
                      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                          Nome
                          </label>
                          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-nome-armazenamento" type="text" placeholder="Geladeira"/>
                          <p class="text-red-500 text-xs italic">Campo Obrigatório.</p>
                      </div>
                      <div class="w-full md:w-1/2 px-3">
                          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                          Descrição
                          </label>
                          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-descricao-armazenamento" type="text" placeholder="Local refrigerado"/>
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
                    onClick={AdicionarArmazenamento}
                  >
                    Adicionar Armazenamento
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
          ) : null}
          
          <button onClick={() => setShowModal(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-3 ..." data-modal-target="popup-modal" data-modal-toggle="popup-modal">
            Adicionar Armazenamento
          </button>
          <Table columns={columns} data={data} />
        </Layout>
    )
}