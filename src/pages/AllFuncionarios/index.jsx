import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import React, { useState, useEffect, useMemo} from 'react'
import { useNavigate } from "react-router-dom";
import styles from './styles.module.css';
import { Col, Row } from 'react-bootstrap';
import { editFuncionario, deleteFuncionario } from '../../Service/api';
import Header from '../Header';
import SearchNovo from '../../componentes/SearchNovo';
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { getFuncionarios } from '../../Service/apiDois';
import { api, getFuncionarioById } from '../../Service/apiDois';
import IconSpinner from '../../componentes/Spinner';
import ModalAgendamento from './ModalAgendamento';
import ModalDelete from './ModalDelete';
import ModalEditar from './ModalEditar';
import { IoListCircleOutline } from "react-icons/io5";



// eslint-disable-next-line 
const initialValues = {


    nome: 'pedro',
    cargo: '',
    setor: ''

}

// const initialValuesTres = [


//     {
//         id: 1,
//         nome: "",
//         descricao: "",
//         educador: "",
//         inicio: "",
//         fim: "",
//         ch: "",
//         local: ""
//     },
//     {
//         id: 2,
//         nome: "",
//         descricao: "",
//         educador: "",
//         inicio: "",
//         fim: "",
//         ch: "",
//         local: ""
//     },
//     {
//         id: 3,
//         nome: "",
//         descricao: "",
//         educador: "",
//         inicio: "",
//         fim: "",
//         ch: "",
//         local: ""
//     },


// ]


const AllTraining = (props) => {
    const [search, setSearch] = useState("");//valor pesquisado
    const [loading, setLoading] = useState(false);//item atualizado
    const [loadingDois, setLoadingDois] = useState(true);//item retornado
    const [funcionario, setFuncionario] = useState(initialValues);

    // const { nome, cargo, setor } = funcionario;

    const [listaFuncionario, setListaFuncionario] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);//página atual, 1, 2, 3...

    // const [itensPerPage, setItensPerPage] = useState(2);
    //itens que aparecem na página

    const [show, setShow] = useState(false);
    const [showDois, setShowDois] = useState(false);
    const [showTres, setShowTres] = useState(false);

    const [totalItemsFuncionarios, setTotalItemsFuncionarios] = useState(0);

    const [valorId, setValorId] = useState(0);//valor pesquisado

    const [valorIdDois, setValorIdDois] = useState(0);//valor pesquisado

    const navigate = useNavigate();

    const [erro, setErro] = useState({
        status: ''
    });
    const [statusEditFunc, setStatusEditFunc] = useState({
        status: ''
    });

    const [statusDelFunc, setStatusDelFunc] = useState({
        status: ''
    });

    //é preciso tratar o erro no axios
    useEffect(() => {

        (async () => {

            await getFuncionarios().then((res) => {
                // Faça aqui o que quiser com a resposta da requisição.
                setListaFuncionario(res.data.funcionarios.reverse());
                // console.log("listaFuncionario", res.data.funcionarios.reverse());

                setTotalItemsFuncionarios(res.data.funcionarios.length);
                setLoadingDois(false);
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

                    setErro({
                        status: 400
                    })
                    setLoadingDois(true);
                })



        })();

        // console.log("chamou itens")


    }, []);

    useEffect(() => {

        verificaToken();
        return () => {
            setErro({
                status: 200
            });

        };

    }, []);


    const getAllFuncionario = async () => {
        const response = await getFuncionarios();
        setListaFuncionario(response.data.funcionarios.reverse());
        setTotalItemsFuncionarios(response.data.funcionarios.length);
    }

    const onValueChange = (e) => {
        // console.log(e.target.value);
        setFuncionario({ ...funcionario, [e.target.name]: e.target.value })
        // console.log(user);
    }

    const FuncionarioData = useMemo(() => {
        let computedFuncionarios = listaFuncionario;

        computedFuncionarios = computedFuncionarios.filter(value =>
            value.id !== 0
        );

        if (search) {
            computedFuncionarios = computedFuncionarios.filter(value =>
                value.nome.normalize("NFD").toLowerCase().includes(search.toLowerCase())
            );
        }
        //Current Page slice
        return computedFuncionarios.slice(
            (currentPage - 1) * props.itensPerPage,
            (currentPage - 1) * props.itensPerPage + props.itensPerPage
        );
    }, [listaFuncionario, currentPage, search, props.itensPerPage]);


    const verificaToken = () => {

        if (erro.status === 400) {

            localStorage.removeItem("user");
            localStorage.removeItem("token");

            api.defaults.headers.Authorization = null;

            setListaFuncionario(null);

            // console.log("Entrou no if de saída");
            navigate("/login");

        }

    }

    // const handleClose = () => setShow(false);
    const handleCloseTres = () => {
        setStatusDelFunc({
            status: 200
        })

        setShowTres(false);

    }


    const handleCloseDois = () => {
        setShowDois(false);
        setFuncionario({
            nome: '',
            descricao: "",
            educador: "",
            inicio: "",
            fim: "",
            ch: "",
            local: ""
        })
        setStatusEditFunc({
            status: 200
        })
    }

    const handleShow = () => setShow(true);


    const loadFuncionarioData = async (id) => {

        const idLoad = id;

        setValorId(idLoad);

        setShowDois(true);

        const response = await getFuncionarioById(idLoad);
        setFuncionario(response.data.funcionario);
    }

    const editFuncionarioDetails = async () => {

        const valorIdEdit = valorId;
        const treinaEdit = funcionario;

        try {

            await editFuncionario(valorIdEdit, treinaEdit);
            setFuncionario({
                nome: "",
                cargo: "",
                setor: "",

            })
            setLoading(true);
            setStatusEditFunc({
                status: 200
            })

            await sleep(3000);

            function sleep(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);

                })

            }
            getAllFuncionario();
            handleCloseDois();
            setLoading(false);

        } catch (error) {
            console.log(error)
            setStatusEditFunc({
                status: 400
            })

        }

    }

    const deleteFuncionarioData = async (id) => {

        const idDelete = id;
        setValorIdDois(idDelete);

        setShowTres(true);


    }

    const deleteItemConfirmacao = async () => {

        try {

            // valorIdDois
            await deleteFuncionario(valorIdDois);

            setStatusDelFunc({
                status: 200
            })
            setLoading(true);

            await sleep(3000);

            function sleep(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);

                })

            }
            getAllFuncionario();
            handleCloseTres();


            setLoading(false);

        } catch (error) {

            console.log(error)
            setStatusDelFunc({
                status: 400
            })

        }

    }

    const handleLoadMore = () => {
        props.setItensPerPage(props.itensPerPage + 2);
    };

    const handleLoadMenos = () => {
        props.setItensPerPage(2);
    };

    if (loadingDois) {

        return (
            <IconSpinner />
        )

    }

    const readTreinamentoFunc = (id) => {

        navigate(`/funcionario/${id}`);

    }

    const renderData = () => {

        return (
            <Row className={styles.rowMain}>
                {
                    FuncionarioData.length === 0 ? <span className={styles.spanNaoha} >Não há funcionário</span> :
                        FuncionarioData.map(value => (
                            <Col className={styles.colMain} key={value.id}>
                                <Card className={styles.card} border="primary" style={{ width: '50rem' }}>
                                    <div className={styles.containerIcons}>
                                        <div className={styles.icons}><AiTwotoneEdit onClick={() => loadFuncionarioData(value.id)} /></div>
                                        <div className={styles.icons}><AiFillDelete onClick={() => deleteFuncionarioData(value.id)} /></div>
                                        <div className={styles.icons}><IoListCircleOutline onClick={() => readTreinamentoFunc(value.id)} /></div>
                                    </div>
                                    <Card.Header className={styles.cardTitle}>Id: {value.id}</Card.Header>
                                    <Card.Header className={styles.cardTitle}>Funcionario: {value.nome} </Card.Header>
                                    <Card.Body >
                                        <Card.Title className={styles.cardTitle}>Cargo: {value.cargo}</Card.Title>
                                        <Card.Title className={styles.cardTitle}>Setor: {value.setor}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                <br />
            </Row>
        );
    };

    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.mainTop}>
                    <div className='row' id={styles.mb2}>
                        <div className='col-12 col-sm-6' id={styles.totalTreinamentos} style={{paddingBottom: '20px', textAlign: 'center'}}>
                            Total de funcionários: {totalItemsFuncionarios}
                        </div>
                        <div className='col-12 col-sm-6 d-flex justify-content-center' style={{minHeight: '55px'}}>
                            <Button  id={styles.buttonAgendarTreinamento} onClick={handleShow} variant="secondary" size="lg">
                                Agendar Treinamento
                            </Button>
                        </div>
                    </div>
                </div>
                <SearchNovo className="mt-5"
                    onSearch={value => {
                        setSearch(value);
                        setCurrentPage(1);
                    }}
                />
                <div className={styles.mainBottom}>
                    {renderData()}
                </div>
                <div className={styles.containerButtonVerMais}>
                    {totalItemsFuncionarios > 2 && props.itensPerPage <= FuncionarioData.length && !search ?
                        <button onClick={handleLoadMore} className={styles.buttonVerMais}>
                            Ver mais
                        </button> :
                        totalItemsFuncionarios > 2 && props.itensPerPage > FuncionarioData.length && !search ?
                            <button onClick={handleLoadMenos} className={styles.buttonSemDados} >
                                Topo
                            </button> :
                            null
                    }

                </div>

            </main>
            <ModalAgendamento setTotalItemsFuncionarios={setTotalItemsFuncionarios} show={show} setShow={setShow} setFuncionario={setFuncionario} funcionario={funcionario}
                totalItemsFuncionarios={totalItemsFuncionarios} loading={loading} setLoading={setLoading} listaFuncionario={listaFuncionario} setListaFuncionario={setListaFuncionario} />
            <ModalEditar statusEditFunc={statusEditFunc} showDois={showDois} onValueChange={onValueChange} editFuncionarioDetails={editFuncionarioDetails} loading={loading} handleCloseDois={handleCloseDois} funcionario={funcionario} />
            <ModalDelete statusDelFunc={statusDelFunc} showTres={showTres} handleCloseTres={handleCloseTres} loading={loading} deleteItemConfirmacao={deleteItemConfirmacao} />
        </>
    )
}

export default AllTraining
