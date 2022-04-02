import React from 'react';
import logo from '../logo.svg';

function AuthorizationPage() {
    return (
        <div className="p-6 max-w-sm mx-auto bg-green-400 rounded-xl shadow-lg flex items-center space-x-4 text-center">
            <header>
                <img src={logo} alt="logo" />
                <a href="http://localhost:3000/auth" rel="noopener noreferrer">
                    Authorize
                </a>
            </header>
        </div>
    );
}

export default AuthorizationPage;
