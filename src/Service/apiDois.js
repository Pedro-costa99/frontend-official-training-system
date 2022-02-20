import axios from "axios";

export const api = axios.create({
    baseURL: 'https://backend-official-training-syst.herokuapp.com/api/'
})

//Login
export const createSession = async (email, password) =>{
    return await api.post("/login", {email, password});
}

//Usuario
export const getUsuario = async () =>{
    return await api.get("/");
}

//Funcionário
export const getFuncionarios = async () =>{
    return await api.get("/funcionarios");
}

export const getFuncionarioById = async (id) =>{
    return await api.get(`/funcionario/${id}`);
}

//Treinamentos
export const getTreinamentos = async () =>{
    return await api.get("/treinamentos");
}

export const cadastrarTreinamento = async (user) =>{
    return await api.post("/cadastrartreinamento", user);
}

//Agendamento
export const cadastrarAgendamento = async (funcionarioId, treinamentoId ) =>{
    return await api.post("/cadastraragendamento", {funcionarioId, treinamentoId});
}

export const agendamentoById = async (id) =>{
    return await api.get(`/agendamento/${id}`);
}

