import React, {useContext, useState} from 'react';

import bemCssModules from "bem-css-modules";
import {default as CoursePopupStyles} from "./CoursePopup.module.scss";
import Modal from "../../Modal/Modal";
import {StoreContext} from "../../../store/StoreProvider";
import request from "../../../helpers/request";

const block = bemCssModules(CoursePopupStyles);

const CoursePopup = (
    {
        authors = [],
        hidePopup,
        isEditMode = true,
        isOpenPopup,
        id,
        img= '',
        price = 0,
        title = ''
    }) => {
    const [formAuthors, setFormAuthors] = useState(authors);
    const [formAuthor, setFormAuthor] = useState('');
    const [formImg, setFormImg] = useState(img);
    const [formPrice, setFormPrice] = useState(price);
    const [formTitle, setFormTitle] = useState(title);

    const { setCourses } = useContext(StoreContext)

    const handleChangeAuthor = ({target: {value}}) => setFormAuthor(value);
    const handleChangeImg = ({target: {value}}) => setFormImg(value);
    const handleChangePrice = ({target: {value}}) => setFormPrice(value);
    const handleChangeTitle = ({target: {value}}) => setFormTitle(value);

    const handleOnSubmit = async e => {
        e.preventDefault();
        const courseObject = {
            authors: formAuthors,
            price: Number(formPrice),
            title: formTitle,
            img: formImg,
        }

        if(isEditMode) {
            courseObject.id = id;
            const { data, status } = await request.put('/courses', courseObject)
            if(status === 202) {
                setCourses(data.courses);
            }
        } else {
            const { data, status } = await request.post('/course', courseObject)
            if(status === 201) {
                setCourses(data.courses);
            }
        }
        hidePopup();
    }

    const addAuthor = e => {
        e.preventDefault();
        setFormAuthors(prev => [...prev, formAuthor]);
        setFormAuthor('');
    };

    const deleteAuthor = e => {
        const authorToDelete = e.target.dataset.index;
        setFormAuthors(prev => prev.filter((author,index) => index !== authorToDelete))
    }

    const authorsElements = formAuthors.map((author,index) => (
        <li key={index}>
            <p>{author}</p>
            <button data-author={index} onClick={deleteAuthor}>Usuń</button>
        </li>
    ))

    const correctLabel = isEditMode ? 'Aktualizuj kurs' : 'Utwórz kurs';

    return (
        <Modal handleClose={hidePopup} isOpen={isOpenPopup}>
            <div className={block()}>
                <form className={block('form')} method="post" onSubmit={handleOnSubmit}>
                    <div className={block('form-row')}>
                        <label className={`${block('form-row')}-label`}>
                            <span>Autor:</span>
                            <input className={block('input')} type="text" value={formAuthor} onChange={handleChangeAuthor} />
                            <button onClick={addAuthor}>Dodaj autora</button>
                        </label>
                    </div>
                    <div className={block('form-row')}>
                        <label className={`${block('form-row')}-label`}>
                            <span>Obrazek url:</span>
                            <input className={block('input')} type="text" value={formImg} onChange={handleChangeImg} />
                        </label>
                    </div>
                    <div className={block('form-row')}>
                        <label className={`${block('form-row')}-label`}>
                            <span>Cena:</span>
                            <input className={block('input')} type="number" value={formPrice} onChange={handleChangePrice} />
                        </label>
                    </div>
                    <div className={block('form-row')}>
                        <label className={`${block('form-row')}-label`}>
                            <span>Tytuł:</span>
                            <input className={block('input')} type="text" value={formTitle} onChange={handleChangeTitle} />
                        </label>
                    </div>
                    <button type="submit"> {correctLabel} </button>
                    <button className={block('cancel')} onClick={hidePopup}>Anuluj</button>
                </form>
                <h2 className={block('title')}>Lista autorów</h2>
                <ul>
                    {authorsElements}
                </ul>
            </div>
        </Modal>
    );
}
export default CoursePopup