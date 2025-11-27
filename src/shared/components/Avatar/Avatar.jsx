import styles from "./Avatar.module.css"

const Avatar= ({ src, alt="User avatar", size="md"}) => {
    const sizeClass = styles[`avatar--${size}`] || styles["avatar--md"];

    return (
        <div className={`${styles.avatar} ${sizeClass}`}>
            <img src={src} alt={alt} className={styles.image} />
        </div>
    )
}

export default Avatar;