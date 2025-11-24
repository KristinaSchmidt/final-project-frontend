import styles from "./Error.module.css";

const Error =({message}) => {
    if(!message) return null;
    return (
       <p className={styles.error}>{message}</p> 
    )
};

export default Error; 