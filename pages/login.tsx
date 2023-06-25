import Link from "next/link"
import LoginCard from "../components/loginCard/loginCard"
import LoginImage from "../components/loginCard/loginImage";
import styles from "../styles/Login.module.css"
import Input from '../components/loginCard/input/input'
import { fetchData, CheckLogin } from "../services/fetch"
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useAuth } from "components/AuthContext";
import { redirect } from 'next/navigation'

export default function Login() {

    const router = useRouter();
    const [message, setMessage] = useState([]);

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(e);
        const user = {
            Email: e.target.elements.email.value,
            Senha: e.target.elements.password.value
        };

        const result = await fetchData("https://localhost:5001/login", "POST", user);

        if (result.success) {
            localStorage.setItem("token", result.data);
            window.open("/home", "_top");
        }
        else {
            setMessage(result.message);
        }
    }

    useEffect(() => {
        //CheckLogin();
    }, []);

    return (

        <div className={styles.background} >
            <LoginCard>
                <form className={styles.form} onSubmit={handleClick}>
                    <h2 className={styles.titleCard}>Bem-vindo novamente!</h2>
                    <span className={styles.subtitleCard}>Entre em sua conta.</span>
                    <Input type="text" name="email" label="E-mail:" />
                    <Input type="password" name="password" label="Senha:" />
                    <div>
                        {message.map((m, i) => <div className={styles.msgError} key={i}>{m}</div>)}
                    </div>
                    {/* <Button>Entrar</Button> */}
                    <div className={styles.buttonRow}>
                        <button type="submit" className={styles.buttonPrimary}>Entrar</button>
                    </div>
                    <div className={styles.downBarLogin}>
                        <div className={styles.divbar}></div>
                        <span>ou</span>
                        <div className={styles.divbar}></div>
                    </div>
                    <div className={styles.textCentered}>
                        <span>Não possui conta?</span> <Link className={styles.link} href="/cadastro/usuario">Cadastre-se</Link>
                    </div>
                </form>
            </LoginCard>
            <LoginImage src="/images/login-imagem.jpg" />
        </div>

    )
}