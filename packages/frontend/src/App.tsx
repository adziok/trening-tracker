import React from 'react';
import logo from './logo.svg';

function App() {
    return (
        <div className="p-6 max-w-sm mx-auto bg-green-400 rounded-xl shadow-lg flex items-center space-x-4 text-center">
            <header>
                <img src={logo} alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
