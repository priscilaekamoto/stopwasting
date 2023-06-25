import Link from "next/link"
import LoginCard from "../../components/loginCard/loginCard"
import styles from "../../styles/Login.module.css"
import Input from "../../components/loginCard/input/input"
import { useRouter } from 'next/router';
import LoginImage from "../../components/loginCard/loginImage";
import React, { useState, useEffect } from 'react';
import { fetchData } from "../../services/fetch";

export default function CadastroUsuario() {

    const router = useRouter();
    const [message, setMessage] = useState([]);

    const handleClick = async (e) => {
        e.preventDefault();

        const user = {
            Email: e.target.elements.email.value,
            Senha: e.target.elements.password.value,
            Nome: e.target.elements.nome.value
        };

        const result = await fetchData("https://localhost:5001/register", "POST", user);

        if (result.success) {
            localStorage.setItem("token", result.data);
        }
        else {
            setMessage(result.message);
        }
    }

    return (
        <div className={styles.background}>
            <LoginCard>
                <form className={styles.form} onSubmit={handleClick}>
                    <h2 className={styles.titleCard}>Bem-vindo!</h2>
                    <span className={styles.subtitleCard}>Crie sua conta e obtenha as vantagens do consumo consciente.</span>
                    <Input type="text" name="nome" label="Nome:" />
                    <Input type="email" name="email" label="E-mail:" />
                    <Input type="password" name="password" label="Senha:" />
                    <div>
                        {message.map((m, i) => <div className={styles.msgError} key={i}>{m}</div>)}
                    </div>
                    <div className={styles.buttonRow}>
                        <button type="submit" className={styles.buttonPrimary}>Cadastrar</button>
                    </div>
                </form>
            </LoginCard>
            <LoginImage src="/images/register-imagem.jpg" />
        </div>
    )
} 