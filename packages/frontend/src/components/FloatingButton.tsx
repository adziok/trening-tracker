import { ReactNode } from 'react';

type FloatingButtonProps = {
    children: ReactNode;
};

export const FloatingButton = ({ children }: FloatingButtonProps) => {
    return <div className="fixed right-3 bottom-3 bg-transparent">{children}</div>;
};
