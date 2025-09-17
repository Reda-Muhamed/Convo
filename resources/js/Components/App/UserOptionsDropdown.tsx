import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import {
    EllipsisVerticalIcon,
    UserIcon,
    NoSymbolIcon,
    CheckCircleIcon,
    TrashIcon,
    UsersIcon,
    ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

interface UserOptionsDropdownProps {
    conversation: any;

}

const UserOptionsDropdown: React.FC<UserOptionsDropdownProps> = ({
    conversation,

}) => {
    const handleAction = (action?: (conv: any) => void) => {
        if (action) action(conversation);
    };
    const onViewProfile = () => {

    }
    const onRemove = () => {

    }

    const onBlock = () => {
        if (!conversation.is_user) {
            return;
        }
        axios.post(route('user.blockUnblock', conversation.id)).then((res: any) => {
            console.log(res.data)
        }).catch((err) => {
            console.error(err)
        })
    }
    const changeUserRole = () => {
        if (!conversation.is_user) {
            return;
        }
        axios.post(route('user.changeRole', conversation.id)).then((res: any) => {
            console.log(res.data)
        }).catch((err) => {
            console.error(err)
        })
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            {/* Trigger Button */}
            <div>
                <MenuButton as="button"
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault(); // 👈 تمنع أي action للـ <Link>
                    }}
                    className="p-1 text-gray-400 hover:text-white"  >
                    <EllipsisVerticalIcon className="w-5 h-5" />
                </MenuButton>
            </div>

            {/* Dropdown Menu */}
            <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-gray-800 divide-y divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-1 py-1">
                        {/* View Profile */}
                        <MenuItem>
                            {({ active }) => (
                                <button
                                    onClick={() => handleAction(onViewProfile)}
                                    className={`${active ? "bg-gray-700 text-white" : "text-gray-200"
                                        } group flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md`}
                                >
                                    <UserIcon className="w-4 h-4" />
                                    View Profile
                                </button>
                            )}
                        </MenuItem>

                        {/* Block / Unblock */}
                        {conversation.blocked_at ? (
                            <MenuItem>
                                {({ active }) => (
                                    <button
                                        onClick={() => handleAction(onBlock)}
                                        className={`${active ? "bg-gray-700 text-white" : "text-gray-200"
                                            } group flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md`}
                                    >
                                        <CheckCircleIcon className="w-4 h-4 text-green-400" />
                                        Unblock User
                                    </button>
                                )}
                            </MenuItem>
                        ) : (
                            <MenuItem>
                                {({ active }) => (
                                    <button
                                        onClick={() => handleAction(onBlock)}
                                        className={`${active ? "bg-gray-700 text-white" : "text-gray-200"
                                            } group flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md`}
                                    >
                                        <NoSymbolIcon className="w-4 h-4 text-yellow-400" />
                                        Block User
                                    </button>
                                )}
                            </MenuItem>
                        )}
                        {
                            conversation.is_admin ? (
                                <MenuItem>
                                    {({ active }) => (
                                        <button
                                            onClick={() => changeUserRole}
                                            className={`${active ? "bg-gray-700 text-white" : "text-gray-200"
                                                } group flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md`}
                                        >
                                            <UsersIcon className="w-4 h-4 text-green-400" />
                                            Make Regular User
                                        </button>
                                    )}
                                </MenuItem>
                            ) : (
                                <MenuItem>
                                    {({ active }) => (
                                        <button
                                            onClick={() => changeUserRole}
                                            className={`${active ? "bg-gray-700 text-white" : "text-gray-200"
                                                } group flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md`}
                                        >
                                            <ShieldCheckIcon className="w-4 h-4 mr-2" />
                                            Make Admin
                                        </button>
                                    )}
                                </MenuItem>
                            )
                        }

                        {/* Remove Conversation */}
                        <MenuItem>
                            {({ active }) => (
                                <button
                                    onClick={() => handleAction(onRemove)}
                                    className={`${active ? "bg-gray-700 text-white" : "text-red-400"
                                        } group flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md`}
                                >
                                    <TrashIcon className="w-4 h-4" />
                                    <span>Remove </span>
                                </button>
                            )}
                        </MenuItem>
                    </div>
                </MenuItems>
            </Transition>
        </Menu >
    );
};

export default UserOptionsDropdown;
