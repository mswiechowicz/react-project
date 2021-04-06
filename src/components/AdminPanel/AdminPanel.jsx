import React, {useContext, useState} from 'react';
import bemCssModules from "bem-css-modules";
import {default as AdminPanelStyles} from "./AdminPanel.module.scss";
import {StoreContext} from "../../store/StoreProvider";
import CourseDetails from "./subcomponents/CourseDetails";
import CoursePopup from "./subcomponents/CoursePopup";

const block = bemCssModules(AdminPanelStyles);

const AdminPanel = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const { courses } = useContext(StoreContext)

    const showPopup = () => setIsOpenPopup(true);
    const hidePopup = e => {
        e.preventDefault();
        setIsOpenPopup(false);
    }

    const coursesElements = courses.map(course => <CourseDetails key={course.id} {...course} />)

    return (
        <section className={block()}>
            {coursesElements}
            <button className={block('button')} onClick={showPopup}>Dodaj nowy kurs</button>
            <CoursePopup isEditMode={false} isOpenPopup={isOpenPopup} hidePopup={hidePopup} />
        </section>
    );
}
export default AdminPanel