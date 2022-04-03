import React, { ReactNode } from 'react';

const ButtonSize = {
    xs: 'px-2 py-1',
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
    xl: 'px-10 py-5',
};

const ButtonColor = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
};

type ButtonProps = {
    // iconLeft?: ReactNode;
    // iconRight?: ReactNode;
    className?: string;
    size?: keyof typeof ButtonSize;
    background?: keyof typeof ButtonColor;
    children?: ReactNode;
};

export const Button = ({ children, className = '', size = 'lg', background = 'primary' }: ButtonProps) => {
    return <button className={`${size} rounded-sm ${className} ${background}`}>{children}</button>;
};
