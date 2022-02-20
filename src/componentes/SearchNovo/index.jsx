import React, { useState } from "react";
import styles from './styles.module.css';
import cx from 'classnames'

const Search = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const onInputChange = value => {
        setSearch(value);
        onSearch(value);
    };
    return (
        <div className={cx('container', styles.containerInput)}>
            <input
                className={cx(styles.inputSearch)}
                type="text"
                placeholder="Pesquisar"
                value={search}
                onChange={e => onInputChange(e.target.value)}
            />
        </div>
    );
};

export default Search;
