import styles from './navicon.module.css';

export default function CardIcon({ src }) {
    return (
        <img src={src} className={styles.iconCard} />
    )
}