import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './styles.module.css'


const ButtonSalvar = ({ addItemDetails, isDisabled  }) => {
    return (
        <Button onClick={() => addItemDetails()} variant="primary" className={styles.buttonSalvar} disabled={isDisabled}>
            Salvar
        </Button>
    )
};

export default ButtonSalvar;
