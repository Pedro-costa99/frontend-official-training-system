import axios from 'axios';
// import dotenv from 'dotenv';
require('dotenv').config()
//usar variável de ambiente

// const UrlSistema = process.env.REACT_APP_API_URL;
// const UrlSistema = 'https://jsonplaceholder.typicode.com/todos';

const UrlSistema = 'https://backend-official-training-syst.herokuapp.com/api/';

//Treinamentos
export const deleteTreinamento = async (Id) => {
    return await axios.delete(`${UrlSistema}/treinamento/${Id}`);
}

export const getTreinamentoById = async (id) => {
    id = id || '';
    return await axios.get(`${UrlSistema}/treinamento/${id}`);
}

export const editTreinamento = async (id, user) => {
    return await axios.put(`${UrlSistema}/treinamento/${id}`, user)
}

//Funcionários
export const deleteFuncionario = async (Id) => {
    return await axios.delete(`${UrlSistema}/funcionario/${Id}`);
}

export const editFuncionario = async (id, user) => {
    return await axios.put(`${UrlSistema}/funcionario/${id}`, user)
}