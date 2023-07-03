import Link from "next/link";
import Layout from "components/Layout";
import axios from "axios";
import React, { useMemo, useState, useEffect, useRef } from "react";
import Table from "components/Table";
import { useAuth } from "components/AuthContext";
import BotaoRemover from "components/BotaoRemover";
import { ConverterDataAmericanaParaBrasileira, ConverterDataBrasileiraAmericana, ConverterDataBrasileiraAmericana2 } from "./utils/ConverterDataAmericanaParaBrasileira";
import styles from '../styles/Alimento.module.css';
import { fetchData, CheckLogin, Logado } from "../services/fetch";
import CardHome from "components/cardHome/cardHome";
import CardIcon from "components/icon/CardIcon";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function Alimento() {

  const { authToken, login, logout } = useAuth();
  const [showModalCadastrar, setShowModalCadastrar] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [gridNomeAlimentoEditar, setGridNomeAlimentoEditar] = useState("");
  const [gridArmazenamentoAlimentoEditar, setGridArmazenamentoAlimentoEditar] = useState("");
  const [idAlimentoEditar, setIdAlimentoEditar] = useState("");
  const [tipoAlimentoEditar, setTipoAlimentoEditar] = useState("");
  const [diasAntesEditar, setDiasAntesEditar] = useState("");
  const [dataValidadeEditar, setDataValidadeEditar] = useState("");
  const [data, setData] = useState([]);
  const [tipoAlimentos, setTipoAlimentos] = useState([]);
  const [localArmazenamento, setLocalArmazenamento] = useState([]);

  const router = useRouter();
  const callbackExecutedRef = useRef(false);

  useEffect(() => {
    if (router.query.CodAlimento && !callbackExecutedRef.current) {
      onClickEditar(router.query.CodAlimento);

      const { myQueryParam, ...queryWithoutParam } = router.query;
      router.replace({ query: queryWithoutParam });
      callbackExecutedRef.current = true;
    }
  }, [router.query]);

  useEffect(() => {
    Logado();
  }, []);

  useEffect(() => {
    getFoods();
    getTipoComida();
    getLocalArmazenamento();
  }, []);

  const getFoods = async () => {

    const result = await fetchData("https://localhost:5001/comidas", "GET", null);

    if (result.success) {
      console.log(result.data);
      setData(result.data);
    }
  }

  const getTipoComida = async () => {

    const result = await fetchData("https://localhost:5001/tipocomida", "GET", null);

    if (result.success) {
      console.log(result.data);
      setTipoAlimentos(result.data);
    }
  }

  const getLocalArmazenamento = async () => {

    const result = await fetchData("https://localhost:5001/localarmazenamento", "GET", null);

    if (result.success) {
      console.log(result.data);
      setLocalArmazenamento(result.data);
    }
  }

  const EditarAlimento = async (e) => {

    const nomeValidacao = document.querySelector('.campoObrigatorioNomeEditar');
    const armazenamentoValidacao = document.querySelector('.campoObrigatorioArmazenamentoEditar');
    const validadeValidacao = document.querySelector('.campoObrigatorioValidadeEditar');
    const diasAntesValidacao = document.querySelector('.campoObrigatorioDiasAntesEditar');
    const tipoValidacao = document.querySelector('.campoObrigatorioArmazenamentoEditar');

    var fechaModal = true;

    if (gridNomeAlimentoEditar === "") {
      nomeValidacao.classList.remove('hidden');
      fechaModal = false;
    } else
      nomeValidacao.classList.add('hidden');

    if (gridArmazenamentoAlimentoEditar === "") {
      armazenamentoValidacao.classList.remove('hidden');
      fechaModal = false;
    } else
      armazenamentoValidacao.classList.add('hidden');

    if (dataValidadeEditar === "") {
      validadeValidacao.classList.remove('hidden');
      fechaModal = false;
    } else
      validadeValidacao.classList.add('hidden');

    if (tipoAlimentoEditar === "") {
      tipoValidacao.classList.remove('hidden');
      fechaModal = false;
    } else
      tipoValidacao.classList.add('hidden');

    if (diasAntesEditar === "") {
      diasAntesValidacao.classList.remove('hidden');
      fechaModal = false;
    } else
      diasAntesValidacao.classList.add('hidden');

    const alimentoEditar = {
      DataVencimento: ConverterDataAmericanaParaBrasileira(dataValidadeEditar),
      TipoComidaId: parseInt(tipoAlimentoEditar),
      LocalArmazenamentoId: parseInt(gridArmazenamentoAlimentoEditar),
      DiasAntes: parseInt(diasAntesEditar),
      Nome: gridNomeAlimentoEditar
    }

    const result = await fetchData("https://localhost:5001/comidas/" + idAlimentoEditar, "PUT", alimentoEditar);

    if (result.success) {
      setShowModalCadastrar(!fechaModal);
      alert(result.message);
      getFoods();
    }
    else {
      alert(result.message);
    }
    setShowModalEditar(!fechaModal);
  }

  const AdicionarAlimento = async (e) => {

    e.preventDefault();

    const nomeValidacaoCadastrar = document.querySelector('.campoObrigatorioNomeCadastrar');
    const armazenamentoValidacaoCadastrar = document.querySelector('.campoObrigatorioArmazenamentoCadastrar');
    const validadeValidacaoCadastrar = document.querySelector('.campoObrigatorioValidadeCadastrar');
    const validadeTipoAlimentoCadastrar = document.querySelector('.campoObrigatorioTipoAlimentoCadastrar');
    const validadeDiasAntesCadastrar = document.querySelector('.campoObrigatorioDiasAntesCadastrar');

    const nome_alimento = document.getElementById("grid-nome-alimento").value;
    const data_validade_alimento = document.getElementById("grid-data-validade").value;
    const armazenamento_alimento = document.getElementById("grid-armazenamento-alimento").value;
    const tipo_alimento = document.getElementById("grid-tipo-alimento").value;
    const dias_antes = document.getElementById("txt-dias-antes-cadastrar").value;
    var fechaModal = true;

    if (nome_alimento === "") {
      nomeValidacaoCadastrar.classList.remove('hidden');
      fechaModal = false;

    } else
      nomeValidacaoCadastrar.classList.add('hidden');

    if (armazenamento_alimento === "") {
      armazenamentoValidacaoCadastrar.classList.remove('hidden');
      fechaModal = false;
    } else
      armazenamentoValidacaoCadastrar.classList.add('hidden');

    if (data_validade_alimento === "") {
      validadeValidacaoCadastrar.classList.remove('hidden');
      fechaModal = false;
    } else
      validadeValidacaoCadastrar.classList.add('hidden');

    if (tipo_alimento === "") {
      validadeTipoAlimentoCadastrar.classList.remove('hidden');
      fechaModal = false;
    } else
      validadeTipoAlimentoCadastrar.classList.add('hidden');

    if (dias_antes === "") {
      validadeDiasAntesCadastrar.classList.remove('hidden');
      fechaModal = false;
    } else
      validadeDiasAntesCadastrar.classList.add('hidden');



    if (fechaModal) {


      let validadeC = "";
      if (data_validade_alimento !== "")
        validadeC = ConverterDataAmericanaParaBrasileira(data_validade_alimento);

      const novo_alimento = {
        Nome: nome_alimento, TipoComidaId: tipo_alimento, LocalArmazenamentoId: armazenamento_alimento, DataVencimento: validadeC, DiasAntes: dias_antes
      };

      const result = await fetchData("https://localhost:5001/comidas", "POST", novo_alimento);

      if (result.success) {
        setShowModalCadastrar(!fechaModal);
        alert(result.message);
        getFoods();
      }
      else {
        alert(result.message);
      }

    }
  }

  const onClickRemover = async (id) => {
    const result = await fetchData("https://localhost:5001/comidas/" + id, "DELETE", null);

    if (result.success) {
      alert(result.message);
      getFoods();
    }
    else {
      alert(result.message);
    }
  };

  const onClickEditar = async (id) => {

    setIdAlimentoEditar(id)
    setShowModalEditar(true);

    const result = await fetchData("https://localhost:5001/comidas/" + id, "GET", null);

    if (result.success) {
      console.log(result.data);
      const alimento = result.data;

      setGridNomeAlimentoEditar(alimento.nome);
      setDiasAntesEditar(alimento.diasAntes);
      setTipoAlimentoEditar(alimento.tipoComida);
      setGridArmazenamentoAlimentoEditar(alimento.localArmazenamento);
      var dataAmer = ConverterDataBrasileiraAmericana2(alimento.dataVencimento);

      setDataValidadeEditar(dataAmer);
    }
    else {
      alert(result.message);
    }

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
      <div className={styles.main}>
        <div className={styles.mainCards}>
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
                          <div className="w-full md:w-2/3 px-2 mt-5">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                              Nome
                            </label>
                            <input required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-nome-alimento-editar" value={gridNomeAlimentoEditar} onChange={(event) => setGridNomeAlimentoEditar(event.target.value)} type="text" placeholder="Melancia" />
                            {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-nome-alimento-editar" value={gridNomeAlimentoEditar} onChange={(event) => setGridNomeAlimentoEditar(event.target.value)} type="text" placeholder="Melancia"/> */}
                            <p className="text-red-500 text-xs hidden italic campoObrigatorioNomeEditar">Campo Obrigatório.</p>
                          </div>
                          <div className="w-full md:w-2/3 px-2 mt-5">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                              Armazenamento
                            </label>
                            {/* todo:criar componente */}
                            <select required label="Select Version" value={gridArmazenamentoAlimentoEditar} onChange={(event) => setGridArmazenamentoAlimentoEditar(event.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-armazenamento-alimento-editar">
                              {localArmazenamento.map((m, i) => <option key={i} value={m.id}>{m.nome}</option>)}
                            </select>
                            <p className="text-red-500 text-xs italic hidden campoObrigatorioArmazenamentoEditar">Campo Obrigatório.</p>
                          </div>
                          <div className="w-full md:w-2/3 px-2 mt-5">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                              Tipo de Comida
                            </label>
                            {/* todo:criar componente */}
                            <select required label="Select Version" value={tipoAlimentoEditar} onChange={(event) => setTipoAlimentoEditar(event.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="ddl-tipo-comida">
                              {tipoAlimentos.map((m, i) => <option key={i} value={m.id}>{m.nome}</option>)}
                            </select>
                            <p className="text-red-500 text-xs italic hidden campoObrigatorioArmazenamentoEditar">Campo Obrigatório.</p>
                          </div>
                          <div className="w-full md:w-2/3 px-2 mt-5">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                              Data Validade
                            </label>
                            {/* todo:criar componente */}
                            <input required value={dataValidadeEditar} onChange={(event) => setDataValidadeEditar(event.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-data-validade-editar" type="date" placeholder="Fruta" />
                            <p className="text-red-500 text-xs italic hidden campoObrigatorioValidadeEditar">Campo Obrigatório.</p>
                          </div>
                          <div className="w-full md:w-2/3 px-2 mt-5">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                              Avisar Dias Antes
                            </label>
                            {/* todo:criar componente */}
                            <input required value={diasAntesEditar} onChange={(event) => setDiasAntesEditar(event.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="txt-dias-antes-editar" type="number" placeholder="" />
                            <p className="text-red-500 text-xs italic hidden campoObrigatorioDiasAntesEditar">Campo Obrigatório.</p>
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
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-nome-alimento" type="text" placeholder="Melancia" />
                            <p className="text-red-500 text-xs italic hidden campoObrigatorioNomeCadastrar">Campo Obrigatório.</p>
                          </div>
                          <div className="w-full md:w-2/3 px-2 mt-5">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                              Armazenamento
                            </label>
                            {/* todo:criar componente */}
                            <select label="Select Version" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-armazenamento-alimento">
                              {localArmazenamento.map((m, i) => <option key={i} value={m.id}>{m.nome}</option>)}
                            </select>
                            <p className="text-red-500 text-xs italic hidden campoObrigatorioArmazenamentoCadastrar">Campo Obrigatório.</p>
                          </div>
                          <div className="w-full md:w-2/3 px-2 mt-5">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                              Tipo de Alimento
                            </label>
                            {/* todo:criar componente */}
                            <select label="Select Version" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-tipo-alimento">
                              {tipoAlimentos.map((m, i) => <option key={i} value={m.id}>{m.nome}</option>)}
                            </select>
                            <p className="text-red-500 text-xs italic hidden campoObrigatorioTipoAlimentoCadastrar">Campo Obrigatório.</p>
                          </div>
                          <div className="w-full md:w-2/3 px-2 mt-5">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                              Data Validade
                            </label>
                            {/* todo:criar componente */}
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-data-validade" type="date" placeholder="Fruta" />
                            <p className="text-red-500 text-xs italic hidden campoObrigatorioValidadeCadastrar">Campo Obrigatório.</p>
                          </div>
                          <div className="w-full md:w-2/3 px-2 mt-5">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                              Avisar Dias Antes
                            </label>
                            {/* todo:criar componente */}
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="txt-dias-antes-cadastrar" type="number" placeholder="" />
                            <p className="text-red-500 text-xs italic hidden campoObrigatorioDiasAntesCadastrar">Campo Obrigatório.</p>
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


          <CardHome>
            <div className={styles.titleDiv}>
              <CardIcon src="/images/icons/food-icons.png" />
              <h2 className={styles.cardTitle}>Alimentos</h2>
            </div>
            <div className={styles.listDiv}>
              <div className={styles.listTable}>
                <div className={styles.listHeader}>
                  <span className={styles.listData}>Alimento</span>
                  <span className={styles.listData}>Data Vencimento</span>
                  <span className={styles.listData}>Tipo de Alimento</span>
                  <span className={styles.listData}>Local de Armazenamento</span>
                  <span className={styles.listData}>Ações</span>
                </div>

                {data.map((m, i) =>
                  <div key={i} className={styles.listRow}>
                    <div>
                      <div className={styles.dataIconDiv}>
                        <div>
                          <img src={m.tipoPath} />
                          <span className={styles.listData}>{m.nome}</span>
                        </div>
                      </div>
                      <span className={styles.listData}>{m.dataVencimento}</span>
                      <div className={styles.dataIconDiv}>
                        <div>
                          <img src={m.tipoPath} />
                          <span className={styles.listData}>{m.tipoComida}</span>
                        </div>
                      </div>
                      <div className={styles.dataIconDiv}>
                        <div>
                          <img src={m.localPath} />
                          <span className={styles.listData}>{m.localArmazenamento}</span>
                        </div>
                      </div>
                      <div className={styles.dataIconDiv}>
                        <div>
                          <div onClick={() => { onClickEditar(m.id) }}>
                            <img title="Editar" src="/images/icons/editar.png" />
                          </div>
                          <div onClick={() => { onClickRemover(m.id) }}><img title="Excluir" src="/images/icons/delete.png" /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
            <button onClick={() => setShowModalCadastrar(true)} className="float-right bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-3 ..." data-modal-target="popup-modal" data-modal-toggle="popup-modal">
              Adicionar Alimento
            </button>
          </CardHome>
        </div>
      </div>
    </Layout>
  )
}