import React, { useState, useEffect } from 'react';
import { Form, Modal } from 'react-bootstrap';
import ButtonCancelar from '../../../componentes/ButtonCancelar';
import ButtonSalvar from '../../../componentes/ButtonSalvar';
import { getTreinamentos, cadastrarAgendamento, getFuncionarios } from '../../../Service/apiDois';
import styles from './styles.module.css';

const ModalAgendamento = ({setTotalItemsFuncionarios, listaFuncionario, setListaFuncionario, setFuncionario, loading, setLoading, show, setShow}) => {

    const handleClose = () => {
        setStatusCreateAgend({
            status: 200
        })
        setShow(false);

        setTreinamentoId(0);
        setFuncionarioId(0);

    }

    const [treinamentoId, setTreinamentoId] = useState(0);
    const [funcionarioId, setFuncionarioId] = useState(0);
    const [listaTeste, setListaTeste] = useState([]);
    const [statusCreateAgend, setStatusCreateAgend] = useState({
        status: ''
    });
    // const list = [
    //     { id: 1, name: 'select 1' },
    //     { id: 2, name: 'select 2' },
    //     { id: 3, name: 'select 3' },
    //     { id: 4, name: 'select 4' },
    // ];

     //é preciso tratar o erro no axios
     useEffect(() => {

        (async () => {

            await getTreinamentos().then((res) => {
                // Faça aqui o que quiser com a resposta da requisição.
                setListaTeste(res.data.treinamentos);
                // console.log("entrou");

                // setTotalItemsFuncionarios(res.data.treinamentos.length - 1);
                listaFuncionario.reverse();
            })
                .catch((error) => {
                    // Trate o erro aqui.
                    console.log(error)

                    // console.log('Whoops! Houve um erro.', error.message || error)
                    // console.log('Whoops! Houve um erro.', error.status || error)
                    // console.log('Whoops! Teste 3.', error.response.data.erro);
                    // console.log('Whoops! Teste 3.', error.response);
                    // setErro(error.response.data.erro);
                    // setErroTeste(error.response)

                    // localStorage.removeItem("user");
                    // localStorage.removeItem("token");
                    // api.defaults.headers.Authorization = null;
                    // setComments(null);

                    // console.log("Entrou no if de saída 01");
                    // navigate("/login");
                })

            // setLoadingDois(false);

        })();

        // console.log("chamou itens")

    }, [listaFuncionario]);

    const addItemDetails = async () => {

        console.log(funcionarioId, treinamentoId);

        
        try {

        await cadastrarAgendamento(funcionarioId, treinamentoId);
        
        setStatusCreateAgend({
            status: 200
        })

        setFuncionario({

            treinamentoId: '',
            funcionarioId: '',

        })
        setLoading(true);

        await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);

            })

        }

        handleClose();
        getAllFuncionario();
        setLoading(false);
            
        } catch (error) {
            console.log(error)
            setStatusCreateAgend({
                status: 400
            })

            setFuncionario({

                treinamentoId: '',
                funcionarioId: '',
    
            })
            
        }

    }

    const getAllFuncionario = async () => {
        const response = await getFuncionarios();
        setListaFuncionario(response.data.funcionarios.reverse());
        setTotalItemsFuncionarios(response.data.funcionarios.length -1);
    }
    return (
        
        <Modal show={show} onHide={handleClose} className={styles.modalTop} centered>
            <Modal.Header closeButton>
                <Modal.Title>AGENDAR TREINAMENTO</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={styles.formLabel}>Treinamento</Form.Label>
                        <br/>
                        <select value={treinamentoId} onChange={e => setTreinamentoId(e.target.value)} className={styles.formSelect}>
                            {listaTeste.map((item) => (
                                <option className={styles.optionTeste} key={item.id} value={item.id}> {item.nome}</option>
                            ))}
                        </select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={styles.formLabel}>Funcionario</Form.Label>
                        <br/>
                        <select value={funcionarioId} onChange={e => setFuncionarioId(e.target.value)} className={styles.formSelect}>
                            {
                            
                            listaFuncionario.map((treina) => (
                                <option className={styles.optionTeste} key={treina.id} value={treina.id}> {treina.nome}</option>
                            ))}
                        </select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
                <ButtonCancelar handleCloseTres={handleClose} />
                <ButtonSalvar addItemDetails={addItemDetails} />
            </Modal.Footer>
            {loading === true ? <div className={styles.msgSucesso}>Agendamento realizado com sucesso!</div> : null}
            {statusCreateAgend.status === 400 ? <div className={styles.msgErroAgend}>Erro! Já há um treinamento para este 
            funcionário ou dados são inválidos </div> : null}
        </Modal>
    );
};

export default ModalAgendamento;
