import React, { FC, useState } from 'react';
import ArticleList from '../components/ArticleList';
import InnerSorter from '../components/InnerSorter/InnerSorter';
import SideBar from '../components/SideBar/SideBar';
import TextInput from '../components/UI/input/TextInput';
import { useAppSelector } from '../hooks/redux';
import '../styles/List.css';

const List: FC = () => {
    const [searchTitle, setSearchTitle] = useState<string>('');
    const isList = useAppSelector((state) => state.btnsReducer.isListView);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTitle(event.target.value);
    };

    return (
        <div className="list-page">
            <div className="list-page-top">
                <TextInput placeholder="Что вы ищете сегодня?" search onChange={onChange}></TextInput>
                <InnerSorter />
            </div>
            <div className="list-content">
                <SideBar />
                <ArticleList isList={isList} searchTitle={searchTitle} />
            </div>
        </div>
    );
};

export default List;
