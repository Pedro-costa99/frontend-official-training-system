import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import cx from "classnames";
import styles from "./styles.module.css";
import Header from "../Header";
import { getFuncionarioById, agendamentoById } from "../../Service/apiDois";

function EmployeeTraining() {
  const [treinamentoFuncionario, setTreinamentoFuncionario] = useState([]);
  const [totalTreinamentos, setTotalTreinamentos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const loadUserData = async () => {
      const response = await getFuncionarioById(id);
      setTreinamentoFuncionario(response.data.funcionario);

      // console.log(response.data.funcionario);
    };
    loadUserData();
  }, [id]);

  useEffect(() => {
    const loadTreinamentoData = async () => {
      // const idLoad = id;
      // setFuncionarioID(idLoad);

      const response = await agendamentoById(id);
      // console.log(response.data.totalTreinamentos);
      setTotalTreinamentos(response.data.totalTreinamentos);
      // console.log(totalTreinamentos)
    };

    loadTreinamentoData();
  }, [id]);

  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
    // navigate('/funcionarios');
  }

  return (
    <>
      <Header />
      <div className={styles.mb}>
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleClick()}
          className={styles.buttonVoltar}
        >
          Voltar
        </Button>
      </div>
      <main>
        <Container className={styles.container1}>
          <h1>{treinamentoFuncionario.nome}</h1>
          <Row>
            <Col>
              <div>Matrícula</div>
              <div>{treinamentoFuncionario.id}</div>
            </Col>
            <Col>
              <div>Função</div>
              <div>{treinamentoFuncionario.cargo}</div>
            </Col>
            <Col>
              <div>Setor</div>
              <div>{treinamentoFuncionario.setor}</div>
            </Col>
          </Row>
        </Container>
        <Container className={cx(styles.container2, "table-responsive")}>
          <h2 className={styles.h2}>Treinamentos agendados</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Educador</th>
              </tr>
            </thead>
            <tbody>
              {totalTreinamentos.map((value) => (
                <tr key={value.id}>
                  <td>1</td>
                  <td>{value.nome}</td>
                  <td>{value.descricao}</td>
                  <td>{value.educador}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {totalTreinamentos.length === 0 ? (
            <div className={styles.spanTrein}>Não há treinamento</div>
          ) : null}
        </Container>
      </main>
    </>
  );
}

export default EmployeeTraining;
