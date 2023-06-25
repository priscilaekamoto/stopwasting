import styles from './navicon.module.css';

export default function NavIcon({ src }) {
    return (
        <img src={src} className={styles.icon} />
    )
}