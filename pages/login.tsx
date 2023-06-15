import Link from "next/link"
import LoginCard from "../components/loginCard/loginCard"
import styles from "../styles/Login.module.css"
import Input from '../components/loginCard/input/input'
import Button from "../components/button/button"
import { login } from "../services/user"
import { useRouter } from 'next/router';
import React, { useState } from 'react';


export default function Login() {

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

        const result = login(user);

        if(result.status == 200)
        {
            router.push('/home');
            setMessage("")
        }
        else
            setMessage(result.message)

        console.log(result);
    }

    return (
        
        <div className={styles.background} >
            <LoginCard title="Entre em sua conta">
                <form className={styles.form} onSubmit={handleClick}>
                    <Input type="email" name="email" placeholder="Seu e-mail" />
                    <Input type="password" name="password" placeholder="Sua senha" />
                    <div>{ message }</div>
                    <Button>Entrar</Button>
                    <Link href="/cadastro/usuario">Ainda não possui conta?</Link>
                </form>
            </LoginCard>
        </div>
        
    )
}