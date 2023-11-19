import React from "react";
import { Button } from "react-bootstrap";
import styles from "./styles.module.css";

function ButtonCancelar({ handleCloseTres }) {
  return (
    <Button className={styles.buttonCancelar} onClick={handleCloseTres}>
      Cancelar
    </Button>
  );
}

export default ButtonCancelar;
