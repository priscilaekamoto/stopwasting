import styles from './loginImage.module.css';

export default function LoginImage({ src }) {
    return (
        <div className={styles.loginimage}>
            <img src={src} />
        </div>
    )
}