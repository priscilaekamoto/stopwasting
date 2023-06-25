import styles from './buttons.module.css'

export default function ButtonPrimary({ children, ...props }) {
    return (
        <button className={styles.buttonPrimary} {...props}>{children}</button>
    )
}