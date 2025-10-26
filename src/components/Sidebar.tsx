import React from "react";
import {
  LayoutDashboard,
  FolderKanban,
  BookOpen,
  User,
  Award,
  Users,
  Network,
  Newspaper,
} from "lucide-react";
import { useTheme } from "./ThemeContext"; 

interface SidebarProps {
  currentView: string;
  onViewChange: (view: "default" | "ecommerce" | "projects" | "courses") => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      className={`w-[180px] flex flex-col border-r transition-colors duration-300
      ${
        isLight
          ? "bg-white text-black border-gray-200"
          : "bg-[#0f0f0f] text-gray-200 border-[#1a1a1a]"
      }`}
    >
      {/* Header with Profile Avatar */}
      <div
        className={`p-4 border-b flex items-center gap-3 transition-colors duration-300
        ${isLight ? "border-gray-200" : "border-[#1a1a1a]"}`}
      >
        <img
          src="https://img.freepik.com/premium-photo/silhouette-girl-beach-sunrise_388791-6.jpg" // 👈 replace with your profile image
          alt="Profile"
          className="w-8 h-8 rounded-full border border-gray-300 object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-sm">ByeWind</span>
          <span
            className={`text-xs ${isLight ? "text-gray-500" : "text-gray-400"}`}
          >
            Admin
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Favorites / Recently */}
        <div className="px-3 py-4">
          <div className="flex gap-4 mb-4 text-xs text-gray-500">
            <button className="hover:text-white transition-colors">
              Favorites
            </button>
            <button className="hover:text-white transition-colors">
              Recently
            </button>
          </div>

          <nav className="space-y-0.5">
            <button
              className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-all
              ${
                isLight
                  ? "text-gray-700 hover:text-black hover:bg-gray-100"
                  : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
              }`}
            >
              <span className="text-xs">•</span>
              <span>Overview</span>
            </button>
            <button
              className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-all
              ${
                isLight
                  ? "text-gray-700 hover:text-black hover:bg-gray-100"
                  : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
              }`}
            >
              <span className="text-xs">•</span>
              <span>Projects</span>
            </button>
          </nav>
        </div>

        {/* Dashboards */}
        <div className="px-3 py-2">
          <div
            className={`text-xs mb-2 px-2 ${
              isLight ? "text-gray-600" : "text-gray-500"
            }`}
          >
            Dashboards
          </div>
          <nav className="space-y-0.5">
            {["default", "ecommerce", "projects", "courses"].map((view, idx) => {
              const icons = [
                <LayoutDashboard key="1" />,
                <LayoutDashboard key="2" />,
                <FolderKanban key="3" />,
                <BookOpen key="4" />,
              ];
              const labels = [
                "Default",
                "eCommerce",
                "Projects",
                "Online Courses",
              ];
              const active = currentView === view;
              return (
                <button
                  key={idx}
                  onClick={() => onViewChange(view as any)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-all
                    ${
                      active
                        ? isLight
                          ? "bg-gray-200 text-black"
                          : "bg-[#1a1a1a] text-white"
                        : isLight
                        ? "text-gray-700 hover:text-black hover:bg-gray-100"
                        : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                    }`}
                >
                  {icons[idx]}
                  <span>{labels[idx]}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Pages */}
        <div className="px-3 py-2">
          <div
            className={`text-xs mb-2 px-2 ${
              isLight ? "text-gray-600" : "text-gray-500"
            }`}
          >
            Pages
          </div>
          <nav className="space-y-0.5">
            {[
              {
                icon: <User />,
                label: "User Profile",
                sub: [
                  "Overview",
                  "Projects",
                  "Campaigns",
                  "Documents",
                  "Followers",
                ],
              },
              { icon: <Award />, label: "Account" },
              { icon: <Network />, label: "Corporate" },
              { icon: <Newspaper />, label: "Blog" },
              { icon: <Users />, label: "Social" },
            ].map((item, idx) => (
              <div key={idx}>
                <button
                  className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-all
                  ${
                    isLight
                      ? "text-gray-700 hover:text-black hover:bg-gray-100"
                      : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                  }`}
                >
                  {item.icon} <span>{item.label}</span>
                </button>
                {item.sub && (
                  <div className="ml-6 space-y-0.5">
                    {item.sub.map((subItem, subIdx) => (
                      <button
                        key={subIdx}
                        className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-all
                          ${
                            isLight
                              ? "text-gray-700 hover:text-black hover:bg-gray-100"
                              : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                          }`}
                      >
                        <span>{subItem}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
