import Link from "next/link";
import Layout from "components/Layout";
import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import Table from "components/Table";
import { useAuth } from "components/AuthContext";
import BotaoRemover from "components/BotaoRemover";
import { ConverterDataAmericanaParaBrasileira, ConverterDataBrasileiraAmericana } from "./utils/ConverterDataAmericanaParaBrasileira";
// import { converterDataAmericanaParaBrasileira } from './utils/utils/';
// Tentei usar mas dá erro ao dar F5 na tela
// import { format } from 'date-fns';
// import { parseISO } from 'date-fns/esm';

export default function Alimento() {
  
  const { authToken, login, logout } = useAuth();
  const [showModalCadastrar, setShowModalCadastrar] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [gridNomeAlimentoEditar, setGridNomeAlimentoEditar] = useState("");
  const [gridDescricaoAlimentoEditar, setGridDescricaoAlimentoEditar] = useState("");
  const [gridArmazenamentoAlimentoEditar, setGridArmazenamentoAlimentoEditar] = useState("");
  const [gridValidadeAlimentoEditar, setGridValidadeAlimentoEditar] = useState("");
  const [idAlimentoEditar, setIdAlimentoEditar] = useState("");
  const [data, setData] = useState([]);

  console.log("TOKEN:",authToken)

  const listaArmazenamento = [
    { id: 1, descricao: "Armário" },
    { id: 2, descricao: "Freezer" },
    { id: 3, descricao: "Geladeira" }
  ];

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
              Header: "Armazenamento",
              accessor: "armazenamento",
            },
            {
              Header: "Validade",
              accessor: "validade",
            },
            {
              Header: "Ações",
              accessor: "editar-remover",
            },
          ],
        }
      ],
      []
  );

  const EditarAlimento = (e) => {

    const nomeValidacao = document.querySelector('.campoObrigatorioNomeEditar');
    const descricaoValidacao = document.querySelector('.campoObrigatorioDescricaoEditar');
    const armazenamentoValidacao = document.querySelector('.campoObrigatorioArmazenamentoEditar');
    const validadeValidacao = document.querySelector('.campoObrigatorioValidadeEditar');

    var fechaModal = true;

    if(gridNomeAlimentoEditar === "")
    {
      nomeValidacao.classList.remove('hidden'); 
      fechaModal = false;
      
    } else
      nomeValidacao.classList.add('hidden'); 
  
    if(gridDescricaoAlimentoEditar === "")
    {
      descricaoValidacao.classList.remove('hidden'); 
      fechaModal = false;
    } else 
      descricaoValidacao.classList.add('hidden'); 

    if(gridArmazenamentoAlimentoEditar === "")
    {
      armazenamentoValidacao.classList.remove('hidden'); 
      fechaModal = false;
    } else
      armazenamentoValidacao.classList.add('hidden'); 

    if(gridValidadeAlimentoEditar === "")
    {
      validadeValidacao.classList.remove('hidden'); 
      fechaModal = false;
    } else
      validadeValidacao.classList.add('hidden'); 
    
    const alimentoEditar = data.filter(item => item.id === idAlimentoEditar);

    alimentoEditar.id = idAlimentoEditar;
    alimentoEditar.nome = gridNomeAlimentoEditar;
    alimentoEditar.descricao = gridDescricaoAlimentoEditar;

    const objetoFiltrado = listaArmazenamento.find(item => item.id == gridArmazenamentoAlimentoEditar);
    alimentoEditar.armazenamento = objetoFiltrado?.descricao;

    if(gridValidadeAlimentoEditar!=="")
      alimentoEditar.validade = ConverterDataAmericanaParaBrasileira(gridValidadeAlimentoEditar);
    
    const novaLista = data.filter(item => item.id !== idAlimentoEditar);
    novaLista.push(alimentoEditar);
    setData(novaLista);
    
    setShowModalEditar(!fechaModal);
  }

  const AdicionarAlimento = (e) => {

    e.preventDefault();

    const nomeValidacaoCadastrar = document.querySelector('.campoObrigatorioNomeCadastrar');
    const descricaoValidacaoCadastrar = document.querySelector('.campoObrigatorioDescricaoCadastrar');
    const armazenamentoValidacaoCadastrar = document.querySelector('.campoObrigatorioArmazenamentoCadastrar');
    const validadeValidacaoCadastrar = document.querySelector('.campoObrigatorioValidadeCadastrar');

    const nome_alimento = document.getElementById("grid-nome-alimento").value;
    const data_validade_alimento = document.getElementById("grid-data-validade").value;
    const descricao_alimento = document.getElementById("grid-descricao-alimento").value;
    const armazenamento_alimento = document.getElementById("grid-armazenamento-alimento").value;

    var fechaModal = true;

    if(nome_alimento === "")
    {
      nomeValidacaoCadastrar.classList.remove('hidden'); 
      fechaModal = false;
      
    } else
      nomeValidacaoCadastrar.classList.add('hidden'); 
  
    if(descricao_alimento === "")
    {
      descricaoValidacaoCadastrar.classList.remove('hidden'); 
      fechaModal = false;
    } else 
      descricaoValidacaoCadastrar.classList.add('hidden'); 

    if(armazenamento_alimento === "")
    {
      armazenamentoValidacaoCadastrar.classList.remove('hidden'); 
      fechaModal = false;
    } else
      armazenamentoValidacaoCadastrar.classList.add('hidden'); 

     if(data_validade_alimento === "")
     {
       validadeValidacaoCadastrar.classList.remove('hidden'); 
       fechaModal = false;
     } else
      validadeValidacaoCadastrar.classList.add('hidden'); 

    setShowModalCadastrar(!fechaModal)

    if(fechaModal)
    {
      var contId = 1;

      if(data.length > 0)
      {
        const maiorId = data.reduce((maxId, item) => {
          return item.id > maxId ? item.id : maxId;
        }, -1);
        contId = maiorId+1;
      }
      
      let validadeC = "";
      if(data_validade_alimento!=="")
        validadeC = ConverterDataAmericanaParaBrasileira(data_validade_alimento);
      
      const novo_alimento = {
        id:contId, nome: nome_alimento, armazenamento:armazenamento_alimento, validade:validadeC, descricao: descricao_alimento
      };

      setData((prevData) => [...prevData, novo_alimento]); 
    }
  }

  const onClickRemover = (id) => {
    const novaLista = data.filter(item => item.id !== id);
    setData(novaLista);
  };

  const onClickEditar = (id) => {

    setIdAlimentoEditar(id)
    setShowModalEditar(true);
    const alimentoEditar = data.filter(item => item.id === id);
    const objetoFiltrado = listaArmazenamento.find(item => item.descricao === alimentoEditar[0].armazenamento);

    setGridNomeAlimentoEditar(alimentoEditar[0].nome)
    setGridDescricaoAlimentoEditar(alimentoEditar[0].descricao)
    setGridArmazenamentoAlimentoEditar(objetoFiltrado.id)

    var dataAmer = ConverterDataBrasileiraAmericana(alimentoEditar[0].validade);

    setGridValidadeAlimentoEditar(dataAmer)
  };
  
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

      {showModalEditar ? (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Editar Alimento
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModalEditar(false)}
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
                        <input required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-nome-alimento-editar" value={gridNomeAlimentoEditar} onChange={(event) => setGridNomeAlimentoEditar(event.target.value)} type="text" placeholder="Melancia"/>
                        {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-nome-alimento-editar" value={gridNomeAlimentoEditar} onChange={(event) => setGridNomeAlimentoEditar(event.target.value)} type="text" placeholder="Melancia"/> */}
                        <p className="text-red-500 text-xs hidden italic campoObrigatorioNomeEditar">Campo Obrigatório.</p>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Descrição
                        </label>
                        <input required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-descricao-alimento-editar" type="text" placeholder="Fruta" value={gridDescricaoAlimentoEditar} onChange={(event) => setGridDescricaoAlimentoEditar(event.target.value)}/>
                        <p className="text-red-500 text-xs italic hidden campoObrigatorioDescricaoEditar">Campo Obrigatório.</p>
                    </div>
                    <div className="w-full md:w-2/3 px-2 mt-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Armazenamento
                        </label>
                        {/* todo:criar componente */}
                        <select required label="Select Version" value={gridArmazenamentoAlimentoEditar} onChange={(event) => setGridArmazenamentoAlimentoEditar(event.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-armazenamento-alimento-editar">
                          <option value="1">Armário</option>
                          <option value="2">Freezer</option>
                          <option value="3">Geladeira</option>
                        </select>
                        <p className="text-red-500 text-xs italic hidden campoObrigatorioArmazenamentoEditar">Campo Obrigatório.</p>
                    </div>
                    <div className="w-full md:w-2/3 px-2 mt-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Data Validade
                        </label>
                        {/* todo:criar componente */}
                        <input required value={gridValidadeAlimentoEditar} onChange={(event) => setGridValidadeAlimentoEditar(event.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-data-validade-editar" type="date" placeholder="Fruta"/>
                        <p className="text-red-500 text-xs italic hidden campoObrigatorioValidadeEditar">Campo Obrigatório.</p>
                    </div>
                  </div>  
                </form>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModalEditar(false)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={EditarAlimento}
                >
                  Editar Alimento
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        ) : null}

        {showModalCadastrar ? (
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
                  onClick={() => setShowModalCadastrar(false)}
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
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-nome-alimento" type="text" placeholder="Melancia"/>
                        <p className="text-red-500 text-xs italic hidden campoObrigatorioNomeCadastrar">Campo Obrigatório.</p>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Descrição
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-descricao-alimento" type="text" placeholder="Fruta"/>
                        <p className="text-red-500 text-xs italic hidden campoObrigatorioDescricaoCadastrar">Campo Obrigatório.</p>
                    </div>
                    <div className="w-full md:w-2/3 px-2 mt-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Armazenamento
                        </label>
                        {/* todo:criar componente */}
                        <select label="Select Version" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-armazenamento-alimento">
                          <option>Armário</option>
                          <option>Freezer</option>
                          <option>Geladeira</option>
                        </select>
                        <p className="text-red-500 text-xs italic hidden campoObrigatorioArmazenamentoCadastrar">Campo Obrigatório.</p>
                    </div>
                    <div className="w-full md:w-2/3 px-2 mt-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Data Validade
                        </label>
                        {/* todo:criar componente */}
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-data-validade" type="date" placeholder="Fruta"/>
                        <p className="text-red-500 text-xs italic hidden campoObrigatorioValidadeCadastrar">Campo Obrigatório.</p>
                    </div>
                  </div>  
                </form>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModalCadastrar(false)}
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
        
        <button onClick={() => setShowModalCadastrar(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-3 ..." data-modal-target="popup-modal" data-modal-toggle="popup-modal">
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
        <Table columns={columns} data={filteredData} onClickRemover={onClickRemover} onClickEditar={onClickEditar}/>
      </Layout>
  )
}