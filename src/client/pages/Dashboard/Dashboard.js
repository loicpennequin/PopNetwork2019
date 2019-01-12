import React, { useEffect } from 'react';
import { useStore } from 'daria-store';
import LoginForm from 'components/Auth/LoginForm/LoginForm';

function mapStateToProps(store) {
    return {
        logout: store.logout,
        getCurrentUser: store.getCurrentUser,
        currentUser: store.currentUser
    };
}

const Dashboard = () => {
    const { logout, currentUser, getCurrentUser } = useStore(mapStateToProps);
    // useEffect(() => {
    //     getCurrentUser();
    // }, []);
    return (
        <>
            {!currentUser ? (
                <p>Loading user data...</p>
            ) : (
                <p>Hello, {currentUser.username} !</p>
            )}
            <button onClick={() => logout()}>logout</button>
        </>
    );
};

Dashboard.pageConfig = {
    name: 'Dashboard',
    path: '/dashboard',
    exact: true,
    authLevel: 'private'
};

export default Dashboard;
