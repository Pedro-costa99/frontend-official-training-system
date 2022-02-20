import React from 'react';
import styles from './styles.module.css'

function NotFound() {
    return (
        <>
            <div className={styles.messageBox}>
                <h1>Erro 404: Página não encontrada </h1>

                <div>
                    <a href="http://localhost:3000" className={styles.linkParaHome}>Voltar para o Home</a>
                </div>
            </div>

        </>
    );
}

export default NotFound;

