import React from 'react';
import { useStore } from 'daria-store';

function mapStateToProps(store) {
    return {
        logout: store.logout,
        getProfile: store.getProfile,
        profile: store.profile,
        isOwnProfile: store.isOwnProfile
    };
}

const Profile = () => {
    const { logout, profile } = useStore(mapStateToProps);

    return (
        <>
            {!profile ? (
                <p>Loading Profile...</p>
            ) : (
                <p>{JSON.stringify(profile)} !</p>
            )}
            <button onClick={() => logout()}>logout</button>
        </>
    );
};

Profile.pageConfig = {
    name: 'Profile',
    path: '/profile/:id',
    exact: true,
    authLevel: 'private'
};

export default Profile;
