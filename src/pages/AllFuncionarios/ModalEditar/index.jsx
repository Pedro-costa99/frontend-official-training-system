import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./styles.module.css";

function ModalEditar({
  statusEditFunc,
  showDois,
  onValueChange,
  editFuncionarioDetails,
  loading,
  handleCloseDois,
  funcionario,
}) {
  return (
    <Modal
      show={showDois}
      onHide={handleCloseDois}
      className={styles.modalTop}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>EDITAR FUNCIONARIO</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className={styles.formLabel}>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: Nome do funcionario"
              className={styles.formControlEdit}
              name="nome"
              value={funcionario.nome || ""}
              onChange={(e) => onValueChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className={styles.formLabel}>Cargo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: Analista de Sistema"
              className={styles.formControlEdit}
              name="cargo"
              value={funcionario.cargo || ""}
              onChange={(e) => onValueChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className={styles.formLabel}>Setor</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: TI"
              className={styles.formControlEdit}
              name="setor"
              value={funcionario.setor || ""}
              onChange={(e) => onValueChange(e)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      {/* {console.log("loading",loading)}
            {console.log("statusEditFunc.status",statusEditFunc.status)} */}
      <Modal.Footer className={styles.modalFooter}>
        <Button
          variant="secondary"
          onClick={handleCloseDois}
          className={styles.buttonCancelar}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => editFuncionarioDetails()}
          variant="primary"
          className={styles.buttonSalvar}
        >
          Salvar alterações
        </Button>
      </Modal.Footer>
      {loading === true ? (
        <div className={styles.msgSucesso}>Alterações salvas com sucesso!</div>
      ) : null}
      {statusEditFunc.status === 400 ? (
        <div className={styles.msgErroFunc}>Erro ao alterar os dados</div>
      ) : null}
    </Modal>
  );
}

export default ModalEditar;
