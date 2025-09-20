import React from "react";

interface UserAvatarProps {
    user: any;
    online?: boolean;
    profile?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, online, profile = false }) => {
    let onlineClass = online === true ? 'online' : online === false ? 'offline' : ''
    const sizeClass = profile ? 'w-40' : 'w-8'
    return (
        <div className="relative">
            <img
                src={user.avatar == null ? `https://ui-avatars.com/api/?name=${user.name}` : user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
            />
            {online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border border-white rounded-full"></span>
            )}
        </div>
    );
};

export default UserAvatar;
