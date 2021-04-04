import React, {Component} from 'react';

import './App.scss';
import StoreProvider from "./store/StoreProvider";
import Header from "./components/Header/Header";

class App extends Component
{
    render() {
        return (
            <StoreProvider>
                <div className="App">
                    <Header />
                </div>
            </StoreProvider>
        );
    }
}

export default App;