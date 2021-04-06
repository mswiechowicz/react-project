import React from 'react';
import {default as AsideMenuStyle} from '../AsideMenu.module.scss';
import bemCssModules from "bem-css-modules";
import {NavLink} from "react-router-dom";

const block = bemCssModules(AsideMenuStyle);

const AdminMenu = () => {
    return (
        <>
            <h4 style={{color: 'crimson'}} className={block('title')}>Panel administratora</h4>
            <nav>
                <ul>
                    <li>
                        <NavLink className={`${block('link')} ${block('link')}-admin`} exact={false} to="/manage-courses"> Zarządzanie kursami </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}
export default AdminMenu