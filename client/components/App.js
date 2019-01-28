import React, { Component } from 'react';
import Header from './header/Header';
import TableTop from './tableTop/TableTop';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.css';

class App extends React.Component {
    constructor(){
        super();
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={styles.app}>
                <Header/>
                <TableTop/>
            </div>
        );
    }
}

export default App;
