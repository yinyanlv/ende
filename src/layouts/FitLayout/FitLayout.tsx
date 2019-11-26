import React from 'react';
import {Button} from 'antd';
import {PageHome} from '@/pages/Home';

export class FitLayout extends React.PureComponent {

    render() {
        return (
            <>
                <Button>hello react</Button>
                <PageHome/>
            </>
        );
    }
}
