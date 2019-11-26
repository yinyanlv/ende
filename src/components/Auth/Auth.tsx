import React from 'react';

export class Auth extends React.PureComponent {
    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}
