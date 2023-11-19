import axios from "axios";
// import dotenv from 'dotenv';
require("dotenv").config();
// usar variável de ambiente

// const UrlSistema = process.env.REACT_APP_API_URL;
// const UrlSistema = 'https://jsonplaceholder.typicode.com/todos';

const UrlSistema =
  "https://backend-official-training-syst-b23685a27f2f.herokuapp.com/api/";

// Treinamentos
export const deleteTreinamento = async (Id) =>
  axios.delete(`${UrlSistema}/treinamento/${Id}`);

export const getTreinamentoById = async (id) =>
  axios.get(`${UrlSistema}/treinamento/${id}`);

export const editTreinamento = async (id, user) =>
  axios.put(`${UrlSistema}/treinamento/${id}`, user);

// Funcionários
export const deleteFuncionario = async (Id) =>
  axios.delete(`${UrlSistema}/funcionario/${Id}`);

export const editFuncionario = async (id, user) =>
  axios.put(`${UrlSistema}/funcionario/${id}`, user);
