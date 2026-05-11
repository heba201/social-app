import React from "react";
import {
  FaHome,
  FaUserFriends,
  FaUsers,
  FaStore,
  FaBookmark,
  FaFlag,
  FaStar,
  FaUserPlus
} from "react-icons/fa";
import { NavLink } from "react-router";
const navItems = [
  {
    to: "/",
    icon: FaHome,
    label: "Home",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    to: "/friends",
    icon: FaUserFriends,
    label: "Friends",
    iconBg: "bg-green-100",
    iconColor: "text-blue-600",
  },

  {
    to: "/follow-suggestions",
    icon: FaUserPlus,
    label: "Follow Suggestions",
    iconBg: "bg-green-100",
    iconColor: "text-blue-600",
  },

  {
    to: "/groups",
    icon: FaUsers,
    label: "Groups",
    iconBg: "bg-orange-100",
    iconColor: "text-green-600",
  },
  {
    to: "/marketplace",
    icon: FaStore,
    label: "Marketplace",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    to: "/saved",
    icon: FaBookmark,
    label: "Saved",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    to: "/pages",
    icon: FaFlag,
    label: "Pages",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    to: "/favorites",
    icon: FaStar,
    label: "Favorites",
    iconBg: "bg-gray-200",
    iconColor: "text-gray-600",
  },
];
const groups = [
  {
    name: "Art & Design",
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=80&fit=crop",
  },
  {
    name: "Fitness Squad",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=80&fit=crop",
  },
  {
    name: "Foods United",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=80&fit=crop",
  },
  {
    name: "Gaming Zone",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=80&fit=crop",
  },
];
export default function SideBar() {
  return (
    <>
      <aside className="w-80 mx-auto shrink-0 bg-white rounded-lg shadow-sm border border-gray-200 min-h[calc(100vh-6rem)] py-4 px-3 flex flex-col">
        <nav className="flex flex-col gap-0.5">
          {navItems.map(({ to, icon: Icon, label, iconBg, iconColor }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 no-underline transition-colors ${
                  isActive ? "bg-blue-100 text-gray-900" : "hover:bg-gray-200"
                }`
              }
            >
              <span
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}
              >
                <Icon className="w-4 h-4" />
              </span>

              <span className="font-medium text-[15px]">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="font-bold text-gray-800 text-[15px] px-3 mb-3">
            My Groups
          </h3>
          <ul className="flex flex-col gap-0.5">
            {groups.map((group) => (
              <li key={group.name}>
                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 no-underline hover:bg-gray-200 transition-colors"
                >
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                  <span className="font-medium text-[15px]">{group.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
