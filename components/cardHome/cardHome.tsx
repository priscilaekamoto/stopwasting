import styles from './cardHome.module.css';

export default function HomeCard({ children }) {
    return (
        <div className={styles.card}>
            {children}
        </div>
    )
}