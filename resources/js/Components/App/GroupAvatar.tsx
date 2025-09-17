import React from "react";
import { Users } from "lucide-react";

interface GroupAvatarProps {
  name: string;
}

const GroupAvatar: React.FC<GroupAvatarProps> = ({ name }) => {
  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white">
      <Users size={20} />
    </div>
  );
};

export default GroupAvatar;
