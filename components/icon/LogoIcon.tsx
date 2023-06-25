import styles from './navicon.module.css';

export default function LogoIcon({ src }) {
    return (
        <img src={src} className={styles.iconLogo} />
    )
}