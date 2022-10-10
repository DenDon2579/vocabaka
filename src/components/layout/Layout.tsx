import React from 'react';
import Content from './content/Content';
import Header from './header/Header';

const Layout: React.FC = () => {
    return (
        <>
            <Header />
            <Content />
        </>
    );
};

export default Layout;
