import React, {useContext, useEffect, useState} from 'react';
import Modal from "../Modal/Modal";
import bemCssModules from "bem-css-modules";

import {default as LoginFormStyles} from './LoginForm.module.scss';
import {StoreContext} from "../../store/StoreProvider";
import request from "../../helpers/request";

const block = bemCssModules(LoginFormStyles)

const LoginForm = ({handleOnClose, isModalOpen}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [validateMessage, setValidateMessage] = useState('');

    const { setUser } = useContext(StoreContext);

    const handleOnChangeLogin = ({target: {value}}) => setLogin(value);
    const handleOnChangePassword = ({target: {value}}) => setPassword(value);
    const handleOnCloseModal = e => {e.preventDefault(); handleOnClose()};

    const resetInputState = () => {

        setLogin('');
        setPassword('');
        setValidateMessage('');
    };
    const handleOnSubmit = async e => {

        e.preventDefault();
        const {data, status} = await request.post(
            '/users',
            {login, password}
            )
        if (status === 200) {
            setUser(data.user);
            resetInputState();
            handleOnClose();
        } else {
            setValidateMessage(data.message);
        }
    }

    useEffect(()=>{
        if(isModalOpen)
            resetInputState()
    }, [isModalOpen])

    const validateMessageComponent = validateMessage.length
        ? <p className={block('validate-message')}>{validateMessage}</p>
        : null

    return (
        <Modal
            handleOnClose={handleOnClose}
            isOpen={isModalOpen}
            shouldBeCloseOnOutsideClick={true}
            style={block()}
        >
            {validateMessageComponent}
            <form method="post" onSubmit={handleOnSubmit}>
                <div className={block('row')}>
                    <label>
                        Login:
                        <input type="text" value={login} onChange={handleOnChangeLogin}/>
                    </label>
                </div>
                <div className={block('row')}>
                    <label>
                        Hasło:
                        <input type="password" value={password} onChange={handleOnChangePassword}/>
                    </label>
                </div>
                <div className={block('row')}>
                    <button onClick={handleOnSubmit}type="submit">Zaloguj</button>
                    <button onClick={handleOnCloseModal}>Anuluj</button>
                </div>
            </form>
        </Modal>
    );
}
export default LoginForm
