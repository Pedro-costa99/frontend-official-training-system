import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import ButtonCancelar from "../../../componentes/ButtonCancelar";
import ButtonSalvar from "../../../componentes/ButtonSalvar";
import {
  cadastrarTreinamento,
  getTreinamentos,
} from "../../../Service/apiDois";
import styles from "./styles.module.css";
import { validationSchema } from "./ModalTreinamento.validation";

function ModalTreinamento({
  setTreinamento,
  treinamento,
  setListaTreinamento,
  setTotalItems,
  show,
  setShow,
}) {
  const [statusCreateTrein, setStatusCreateTrein] = useState({
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setStatusCreateTrein({
      status: 200,
    });
    setTreinamento({
      nome: "",
      descricao: "",
      educador: "",
      local: "",
      ch: "",
      inicio: "",
      fim: "",
    });
    setShow(false);
  };
  // const [treinamento, setTreinamento] = useState();

  // const [listaTreinamento, setListaTreinamento] = useState();
  // const [totalItems, setTotalItems] = useState(0);

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  const getAllTreinamento = async () => {
    const response = await getTreinamentos();
    setListaTreinamento(response.data.treinamentos.reverse());

    let verificaLista = response.data.treinamentos;

    verificaLista = verificaLista.filter((value) => value.id !== 0);

    setTotalItems(verificaLista.length);

    // console.log("verificaLista.length", verificaLista.length);
    // setTotalItems(response.data.treinamentos.length);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await cadastrarTreinamento(values);
      setSubmitting(false);
      setLoading(true);
      setTreinamento({
        nome: "",
        descricao: "",
        educador: "",
        local: "",
        ch: "",
        inicio: "",
        fim: "",
      });

      setStatusCreateTrein({
        status: 200,
      });

      await sleep(3000);

      handleClose();
      getAllTreinamento();
      setLoading(false);
    } catch (error) {
      setSubmitting(false);
      // eslint-disable-next-line no-console
      console.log(error);
      setStatusCreateTrein({
        status: 400,
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className={styles.modalTop}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>CRIAR TREINAMENTO</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ ...treinamento }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            // eslint-disable-next-line no-shadow
            handleSubmit,
            // isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={styles.formLabel}>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: Nome do treinamento"
                  name="nome"
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="nome"
                  component="div"
                  className="error-message"
                  style={{ color: "red" }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={styles.formLabel}>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: Trata-se de..."
                  className={styles.formControlAdd}
                  name="descricao"
                  value={values.descricao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="descricao"
                  component="div"
                  className="error-message"
                  style={{ color: "red" }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={styles.formLabel}>Educador</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: Carlos Silveira"
                  className={styles.formControlAdd}
                  name="educador"
                  value={values.educador}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="educador"
                  component="div"
                  className="error-message"
                  style={{ color: "red" }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={styles.formLabel}>
                  Carga horária
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: 3h"
                  className={styles.formControlAdd}
                  name="ch"
                  value={values.ch}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="ch"
                  component="div"
                  className="error-message"
                  style={{ color: "red" }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={styles.formLabel}>Local</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: auditório"
                  className={styles.formControlAdd}
                  name="local"
                  value={values.local}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="local"
                  component="div"
                  className="error-message"
                  style={{ color: "red" }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={styles.formLabel}>Início</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: 14/01/2022"
                  className={styles.formControlAdd}
                  name="inicio"
                  value={values.inicio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="inicio"
                  component="div"
                  className="error-message"
                  style={{ color: "red" }}
                />
              </Form.Group>
              <Form.Group
                className={styles.formGroup}
                controlId="formBasicEmail"
              >
                <Form.Label className={styles.formLabel}>Fim</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: 18/01/2022"
                  className={styles.formControlAdd}
                  name="fim"
                  value={values.fim}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="fim"
                  component="div"
                  className="error-message"
                  style={{ color: "red" }}
                />
              </Form.Group>
              <Modal.Footer className={styles.modalFooter}>
                <ButtonCancelar handleCloseTres={handleClose} />
                <ButtonSalvar />
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      {/* {console.log(loading)}
            {console.log(statusCreateTrein)} */}
      {loading === true ? (
        <div className={styles.msgSucesso}>Treinamento salvo com sucesso!</div>
      ) : null}
      {statusCreateTrein.status === 400 ? (
        <div className={styles.msgErroCreateTrein}>
          Erro ao cadastrar o Treinamento
        </div>
      ) : null}
    </Modal>
  );
}

export default ModalTreinamento;
