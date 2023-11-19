/* eslint-disable no-console */
import React, { useState, useContext, useEffect } from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import cx from "classnames";
import Banner from "../../assets/images/logo-sistema-sem-fundo.png";
import styles from "./styles.module.css";

import { AuthContext } from "../../contexts/auth";
import { api, getUsuario } from "../../Service/apiDois";
import IconSpinner from "../../componentes/Spinner";

const initialValuesTres = {
  erro: false,
  id_usuario_logado: "",
  mensagem: "",
  req_tokenExp: "",
  user: {
    id: "",
    name: "usuario",
  },
};

function Header() {
  const [usuario, setUsuario] = useState(initialValuesTres);
  // const [erroDois, setErroDois] = useState(false);
  const [loading, setLoading] = useState(false); // item atualizado
  const [statusHeader, setStatusHeader] = useState({
    status: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await getUsuario()
        .then((res) => {
          // Faça aqui o que quiser com a resposta da requisição.
          setUsuario(res.data);
          // console.log(res);
        })
        .catch((error) => {
          // Trate o erro aqui.
          // console.log('Whoops! Houve um erro.', error.message || error)
          // console.log('Whoops! Houve um erro.', error.status || error)
          // console.log('Whoops! Houve um erro.', error.response.data.erro);
          console.log(error);
          setStatusHeader({
            status: 400,
          });
          // setErroDois(error.response.data.erro);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          api.defaults.headers.Authorization = null;
          setUsuario(null);
          // console.log("Entrou no if de saída 02");
          navigate("/login");
        });

      setLoading(false);
    })();
  }, []);

  const verificaToken = () => {
    if (statusHeader.status === 400) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      api.defaults.headers.Authorization = null;

      // setUsers(null);

      // console.log("Entrou no if de saída");
      navigate("/login");
    }
  };

  useEffect(() => {
    verificaToken();

    return () => {
      setStatusHeader({
        status: 200,
      });
    };
  }, []);

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <IconSpinner />;
  }
  return (
    <header>
      <Nav defaultActiveKey="/home" as="ul" className={cx(styles.nav, "row")}>
        <Nav.Item as="li" className={cx(styles.navItemLeft, "col-12 col-sm-6")}>
          <Link className={styles.navLinkLogo} to="/">
            <img src={Banner} height="80px" width="auto" alt="" />
          </Link>
        </Nav.Item>
        <Nav.Item
          as="li"
          className={cx(styles.navItemRight, "col-12 col-sm-6")}
        >
          {statusHeader.status === 400 ? "" : <h1>Olá, {usuario.user.name}</h1>}
          <Dropdown id="dropdown">
            <Dropdown.Toggle
              id="dropdown-basic"
              className={styles.dropdownBasic}
            >
              <FaUserCircle />
            </Dropdown.Toggle>
            <Dropdown.Menu id="dropdown-menu" className={styles.dropdownMenu}>
              <Dropdown.Item className={styles.navLinkSair}>
                Configurações
              </Dropdown.Item>
              <Dropdown.Item
                className={styles.navLinkSair}
                onClick={handleLogout}
              >
                Sair
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
      </Nav>
      <Navbar bg="light" expand="lg" className={styles.navbarItens}>
        <Container>
          <Navbar.Brand />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={styles.meAuto}>
              <Link className={styles.navLink} to="/treinamentos">
                Treinamentos
              </Link>
              <Link className={styles.navLink} to="/funcionarios">
                Funcionários
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
