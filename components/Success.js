import Link from 'next/link'
import styles from '../styles/Success.module.css'

function Success() {
    return (
        <div className={styles.successPage}>
            <h1>Zakup udany.</h1>
            <Link href='/'><div className={styles.backBtn}>
                <h1>Powrót</h1>
            </div></Link>
        </div>
    )
}

export default Success
