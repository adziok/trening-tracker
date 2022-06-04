import React, { ReactNode } from 'react';
import logo from './logo.svg';
import { Button } from './components/Button';

const PageWrapper = ({ children }: { children: ReactNode }) => {
    return <div className="max-w">{children}</div>;
};

function App() {
    return (
        <PageWrapper>
            <header>
                <img src={logo} alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
                <Button size={'md'}>Test</Button>
            </header>
        </PageWrapper>
    );
}

export default App;
