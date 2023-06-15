import Link from "next/link"
import LoginCard from "../../components/loginCard/loginCard"
import styles from "../../styles/Login.module.css"

import Input from "../../components/loginCard/input/input"
import Button from "../../components/button/button"

export default function CadastroUsuario() {
    return(
        <div className={styles.background}>
           <LoginCard title="Crie sua conta">
            
           <form className={styles.form}>
                <Input type="text" placeholder="Seu nome" />
                <Input type="email" placeholder="Seu e-mail" />
                <Input type="password" placeholder="Sua senha" />
                <Button>Cadastrar</Button>
                <Link href="/login">Já possui possui uma conta?</Link>
            </form>
            

           </LoginCard>
        </div>
    )
} 