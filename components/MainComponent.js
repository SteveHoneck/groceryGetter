import React, { Component } from 'react';
import List from './ListComponent';
import { DATA } from '../shared/data';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

//Container component that will be parent to presentational components
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: DATA
        };
    }

    render() {
        return (
            <>
                <Header />
                <List data={this.state.data} />
                <Footer />
            </>
        )
    }
}

export default Main;