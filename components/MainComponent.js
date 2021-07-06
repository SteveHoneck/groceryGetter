import React, { Component } from 'react';
import List from './ListComponent';
import { DATA } from '../shared/data';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

//Container component that will be parent to presentational components. Holds "itemArray" and functions that operate on the array and passes them to the various components

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemArray: DATA //Replace with empty array when implement "addItem" modal
            //Add state for input from "addItem" modal
            //Add state for input from "addStore" modal
        };
    }

    //Function "checkBoxToggle"  to check/uncheck items' boxes (make arrow function so don't have to bind    checkBoxToggle () => {...}   )

    //Function "deleteCheckedItems"  to delete all checked items (make arrow function so don't have to bind    deleteCheckedItems () => {...}   )

    //Function "addItemSubmit" to submit info from "addItem" modal  (make arrow function so don't have to bind    addItemSubmit () => {...}   )

    //Function "addStoreSubmit" to submit info from "addStore" modal  (make arrow function so don't have to bind    addStoreSubmit () => {...}   )

    render() {
        return (
            <>
                <Header />
                <List itemArray={this.state.itemArray} />
                <Footer />
            </>
        )
    }
}

export default Main;