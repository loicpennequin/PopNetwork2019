import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from 'daria-store';

function mapStateToProps(store) {
    return {
        logout: store.logout,
        getCurrentUser: store.getCurrentUser,
        currentUser: store.currentUser
    };
}

const Dashboard = () => {
    const { logout, currentUser } = useStore(mapStateToProps);
    const profileUrl = `/profile/${currentUser.id}`;
    return (
        <>
            {!currentUser ? (
                <p>Loading user data...</p>
            ) : (
                <p>Hello, {currentUser.username} !</p>
            )}
            <Link to={profileUrl}>Your Profile</Link>
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
