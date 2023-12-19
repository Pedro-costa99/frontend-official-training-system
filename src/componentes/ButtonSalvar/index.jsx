import React from "react";
import { Button } from "react-bootstrap";
import styles from "./styles.module.css";

function ButtonSalvar({ isDisabled }) {
  return (
    <Button
      variant="primary"
      className={styles.buttonSalvar}
      disabled={isDisabled}
      type="submit"
    >
      Salvar
    </Button>
  );
}

export default ButtonSalvar;
