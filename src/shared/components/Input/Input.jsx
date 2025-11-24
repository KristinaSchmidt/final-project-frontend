import styles from "./Input.module.css"

const Input = ({label, type="text", name, value, error,  onChange, placeholder}) => {
    return (
        <div className={styles.input}>
            {label && <label htmlFor={name}>{label}</label>}
            <input>
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={error ? styles.errorInput : ""}
            </input>
            <Error message={error} />
        </div>
    );
};

export default Input;