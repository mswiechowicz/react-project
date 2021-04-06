import React from 'react';
import {default as AsideMenuStyle} from '../AsideMenu.module.scss';
import bemCssModules from "bem-css-modules";
import {NavLink} from "react-router-dom";

const block = bemCssModules(AsideMenuStyle);

const UserMenu = ({isUserLoggedIn}) => {
    return (
        <>
            <h4 className={block('title')}>Panel użytkownika</h4>
            <nav>
                <ul>
                    <li>
                        <NavLink exact={true} className={block('link')} to="/"> Kursy w sprzedaży </NavLink>
                    </li>
                    {isUserLoggedIn && <li><NavLink exact={false} className={block('link')} to="/my-courses"> Moje zakupione kursy </NavLink></li>}
                </ul>
            </nav>
        </>
    );
}
export default UserMenu