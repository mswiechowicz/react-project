import React, {useContext} from 'react';
import bemCssModules from "bem-css-modules";
import { default as CoursesStyles } from './Courses.module.scss';
import {StoreContext} from "../../store/StoreProvider";
import Course from "./subcomponents/Course";

const block = bemCssModules(CoursesStyles);

const Courses = () => {
    const { courses } = useContext(StoreContext);

    const coursesElements = courses.map(course => <Course key={course.id} {...course} />);

    return (
        <section className={block()}>
            <h2 className={block('title')}>Kursy</h2>
            <ul className={block('list')}>
                {coursesElements}
            </ul>
        </section>
    );
}
export default Courses