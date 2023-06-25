import styles from './input.module.css';
import InputGroup from './inputGroup';

export default function Input({ type, label, name }) {
    return (
        <InputGroup label={label} type={type} name={name} />
    )
}