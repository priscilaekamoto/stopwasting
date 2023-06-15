import styles from './loginCard.module.css'

export default function LoginCard({title,children}) {
    return(
        <div className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            {children}
        </div>
    )
}