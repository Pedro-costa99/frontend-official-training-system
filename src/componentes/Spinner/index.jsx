import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import styles from './styles.module.css'

const IconSpinner = () => {
    return (
        <div className={styles.spinnerContainer}>
            <Spinner animation="border" role="status" variant="warning"  className={styles.spinner}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default IconSpinner
