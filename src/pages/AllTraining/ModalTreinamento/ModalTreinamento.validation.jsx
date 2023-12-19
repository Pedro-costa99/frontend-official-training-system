import { object, string } from "yup";

const validationSchema = object().shape({
  nome: string().nullable().required("O campo nome é obrigatório"),
  descricao: string().nullable().required("O campo descricao é obrigatório"),
  educador: string().nullable().required("O campo educador é obrigatório"),
  ch: string().nullable().required("O campo ch é obrigatório"),
  local: string().nullable().required("O campo local é obrigatório"),
  inicio: string().nullable().required("O campo inicio é obrigatório"),
  fim: string().nullable().required("O campo fim  é obrigatório"),
});

export { validationSchema };
