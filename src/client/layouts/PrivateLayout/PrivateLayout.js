import React from 'react';
import { useStore } from 'daria-store';

function mapStateToProps(store) {
    return {
        logout: store.logout,
    };
}

const PrivateLayout = ({children}) => {
    const { logout } = useStore(mapStateToProps);
    return (
        <>
            <div>
                <button onClick={() => logout()}>logout</button>
            </div>
            {children}
        </>
    );
};

export default PrivateLayout;
