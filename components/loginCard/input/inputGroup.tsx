import styles from './input.module.css'

export default function InputGroup({ type, label, name }) {
    return (
        <div className={styles.inputgroup}>
            <label>{label}</label>
            <input type={type} name={name} />
        </div>
    )
}