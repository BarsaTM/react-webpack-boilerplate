import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import axios from 'axios';
import './styles/index.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
            </div>
        );
    }
}

export default withRouter(App);
