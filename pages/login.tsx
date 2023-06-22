import Link from "next/link"
import LoginCard from "../components/loginCard/loginCard"
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

        if(result.status == 200)
        {
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
        
    },[]);

    return (
        
        <div className={styles.background} >
            <LoginCard title="Entre em sua conta">
                <form className={styles.form} onSubmit={handleClick}>
                    <Input type="email" name="email" placeholder="Seu e-mail" />
                    <Input type="password" name="password" placeholder="Sua senha" />
                    <div>{ message }</div>
                    {/* <Button>Entrar</Button> */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Entrar
                    </button>
                    <Link href="/cadastro/usuario">Ainda não possui conta?</Link>
                </form>
            </LoginCard>
        </div>
        
    )
}