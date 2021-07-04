import React, { Component } from 'react';
import List from './ListComponent'; //NC example is directory
import { DATA } from '../shared/data';

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
            <List data={this.state.data} /> //NC example is directory
        )
    }
}

export default Main;