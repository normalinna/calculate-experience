import React from 'react';
import {Row} from "../components/Row";
import {Table} from "../components/Table";
import {createStore} from "redux";
import rootReducer from "../store/calc/reducer";

export class CalculationPage extends React.Component {
    store = createStore(rootReducer);

    state = {
        numChildren: 0
    };

    onAddChild = () => {
        this.setState({
            numChildren: this.state.numChildren + 1
        });
    };

    onMinusChild = () => {
        if (this.state.numChildren > 0 ) {
            this.setState({
                numChildren: this.state.numChildren - 1
            });
        }
    };

    onClearChild = () => {
        this.setState({
            numChildren: 0
        });
        this.store.dispatch({type: '@@INIT'});
    };

    render () {
        const children = [];

        for (let i = 0; i < this.state.numChildren; i += 1) {
            children.push(<Row key={i} index={i} />);
        }

        return (
            <Table addChild={this.onAddChild } minusChild={this.onMinusChild} clearChild={this.onClearChild}>
                {children}
            </Table>
        );
    }


}
