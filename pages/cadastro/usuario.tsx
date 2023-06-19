import Link from "next/link"
import LoginCard from "../../components/loginCard/loginCard"
import styles from "../../styles/Login.module.css"
import Input from "../../components/loginCard/input/input"
import { useRouter } from 'next/router';

export default function CadastroUsuario() {

    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        router.push('/');
    }

    return(
        <div className={styles.background}>
           <LoginCard title="Crie sua conta">
                <form className={styles.form} onSubmit={handleClick}>
                    <Input type="text" placeholder="Seu nome" />
                    <Input type="email" placeholder="Seu e-mail" />
                    <Input type="password" placeholder="Sua senha" />
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Cadastrar
                    </button>                
                </form>
           </LoginCard>
        </div>
    )
} 