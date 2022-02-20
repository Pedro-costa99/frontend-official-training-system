import React, {useState }from 'react';
import { Form, Modal } from 'react-bootstrap';
import ButtonCancelar from '../../../componentes/ButtonCancelar';
import ButtonSalvar from '../../../componentes/ButtonSalvar';
import { cadastrarTreinamento, getTreinamentos } from '../../../Service/apiDois';
import styles from './styles.module.css';

const ModalTreinamento = ({ setTreinamento, treinamento, setListaTreinamento, setTotalItems, show, setShow }) => {


    const [loading, setLoading] = useState(false);
    const handleClose = () => {
        setStatusCreateTrein({
            status: 200
        })
        setTreinamento({

            nome: '',
            descricao: '',
            educador: '',
            local: '',
            ch: '',
            inicio: '',
            fim: '',
        })
        setShow(false);

    }
    // const [treinamento, setTreinamento] = useState();

    // const [listaTreinamento, setListaTreinamento] = useState();
    // const [totalItems, setTotalItems] = useState(0);
    const { nome, descricao, educador, local, ch, inicio, fim } = treinamento;
    const [statusCreateTrein, setStatusCreateTrein] = useState({
        status: ''
    });

    const onValueChange = (e) => {
        // console.log(e.target.value);
        setTreinamento({ ...treinamento, [e.target.name]: e.target.value })
        // console.log(user);
    }

    const addItemDetails = async () => {

        // console.log(user);
        // await addUser(user);
        

        try {

        await cadastrarTreinamento(treinamento);
        setLoading(true);
        setTreinamento({

            nome: '',
            descricao: '',
            educador: '',
            local: '',
            ch: '',
            inicio: '',
            fim: '',
        })
        
        setStatusCreateTrein({
            status: 200
        })

        await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);

            })

        }

        handleClose();
        getAllTreinamento();
        setLoading(false);
            
        } catch (error) {
            console.log(error)
            setStatusCreateTrein({
                status: 400
            })
            
        }
        

    }

    const getAllTreinamento = async () => {
        const response = await getTreinamentos();
        setListaTreinamento(response.data.treinamentos.reverse());

        let verificaLista = response.data.treinamentos;

                verificaLista = verificaLista.filter(value =>
                value.id !== 0
                );

                setTotalItems(verificaLista.length);

                // console.log("verificaLista.length", verificaLista.length);
                //setTotalItems(response.data.treinamentos.length);
    }
    return (

        <Modal show={show} onHide={handleClose} className={styles.modalTop} centered>
            <Modal.Header closeButton>
                <Modal.Title>CRIAR TREINAMENTO</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={styles.formLabel}>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: Nome do treinamento"
                            className={styles.formControlAdd}
                            name='nome'
                            value={nome || ''}
                            onChange={(e) => onValueChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={styles.formLabel}>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: Trata-se de..."
                            className={styles.formControlAdd}
                            name='descricao'
                            value={descricao || ''}
                            onChange={(e) => onValueChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={styles.formLabel}>Educador</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: Carlos Silveira"
                            className={styles.formControlAdd}
                            name='educador'
                            value={educador || ''}
                            onChange={(e) => onValueChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={styles.formLabel}>Carga horária</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: 3h"
                            className={styles.formControlAdd}
                            name='ch'
                            value={ch || ''}
                            onChange={(e) => onValueChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={styles.formLabel}>Local</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: auditório"
                            className={styles.formControlAdd}
                            name='local'
                            value={local || ''}
                            onChange={(e) => onValueChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className={styles.formLabel}>Início</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: 14/01/2022"
                            className={styles.formControlAdd}
                            name='inicio'
                            value={inicio || ''}
                            onChange={(e) => onValueChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className={styles.formGroup} controlId="formBasicEmail">
                        <Form.Label className={styles.formLabel}>Fim</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: 18/01/2022"
                            className={styles.formControlAdd}
                            name='fim'
                            value={fim || ''}
                            onChange={(e) => onValueChange(e)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            {/* {console.log(loading)}
            {console.log(statusCreateTrein)} */}
            <Modal.Footer className={styles.modalFooter}>
                <ButtonCancelar handleCloseTres={handleClose} />
                <ButtonSalvar addItemDetails={addItemDetails} />
            </Modal.Footer>
            {loading === true ? <div className={styles.msgSucesso}>Treinamento salvo com sucesso!</div> : null}
            {statusCreateTrein.status === 400 ? <div className={styles.msgErroCreateTrein}>Erro ao cadastrar o Treinamento</div> : null}
        </Modal>




    );
};

export default ModalTreinamento;
