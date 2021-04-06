import React, {useContext} from 'react';
import bemCssModules from "bem-css-modules";
import { default as CourseStyles } from './Course.module.scss';
import {StoreContext} from "../../store/StoreProvider";
import {useHistory} from "react-router";
import request from "../../helpers/request";

const block = bemCssModules(CourseStyles);

const Course = ({ authors, id, img, price, title, isUserContext, alreadyBought }) => {
    const { user, setUser } = useContext(StoreContext);
    const history = useHistory();

    const allAuthors = authors.join(', ');
    const priceSpan = (<span style={{color: "#61dafb"}}> {price}zł </span>);

    const isUserLogged = Boolean(user);

    const handleOnClick = async () => {
        try {
            const { data, status} = await request.patch(
                '/users',
                {
                    login: user.login,
                    courseId: id
                }
            )
            if(status === 202) {
                setUser(data.user);
                history.push('/my-courses');
            }
        } catch(err) {
            console.log(err);
        }
    }

    let buyButton = <button className={block('button')} onClick={handleOnClick}> Zakup ten kurs </button>
    const shouldBeButtonShown = isUserLogged && !isUserContext;
    if(Boolean(shouldBeButtonShown)) {
        user.courses.includes(id)
            && (buyButton = <button className={`${block('button')} ${block('button')}-disabled`} disabled={true} onClick={handleOnClick}> Kurs już kupiony </button>)
    }

    return (
        <article className={block()}>
            <h3 className={block('title')}>{title}</h3>
            <img alt={title} className={block('image')} src={img}/>
            <p className={block('price')}> Koszt kursu: {priceSpan}</p>
            <p className={block('authors')}> {`Autorzy: ${allAuthors}`}</p>
            { shouldBeButtonShown  && buyButton}
        </article>
    );
};

export default Course;