import Link from "next/link"
import LoginCard from "../components/loginCard/loginCard"
import LoginImage from "../components/loginCard/loginImage";
import styles from "../styles/Login.module.css"
import Input from '../components/loginCard/input/input'
import { logar } from "../services/user"
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useAuth } from "components/AuthContext"

export default function Login() {

    const { authToken, login, logout } = useAuth();
    const router = useRouter();
    const [message, setMessage] = useState("");

    const handleClick = (e) => {
        e.preventDefault();

        console.log(e.target.elements.email.value) // from elements property
        console.log(e.target.password.value)

        const user = {
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        };

        const result = logar(user);

        if (result.status == 200) {
            var token = result;
            login(token);

            router.push('/home');
            setMessage("")
        }
        else
            setMessage(result.message)

        console.log(result);
    }

    useEffect(() => {

    }, []);

    return (

        <div className={styles.background} >
            <LoginCard>
                <form className={styles.form} onSubmit={handleClick}>
                    <h2 className={styles.titleCard}>Bem-vindo!</h2>
                    <span className={styles.subtitleCard}>Entre em sua conta.</span>
                    <Input type="email" name="email" label="E-mail:" />
                    <Input type="password" name="password" label="Senha:" />
                    <div>{message}</div>
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
            <LoginImage>
            </LoginImage>
        </div>

    )
}