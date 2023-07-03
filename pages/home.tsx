import { useState, useEffect } from "react"
import Layout from "components/Layout";
import CardHome from "components/cardHome/cardHome";
import { fetchData, Logado } from "../services/fetch";
import styles from '../styles/Home.module.css';
import CardIcon from "../components/icon/CardIcon";
export default function Home() {
    const openFood = () => {
        window.open("/alimento", "_top");
    }
    const openFoodEdit = (id) => {
        window.open("/alimento?CodAlimento=" + id, "_blank");
    }

    const openAlertaEdit = (id) => {
        window.open("/Alerta?CodAlerta=" + id, "_blank");
    }

    const [navbar, setNavbar] = useState(false);
    const [listaFoods, setListaFoods] = useState([]);
    const [listaAlertas, setListaAlertas] = useState([]);

    const getFoods = async () => {

        const result = await fetchData("https://localhost:5001/comidas", "GET", null);

        if (result.success) {
            setListaFoods(result.data);
        }
    }

    const getAlertas = async () => {

        const result = await fetchData("https://localhost:5001/alertas", "GET", null);

        if (result.success) {
            setListaAlertas(result.data);
        }
    }


    useEffect(() => {
        Logado();
        getFoods();
        getAlertas();
    }, []);
    return (
        <>
            <Layout>
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
                                    </div>

                                    {listaAlertas.map((m, i) =>
                                        <div key={i} className={styles.listRow} onClick={() => { openAlertaEdit(m.id) }}>
                                            <div>
                                                <div className={styles.dataIconDiv}>
                                                    <div>
                                                        <img src={m.pathIcone} />
                                                        <span className={styles.listData}>{m.nomeComida}</span>
                                                    </div>
                                                </div>
                                                <span className={styles.listData}>{m.dataVencimento}</span>
                                                <span className={styles.listData}>{m.status}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardHome>
                        <CardHome >
                            <div className={styles.cardImage} onClick={openFood}>
                                <h2 className={styles.cardHeader}><span>Adicione</span> novos alimentos e obtenha as vantagens de um consumo consciente.</h2>
                            </div>
                        </CardHome>
                    </div >

                    <div className={styles.mainCard}>
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
                                        <span className={styles.listData}>Local Armazenado</span>
                                    </div>

                                    {listaFoods.map((m, i) =>
                                        <div key={i} className={styles.listRow} onClick={() => { openFoodEdit(m.id) }}>
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
                                                        <img src={m.localPath} />
                                                        <span className={styles.listData}>{m.localArmazenamento}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardHome>
                    </div>
                </div>
            </Layout>

        </>
    )
}