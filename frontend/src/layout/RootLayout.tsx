import React from 'react';
import Header from '../components/Header';

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <div className={`py-5 px-[20%]`}>
                {children}
            </div>
        </>
    );
};

export default RootLayout;
