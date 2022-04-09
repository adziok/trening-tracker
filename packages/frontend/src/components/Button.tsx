import React, { ReactNode } from 'react';

const ButtonSize = {
    xs: 'px-2 py-1',
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
    xl: 'px-10 py-5',
};

const ButtonColor = {
    'bg-theme-1': 'bg-theme-1',
    'bg-theme-2': 'bg-theme-2',
    'bg-theme-3': 'bg-theme-3',
    'bg-theme-4': 'bg-theme-4',
    'bg-theme-5': 'bg-theme-5',
};

type ButtonProps = {
    // iconLeft?: ReactNode;
    // iconRight?: ReactNode;
    className?: string;
    size?: keyof typeof ButtonSize;
    background?: keyof typeof ButtonColor;
    children?: ReactNode;
    href?: string;
};

export const Button = ({ children, className = '', size = 'md', background = 'bg-theme-1', href }: ButtonProps) => {
    if (href) {
        return (
            <a href={href}>
                <button className={`${size} rounded-sm ${className} px-6 py-3 ${background}`}>{children}</button>
            </a>
        );
    }
    return <button className={`${size} rounded-sm ${className} px-6 py-3 ${background}`}>{children}</button>;
};
