import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from "react-router-dom";
import styles from './styles.module.css';
import { Col, Row } from 'react-bootstrap';
import { deleteTreinamento, editTreinamento } from '../../Service/api';
import Header from '../Header';
import SearchNovo from '../../componentes/SearchNovo';
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { getTreinamentoById } from '../../Service/api';
import { api, getTreinamentos} from '../../Service/apiDois';
import IconSpinner from '../../componentes/Spinner';
import ModalTreinamento from './ModalTreinamento';
import ModalDelete from './ModalDelete';
import ModalEditar from './ModalEditar';
import cx from 'classnames'

// eslint-disable-next-line 
const initialValues = {


    nome: '',
    descricao: "",
    educador: "",
    inicio: "",
    fim: "",
    ch: "",
    local: ""

}

// const initialValuesDez = {


//     status: 200

// }

const initialValuesTres = [


    {
        id: 1,
        nome: "",
        descricao: "",
        educador: "",
        inicio: "",
        fim: "",
        ch: "",
        local: ""
    },
    {
        id: 2,
        nome: "",
        descricao: "",
        educador: "",
        inicio: "",
        fim: "",
        ch: "",
        local: ""
    },
    {
        id: 3,
        nome: "",
        descricao: "",
        educador: "",
        inicio: "",
        fim: "",
        ch: "",
        local: ""
    },


]


const AllTraining = (props) => {
    const [search, setSearch] = useState("");//valor pesquisado
    const [loading, setLoading] = useState(false);//item atualizado
    const [loadingDois, setLoadingDois] = useState(true);//item retornado
    const [valorEdit, setValorEdit] = useState(false);

    const [treinamento, setTreinamento] = useState(initialValues);

    // const { nome, descricao, educador, local, ch, inicio, fim } = treinamento;

    const [listaTreinamento, setListaTreinamento] = useState(initialValuesTres);

    const [currentPage, setCurrentPage] = useState(1);//página atual, 1, 2, 3...

    // const [itensPerPageTreina, setItensPerPageTreina] = useState(2);
    //itens que aparecem na página

    const [show, setShow] = useState(false);
    const [showDois, setShowDois] = useState(false);
    const [showTres, setShowTres] = useState(false);

    const [totalItems, setTotalItems] = useState(0);

    const [valorId, setValorId] = useState(0);//valor pesquisado

    const [valorIdDois, setValorIdDois] = useState(0);//valor pesquisado

    const navigate = useNavigate();

    const [erro, setErro] = useState(false);
    const [statusEdit, setStatusEdit] = useState({
        status: ''
    });
    const [statusDelTrein, setStatusDelTrein] = useState({
        status: ''
    });




    //é preciso tratar o erro no axios
    useEffect(() => {

        (async () => {

            await getTreinamentos().then((res) => {
                // Faça aqui o que quiser com a resposta da requisição.
                setListaTreinamento(res.data.treinamentos.reverse());
                console.log("res.data.treinamentos.", res.data.treinamentos.reverse());

                setTotalItems(res.data.treinamentos.length - 1);
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

                    setLoadingDois(true);
                })



        })();

        // console.log("chamou itens")


    }, []);

    useEffect(() => {



    }, [statusEdit, props.itensPerPageTreina]);

    useEffect(() => {

        verificaToken();
        return () => {
            setErro(false);

        };

    }, []);


    const getAllTreinamento = async () => {
        const response = await getTreinamentos();
        setListaTreinamento(response.data.treinamentos.reverse());
        setTotalItems(response.data.treinamentos.length - 1);
    }

    const onValueChange = (e) => {
        // console.log(e.target.value);
        setTreinamento({ ...treinamento, [e.target.name]: e.target.value })
        // console.log(user);
    }


    const TreinamentoData = useMemo(() => {
        let computedTreinamentos = listaTreinamento;
        let teste;

        computedTreinamentos = computedTreinamentos.filter(value =>
            value.id !== 0
        );

        if (search) {
            computedTreinamentos = computedTreinamentos.filter(value =>
                value.nome.toLowerCase().includes(search.toLowerCase())
            );
        }

        return computedTreinamentos.slice(
            (currentPage - 1) * props.itensPerPageTreina,
            (currentPage - 1) * props.itensPerPageTreina + props.itensPerPageTreina
        );
    }, [listaTreinamento, currentPage, search, props.itensPerPageTreina]);


    const verificaToken = () => {

        if (erro) {

            localStorage.removeItem("user");
            localStorage.removeItem("token");

            api.defaults.headers.Authorization = null;

            setListaTreinamento(null);

            navigate("/login");

        }

    }

    // const handleClose = () => setShow(false);
    const handleCloseTres = () => {
        setStatusDelTrein({
            status: 200
        })
        setShowTres(false);

    }


    const handleCloseDois = () => {
        statusEdit.status = 200;
        setShowDois(false);
        setTreinamento({
            nome: '',
            descricao: "",
            educador: "",
            inicio: "",
            fim: "",
            ch: "",
            local: ""
        })

    }

    const handleShow = () => setShow(true);


    const loadTreinamentoData = async (id) => {

        const idLoad = id;

        setValorId(idLoad);

        setShowDois(true);

        const response = await getTreinamentoById(idLoad);

        setTreinamento(response.data.treinamento);

    }

    const editTreinamentoDetails = async () => {

        const valorIdEdit = valorId;
        const treinaEdit = treinamento;

        try {

            await editTreinamento(valorIdEdit, treinaEdit);

            setTreinamento({
                nome: '',
                descricao: "",
                educador: "",
                inicio: "",
                fim: "",
                ch: "",
                local: ""
            })
            setLoading(true);
            setStatusEdit({
                status: 200
            })


            await sleep(3000);

            function sleep(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);

                })

            }
            handleCloseDois();
            getAllTreinamento();
            setLoading(false);
            setValorEdit(false);
            setValorEdit(true);


        } catch (error) {
            console.log(error)
            setStatusEdit({
                status: 400
            })

        }

    }

    const deleteTreinamentoData = async (id) => {

        const idDelete = id;
        setValorIdDois(idDelete);

        setShowTres(true);


    }

    const deleteItemConfirmacao = async () => {

        try {
            // valorIdDois
            await deleteTreinamento(valorIdDois);
            setStatusDelTrein({
                status: 200
            })
            setLoading(true);

            await sleep(3000);

            function sleep(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);

                })

            }
            getAllTreinamento();
            handleCloseTres();
            setLoading(false);


        } catch (error) {

            console.log(error)
            setStatusDelTrein({
                status: 400
            })

        }




    }

    const handleLoadMore = () => {
        props.setItensPerPageTreina(props.itensPerPageTreina + 2);
    };

    const handleLoadMenos = () => {
        props.setItensPerPageTreina(2);
    };

    if (loadingDois) {

        return (
            <IconSpinner />
        )

    }

    const renderData = () => {

        return (
            <Row className={styles.rowMain}>
                {
                    TreinamentoData.length === 0 ? <span className={styles.spanNaohaTrein} >Não há treinamento</span> :
                        TreinamentoData.map(value => (
                            <Col className={styles.colMain} key={value.id}>
                                <Card className={styles.card} border="primary" style={{ width: '50rem' }}>
                                    <div className={styles.containerIcons}>
                                        <div className={styles.icons}><AiTwotoneEdit onClick={() => loadTreinamentoData(value.id)} /></div>
                                        <div className={styles.icons}><AiFillDelete onClick={() => deleteTreinamentoData(value.id)} /></div>
                                    </div>
                                    <Card.Header className={styles.cardTitle}>Id: {value.id}</Card.Header>
                                    <Card.Header className={styles.cardTitle}>Treinamento: {value.nome} </Card.Header>
                                    <Card.Body >
                                        <Card.Title className={styles.cardTitle}>Descrição: {value.descricao}</Card.Title>
                                        <Card.Title className={styles.cardTitle}>Educador (a): {value.educador}</Card.Title>
                                        <Card.Title className={styles.cardTitle}>Carga Horária: {value.ch}</Card.Title>
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
                    <div className={cx(styles.mb2, 'row d-flex justify-content-center')} id="mb-2">
                        <div className={cx(styles.totalTreinamentos, 'col-12 col-sm-6 d-flex justify-content-center')} style={{paddingBottom: '20px', textAlign: 'center'}}>
                            Total de treinamentos: {totalItems}
                        </div>
                        <div className='col-12 col-sm-6 d-flex justify-content-center' style={{minHeight: '55px'}}>
                            <Button className={styles.buttonCriarTreinamento} onClick={handleShow} variant="secondary" size="lg">
                                Criar Treinamento
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

                    {totalItems > 2 && props.itensPerPageTreina <= TreinamentoData.length && !search  ?
                        <button onClick={handleLoadMore} className={styles.buttonVerMais} >
                            Ver mais
                        </button> :
                        totalItems > 2 && props.itensPerPageTreina > TreinamentoData.length && !search  ?
                            <button onClick={handleLoadMenos} className={styles.buttonSemDados} >
                                Topo
                            </button> :
                            null
                    }

                </div>
            </main>
            <ModalTreinamento listaTreinamento={listaTreinamento} show={show} setShow={setShow} setTreinamento={setTreinamento} treinamento={treinamento} setListaTreinamento={setListaTreinamento}
                setTotalItems={setTotalItems} loading={loading} setLoading={setLoading} />
            <ModalEditar statusEdit={statusEdit} valorEdit={valorEdit} showDois={showDois} onValueChange={onValueChange} editTreinamentoDetails={editTreinamentoDetails} loading={loading} handleCloseDois={handleCloseDois} treinamento={treinamento} />
            <ModalDelete statusDelTrein={statusDelTrein} showTres={showTres} handleCloseTres={handleCloseTres} loading={loading} deleteItemConfirmacao={deleteItemConfirmacao} />
        </>
    )
}

export default AllTraining
