import React from 'react';
import bemCssModules from "bem-css-modules";
import { default as CourseStyles } from './Course.module.scss';

const block = bemCssModules(CourseStyles);

const Course = ({ authors, img, price, title }) => {
    const allAuthors = authors.join(', ');
    const priceSpan = (<span style={{color: "#61dafb"}}> {price}zł </span>);
    return (
        <article className={block()}>
            <h3 className={block('title')}>{title}</h3>
            <img alt={title} className={block('image')} src={img}/>
            <p className={block('price')}> Koszt kursu: {priceSpan}</p>
            <p className={block('authors')}> {`Autorzy: ${allAuthors}`}</p>
        </article>
    );
};

export default Course;