import React, {useContext} from 'react';
import { Redirect, Route, Switch} from 'react-router-dom';
import bemCssModules from "bem-css-modules";

import { default as ContentStyles } from './Content.module.scss';
import {StoreContext} from "../../store/StoreProvider";
import Courses from "../Courses/Courses";

const block = bemCssModules(ContentStyles);

const ADMIN_TYPE = 1;

const Content = () => {
    const { user } = useContext(StoreContext);
    const isUserLogged = Boolean(user);
    const isAdmin = user?.accessLevel === ADMIN_TYPE ? true : false;

    return (
        <main className={block()}>
            <Switch>
                <Route exact path="/" render={()=> <Courses />} />
                { isUserLogged && <Route exact path="/my-courses" render={() => <p>Moje kursy</p>} /> }
                { isAdmin && <Route exact path="/manage-courses" render={() => <p>Zarządzanie kursami</p>} /> }
                <Redirect to="/" />
            </Switch>
        </main>
    );
}
export default Content