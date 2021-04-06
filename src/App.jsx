import React, {Component} from 'react';
import {HashRouter as Router} from 'react-router-dom';

import './App.scss';
import StoreProvider from "./store/StoreProvider";
import Header from "./components/Header/Header";
import AsideMenu from "./components/AsideMenu/AsideMenu";
import Content from "./components/Content/Content";

class App extends Component
{
    render() {
        return (
            <StoreProvider>
                <Header />
                <Router>
                    <div className="content-wrapper">
                        <AsideMenu />
                        <Content />
                    </div>
                </Router>
            </StoreProvider>
        );
    }
}

export default App;