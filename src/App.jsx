import React, {Component} from 'react';

import './App.scss';
import StoreProvider from "./store/StoreProvider";

class App extends Component
{
    render() {
        return (
            <StoreProvider>
                <div className="App">
                    Hello world!
                </div>
            </StoreProvider>
        );
    }
}

export default App;