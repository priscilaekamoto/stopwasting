import { useState, useEffect, useRef } from "react"
import Layout from "components/Layout";
import CardHome from "components/cardHome/cardHome";
import { fetchData, Logado } from "../services/fetch";
import styles from '../styles/Alerta.module.css';
import CardIcon from "../components/icon/CardIcon";
import { useRouter } from "next/router";
export default function Alerta() {
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [statusNotificacao, setStatusNotificacao] = useState("");
    const [novaData, setNovaData] = useState("");
    const [listaAlertas, setListaAlertas] = useState([]);
    const [idAlerta, setIdAlerta] = useState(0);

    const [navbar, setNavbar] = useState(false);

    const router = useRouter();
    const callbackExecutedRef = useRef(false);

    useEffect(() => {
        if (router.query.CodAlerta && !callbackExecutedRef.current) {
            onClickEditar(router.query.CodAlerta);

            const { myQueryParam, ...queryWithoutParam } = router.query;
            router.replace({ query: queryWithoutParam });
            callbackExecutedRef.current = true;
        }
    }, [router.query]);

    useEffect(() => {
        Logado();
        getAlertas();
    }, []);

    const getAlertas = async () => {

        const result = await fetchData("https://localhost:5001/alertas", "GET", null);

        if (result.success) {
            setListaAlertas(result.data);
        }
    }

    const onClickEditar = (id) => {
        setIdAlerta(id);
        setShowModalEditar(true);
    }

    const atualizarAlerta = async (e) => {
        e.preventDefault();
        const novoStatusValidar = document.querySelector('.campoObrigatorioStatus');
        const novaDataValidar = document.querySelector('.campoObrigatorioNovaData');
        const novoStatus = document.getElementById("ddlNovoStatus").value;
        var fechaModal = true;

        if (novoStatus === "") {
            novoStatusValidar.classList.remove('hidden');
            fechaModal = false;

        } else {
            if (novoStatus === "3") {
                const novaData = document.getElementById("nova-data-alerta").value;
                const novaDataValidar = document.querySelector('.campoObrigatorioNovaData');
                if (novaData === "") {
                    novaDataValidar.classList.remove('hidden');
                    fechaModal = false;

                } else
                    novaDataValidar.classList.add('hidden');
            }
            else {

            }
            novoStatusValidar.classList.add('hidden');
        }

        if (fechaModal) {
            const novaData = document.getElementById("nova-data-alerta");
            const alerta = {
                Status: parseInt(novoStatus),
                NovaData: novaData == null ? "" : novaData.value
            }

            const result = await fetchData("https://localhost:5001/alertas/" + idAlerta, "POST", alerta);

            if (result.success) {
                setShowModalEditar(!fechaModal);
                getAlertas();
                alert(result.message);
            }
            else {
                alert(result.message);
            }
        }
    }


    return (
        <>
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
                                            Editar Alerta
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
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                        Novo Status
                                                    </label>
                                                    {/* todo:criar componente */}
                                                    <select required label="Select Version" value={statusNotificacao} onChange={(event) => setStatusNotificacao(event.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="ddlNovoStatus">
                                                        <option value="1">Concluído</option>
                                                        <option value="2">Ignorado</option>
                                                        <option value="3">Prorrogado</option>
                                                    </select>
                                                    <p className="text-red-500 text-xs italic hidden campoObrigatorioStatus">Campo Obrigatório.</p>
                                                </div>
                                                {statusNotificacao === "3" ? (<div className="w-full md:w-2/3 px-2 mt-5">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                        Data Validade
                                                    </label>
                                                    <input required value={novaData} onChange={(event) => setNovaData(event.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="nova-data-alerta" type="date" />
                                                    <p className="text-red-500 text-xs italic hidden campoObrigatorioNovaData">Campo Obrigatório.</p>
                                                </div>) : null}
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
                                            onClick={atualizarAlerta}
                                        >
                                            Atualizar Alerta
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}

                <div className={styles.main}>

                    <div className={styles.mainCards}>
                        <CardHome>
                            <div className={styles.titleDiv}>
                                <CardIcon src="/images/icons/alert-icon.png" />
                                <h2 className={styles.cardTitle}>Alertas</h2>
                            </div>
                            <div className={styles.listDiv}>
                                <div className={styles.listTable}>
                                    <div className={styles.listHeader}>
                                        <span className={styles.listData}>Alimento</span>
                                        <span className={styles.listData}>Data Vencimento</span>
                                        <span className={styles.listData}>Status</span>
                                        <span className={styles.listData}>Ação</span>
                                    </div>

                                    {listaAlertas.map((m, i) =>
                                        <div key={i} className={styles.listRow}>
                                            <div>
                                                <div className={styles.dataIconDiv}>
                                                    <div>
                                                        <img src={m.pathIcone} />
                                                        <span className={styles.listData}>{m.nomeComida}</span>
                                                    </div>
                                                </div>
                                                <span className={styles.listData}>{m.dataVencimento}</span>
                                                <span className={styles.listData}>{m.status}</span>
                                                <div className={styles.dataIconDiv}>
                                                    <div>
                                                        <div onClick={() => { onClickEditar(m.id) }}>
                                                            <img title="Alterar Status" src="/images/icons/atualizar.png" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button onClick={() => setShowModalEditar(true)} className="float-right bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-3 ..." data-modal-target="popup-modal" data-modal-toggle="popup-modal">
                                Adicionar Alimento
                            </button>
                        </CardHome>
                    </div >
                </div>
            </Layout>

        </>
    )
}