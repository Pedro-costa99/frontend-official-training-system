import React, { useState } from "react";
import cx from "classnames";
import styles from "./styles.module.css";

function Search({ onSearch }) {
  const [search, setSearch] = useState("");

  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };
  return (
    <div className={cx("container", styles.containerInput)}>
      <input
        className={cx(styles.inputSearch)}
        type="text"
        placeholder="Pesquisar"
        value={search}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
}

export default Search;
