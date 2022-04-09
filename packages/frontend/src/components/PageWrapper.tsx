import React, { ReactNode } from 'react';

type PageWrapperProps = {
    children: ReactNode;
    className?: string;
};

export const PageWrapper = ({ children, className = '' }: PageWrapperProps) => {
    return (
        <div
            className={`flex flex-col justify-center items-center h-screen w-screen overflow-y-auto overflow-x-hidden -z-50 ${className}`}
        >
            {children}
        </div>
    );
};
