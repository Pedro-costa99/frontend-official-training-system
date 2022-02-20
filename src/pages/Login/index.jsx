import React, { useState, useContext, useEffect } from 'react'
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import styles from './styles.module.css';
import { FaUserAlt, FaKey } from 'react-icons/fa';
import Logo from './../../assets/images/logo-sistema-com-fundo.png'
import cx from 'classnames'


import { AuthContext } from '../../contexts/auth';

const Login = () => {

    const { authenticated, login, entrou, status} = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        // console.log("Submit", {email, password});
        login(email, password); //integração com o meu contexto / api
    }

    useEffect(() =>{

    }, [authenticated]);

    return (
        
                <>
                <main className={styles.main}>
                    <section className={styles.sectionImgLogo}>
                        <div className={styles.imageSistema}>
                            <img src={Logo} height="124px" width="200px" alt="Logo Sistema Treinamento" />
                        </div>
                    </section>
                    <section className={styles.sectionForm}>
                        <div className={styles.containerTitleFormTop}>
                            <h2 className={styles.titleFormTop}>Faça login na sua conta</h2>
                        </div>
                        <Form className={styles.form} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className={styles.formLabel}>Email</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1" className={styles.basicAddon1}>
                                        <FaUserAlt className={styles.icon} />
                                    </InputGroup.Text>
                                    <FormControl
                                        placeholder="Email"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        className={styles.inputLogin}   
                                        type='email'
                                        name='email'                                         
                                        value={email}      
                                        onChange={ (e) => setEmail(e.target.value)}                             
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className={styles.formLabel}>Senha</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1" className={styles.basicAddon1}>
                                        <FaKey className={styles.icon} />
                                    </InputGroup.Text>
                                    <FormControl
                                        placeholder="Senha"
                                        aria-label="Password"
                                        aria-describedby="basic-addon1"
                                        className={styles.inputLogin}
                                        type='password'
                                        name='password'                                         
                                        value={password}      
                                        onChange={ (e) => setPassword(e.target.value)}  
                                    />
                                </InputGroup>
                            </Form.Group>
                            <div className={styles.containerButtonLogin}>
                                <div className="d-grid gap-2 col-12 mx-auto container-button-login">
                                    <Button variant="primary" type="submit" className={styles.button}>
                                        Entrar
                                    </Button>
                                </div>
                            </div>
                           
                        </Form>
                        {entrou && status === 400 ? <div className={styles.msgErro}>Erro ao acessar. Verifique seus dados.</div> : null}
                        <div className={cx(styles.containerFooterForm, 'row')}>
                            <div href="#teste" className={cx(styles.titleFooterForm, styles['text-centraliza'], 'col-12 col-sm-6 text-centraliza')}>
                                Usuário novo?
                            </div>
                            <a className={cx(styles.linkNewToSystem, styles['text-centraliza'], 'col-12 col-sm-6')}>Inscrever-se</a>

                        </div>
                    </section>
                    <div className={styles.containerForgotPassword}>
                        <a href="#teste" className={styles.forgotPassword}>
                            <span className={`${styles.span} ${styles.forgotYourPassword}`}>Esqueceu sua senha?</span>
                        </a>
                    </div>
                </main>
                <footer className={styles.footer}>
                    <ul className={styles.ul}>
                        <Row className={cx(styles.rowSalesforce)}>
                            <Col>
                                <li className={styles.navItem}>
                                    <a className={`${styles.navLink} ${styles.navTextWhite}`} href="https://treinamentos-frontend-pedro.herokuapp.com/">&copy; 2022 https://treinamentos-frontend-pedro.herokuapp.com/</a>
                                </li>
                            </Col>
                        </Row>
                    </ul>
                </footer>
                </>
         
        
    )
}

export default Login
