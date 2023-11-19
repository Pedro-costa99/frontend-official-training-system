import React from "react";
import { Button } from "react-bootstrap";
import styles from "./styles.module.css";

function ButtonSimConfirmacao({ deleteItemConfirmacao }) {
  return (
    <Button
      className={styles.buttonSalvar}
      onClick={() => deleteItemConfirmacao()}
    >
      Sim
    </Button>
  );
}

export default ButtonSimConfirmacao;
