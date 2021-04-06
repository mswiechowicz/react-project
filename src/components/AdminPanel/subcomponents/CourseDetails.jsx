import React, {useContext, useState} from 'react';

import bemCssModules from "bem-css-modules";
import {default as CourseDetailsStyles} from "./CourseDetails.module.scss";

import request from "../../../helpers/request";
import {StoreContext} from "../../../store/StoreProvider";
import CoursePopup from "./CoursePopup";

const block = bemCssModules(CourseDetailsStyles);

const CourseDetails = props => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const { setCourses } = useContext(StoreContext)
    const { title, id } = props;

    const showPopup = () => setIsOpenPopup(true);
    const hidePopup = e => {
        e && e.preventDefault();
        setIsOpenPopup(false);
    }

    const handleDeleteCourse = async () => {
        try{
            const { status } = await request.delete(`/courses/${id}`);
            if(status === 200) {
                setCourses(prev => prev.filter(course => course.id !== id));
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <details className={block()}>
            <summary> {title} </summary>
            <button className={block('button')} onClick={showPopup}>Edytuj</button>
            <button className={`${block('button')} ${block('button-cancel')}`} onClick={handleDeleteCourse}>Usuń</button>
            <CoursePopup isOpenPopup={isOpenPopup} {...props} hidePopup={hidePopup} />
        </details>
    );
}
export default CourseDetails