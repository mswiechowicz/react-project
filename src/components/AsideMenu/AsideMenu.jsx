import React, {useContext} from 'react';
import {default as AsideMenuStyle} from './AsideMenu.module.scss';
import bemCssModules from "bem-css-modules";
import {StoreContext} from "../../store/StoreProvider";
import UserMenu from "./subcomponents/UserMenu";
import AdminMenu from "./subcomponents/AdminMenu";

const block = bemCssModules(AsideMenuStyle);

const ADMIN_TYPE = 1;

const AsideMenu = () => {
    const { user } = useContext(StoreContext);

    const adminMenuComponent = user?.accessLevel === ADMIN_TYPE ? <AdminMenu /> : null;

    return (
        <section className={block()}>
            <UserMenu isUserLoggedIn={Boolean(user)}/>
            {adminMenuComponent}
        </section>
    );
}
export default AsideMenu