import axios from "axios";

export const api = axios.create({
  baseURL:
    "https://backend-official-training-syst-b23685a27f2f.herokuapp.com/api/",
});

// Login
export const createSession = async (email, password) =>
  api.post("/login", { email, password });

// Usuario
export const getUsuario = async () => api.get("/");

// Funcionário
export const getFuncionarios = async () => api.get("/funcionarios");

export const getFuncionarioById = async (id) => api.get(`/funcionario/${id}`);

// Treinamentos
export const getTreinamentos = async () => api.get("/treinamentos");

export const cadastrarTreinamento = async (user) =>
  api.post("/cadastrartreinamento", user);

// Agendamento
export const cadastrarAgendamento = async (funcionarioId, treinamentoId) =>
  api.post("/cadastraragendamento", {
    funcionarioId,
    treinamentoId,
  });

export const agendamentoById = async (id) => api.get(`/agendamento/${id}`);
