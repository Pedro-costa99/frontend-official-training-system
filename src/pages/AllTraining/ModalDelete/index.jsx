import React from 'react';
import { Modal } from 'react-bootstrap';
import ButtonCancelar from '../../../componentes/ButtonCancelar';
import ButtonSimConfirmacao from '../../../componentes/ButtonSimConfirmacao';
import styles from './styles.module.css'

const ModalDelete = ({statusDelTrein, showTres, handleCloseTres, loading, deleteItemConfirmacao }) => {
    return (
        <Modal className={styles.modalFontSize} show={showTres} onHide={handleCloseTres} animation={false} centered>
            <Modal.Header closeButton >
                <Modal.Title className={styles.modalFontSize}>Excluir</Modal.Title>
            </Modal.Header>
            <Modal.Body>Deseja excluir o treinamento permanentemente?</Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
                <ButtonCancelar handleCloseTres={handleCloseTres} />
                <ButtonSimConfirmacao deleteItemConfirmacao={deleteItemConfirmacao} />
            </Modal.Footer>
            {/* {console.log("loading", loading)}
            {console.log("statusDelTrein.status", statusDelTrein.status)} */}
            {loading === true ? <div className={styles.msgSucesso}>Treinamento excluído com sucesso!</div> : null}
            {statusDelTrein.status === 400 ? <div className={styles.msgErroDelTrein}>Erro ao excluir o Treinamento</div> : null}
        </Modal>
    );
};

export default ModalDelete;
