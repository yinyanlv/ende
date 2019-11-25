import React from 'react';
import {Button} from 'antd';
import './App.module.scss';
import {PageHome} from '@/pages/Home';

const App: React.FC = () => {
    return (
        <>
            <Button>hello react</Button>
            <PageHome/>
        </>
    );
};

export default App;
