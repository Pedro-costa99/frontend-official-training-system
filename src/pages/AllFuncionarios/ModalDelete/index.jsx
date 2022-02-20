import React from 'react';
import { Modal } from 'react-bootstrap';
import ButtonCancelar from '../../../componentes/ButtonCancelar';
import ButtonSimConfirmacao from '../../../componentes/ButtonSimConfirmacao';
import styles from './styles.module.css'

const ModalDelete = ({statusDelFunc, showTres, handleCloseTres, loading, deleteItemConfirmacao }) => {
    return (
        <Modal className={styles.modalFontSize} show={showTres} onHide={handleCloseTres} animation={false} centered>
            <Modal.Header closeButton >
                <Modal.Title className={styles.modalFontSize}>Excluir</Modal.Title>
            </Modal.Header>
            <Modal.Body>Deseja excluir o funcionário permanentemente?</Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
                <ButtonCancelar handleCloseTres={handleCloseTres} />
                <ButtonSimConfirmacao deleteItemConfirmacao={deleteItemConfirmacao} />
            </Modal.Footer>
            {loading === true ? <div className={styles.msgSucesso}>Funcionario excluído com sucesso!</div> : null}
            {statusDelFunc.status === 400 ? <div className={styles.msgErroDelTrein}>Erro ao excluir o Funcionario</div> : null}
        </Modal>
    );
};

export default ModalDelete;
