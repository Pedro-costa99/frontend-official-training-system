import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import styles from './styles.module.css';

const ModalEditar = ({valorEdit, statusEdit, showDois, onValueChange, editTreinamentoDetails, loading, handleCloseDois, treinamento }) => {
    return (
        <Modal show={showDois} onHide={handleCloseDois} className={styles.modalTop} centered>
            <Modal.Header closeButton>
                <Modal.Title>EDITAR TREINAMENTO</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={styles.formLabel}>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: Pedro Canabrava"
                            className={styles.formControlEdit}
                            name='nome'
                            value={treinamento.nome || ''}
                            onChange={(e) => onValueChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={styles.formLabel}>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: Trata-se de..."
                            className={styles.formControlEdit}
                            name='descricao'
                            value={treinamento.descricao || ''}
                            onChange={(e) => onValueChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={styles.formLabel}>Educador</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: Carlos Silveira"
                            className={styles.formControlEdit}
                            name='educador'
                            value={treinamento.educador || ''}
                            onChange={(e) => onValueChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={styles.formLabel}>Carga horária</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: 3h"
                            className={styles.formControlEdit}
                            name='ch'
                            value={treinamento.ch || ''}
                            onChange={(e) => onValueChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={styles.formLabel}>Local</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: auditório"
                            className={styles.formControlEdit}
                            name='local'
                            value={treinamento.local || ''}
                            onChange={(e) => onValueChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={styles.formLabel}>Início</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: 14/01/2022"
                            className={styles.formControlEdit}
                            name='inicio'
                            value={treinamento.inicio || ''}
                            onChange={(e) => onValueChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className={styles.formGroup} controlId="formBasicEmail">
                        <Form.Label className={styles.formLabel}>Fim</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: 18/01/2022"
                            className={styles.formControlEdit}
                            name='fim'
                            value={treinamento.fim || ''}
                            onChange={(e) => onValueChange(e)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
                <Button variant="secondary" onClick={handleCloseDois} className={styles.buttonCancelar}>
                    Cancelar
                </Button>
                <Button onClick={() => editTreinamentoDetails()} variant="primary" className={styles.buttonSalvar}>
                    Salvar alterações
                </Button>
            </Modal.Footer>
            {/* {console.log("valorEdit", valorEdit)}
            {console.log("statusEdit", statusEdit)} */}
            {loading === true ? <div className={styles.msgSucesso}>Alterações salvas com sucesso!</div> : null}
            {statusEdit.status === 400 ? <div className={styles.msgErroTrein}>Erro ao alterar os dados</div> : null}

        </Modal>
    );
};

export default ModalEditar;

