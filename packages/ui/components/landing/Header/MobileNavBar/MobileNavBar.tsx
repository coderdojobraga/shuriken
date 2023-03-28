import { useState } from "react";
import Link from "next/link";
import { Drawer } from "antd";
import {
  BookOutlined,
  CrownOutlined,
  DashboardOutlined,
  LoginOutlined,
  LogoutOutlined,
  SnippetsOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
  CalendarOutlined,
  TeamOutlined,
  MenuOutlined,
  CloseCircleOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import { ThemeToggle, useAuth, useTheme } from "@coderdojobraga/ui";

import { MENU_ENTRIES } from "../config";
import { getUserInitials } from "../utils";

import styles from "./style.module.css";

const icons = {
  "/web/curriculum": <SnippetsOutlined />,
  "/web/recruitment": <PlusOutlined />,
  "/web/team": <TeamOutlined />,
  "/web/hall-of-fame": <CrownOutlined />,
  "/web/faqs": <QuestionCircleOutlined />,
  "/web/dojocon": <CalendarOutlined />,
  "/web/projects": <ExperimentOutlined />,
  "/blog": <BookOutlined />,
};

interface LoginButtonProps {
  isLoading: boolean;
  isDark: boolean;
}

const LoginButton = ({ isLoading, isDark }: LoginButtonProps) => (
  <li
    className={isLoading ? styles.loader : "hover:text-primary cursor-pointer"}
  >
    <div
      className={`flex items-center justify-center gap-x-2 ${isDark && "text-white"
        }`}
    >
      {!isLoading && <LoginOutlined />}
      <Link href="/dashboard/login">{!isLoading ? "LOGIN" : ""}</Link>
    </div>
  </li>
);

interface MenuDrawerProps {
  isDrawerVisible: boolean;
  setVisibleDrawer: (value: boolean) => void;
}

const MenuDrawer = ({ isDrawerVisible, setVisibleDrawer }: MenuDrawerProps) => {
  const { user, isLoading, logout } = useAuth();
  const { isDark } = useTheme();

  const onDrawerLogOut = () => {
    logout();
    setVisibleDrawer(false);
  };

  return (
    <Drawer
      className="flex md:hidden"
      placement="right"
      onClose={() => setVisibleDrawer(false)}
      open={isDrawerVisible}
      zIndex={50}
      bodyStyle={{
        backgroundColor: isDark ? "#262626" : "#ffffff",
      }}
      headerStyle={{
        backgroundColor: isDark ? "#262626" : "#ffffff",
      }}
      closeIcon={
        <div
          className={`flex items-center justify-center gap-x-2 ${isDark && "text-white"
            }`}
        >
          <CloseCircleOutlined />
        </div>
      }
    >
      <ul className="flex flex-col items-center gap-6 text-xl uppercase">
        {MENU_ENTRIES.map(({ key, text }) => (
          <li className="hover:text-primary cursor-pointer">
            <div
              className={`flex items-center justify-center gap-x-2 ${isDark && "text-white"
                }`}
            >
              {icons[key as keyof typeof icons]}
              <Link href={key}>{text}</Link>
            </div>
          </li>
        ))}

        {user ? (
          <>
            <li className="hover:text-primary cursor-pointer">
              <Link href="/dashboard">
                <div
                  className={`flex items-center justify-center gap-x-2 ${isDark && "text-white"
                    }`}
                >
                  <DashboardOutlined />
                  <p className="hover:text-primary cursor-pointer">Dashboard</p>
                </div>
              </Link>
            </li>

            <button
              className="hover:text-primary cursor-pointer"
              onClick={(_) => onDrawerLogOut()}
            >
              <div
                className={`flex items-center justify-center gap-x-2 ${isDark && "text-white"
                  }`}
              >
                <LogoutOutlined />
                <p className="hover:text-primary cursor-pointer">SAIR</p>
              </div>
            </button>
          </>
        ) : (
          <Link href="/dashboard/login">
            <LoginButton isLoading={isLoading} isDark={isDark} />
          </Link>
        )}
      </ul>
    </Drawer>
  );
};

function MobileNavBar({ landing = false }: { landing?: boolean }) {
  const { user } = useAuth();

  const [isDrawerVisible, setVisibleDrawer] = useState(false);

  return (
    <div className="flex flex-1 justify-end space-x-4 px-2 md:hidden">
      <ThemeToggle visible={!landing} />

      {user ? (
        <>
          <button type="button" onClick={(_) => setVisibleDrawer(true)}>
            {user.photo ? (
              /* eslint-disable @next/next/no-img-element */
              <img
                className="z-50 rounded-full"
                src={user.photo}
                width={50}
                height={50}
              />
            ) : (
              <div className="border-primary relative z-50 select-none rounded-full border-2 px-2 py-1 text-lg">
                {getUserInitials(user)}
              </div>
            )}
          </button>

          <MenuDrawer
            isDrawerVisible={isDrawerVisible}
            setVisibleDrawer={setVisibleDrawer}
          />
        </>
      ) : (
        <>
          <button
            onClick={() => setVisibleDrawer(true)}
            type="button"
            className="bg-primary inline-flex transform items-center justify-center rounded-md p-2 text-xl text-white duration-300 hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            <MenuOutlined />
          </button>

          <MenuDrawer
            isDrawerVisible={isDrawerVisible}
            setVisibleDrawer={setVisibleDrawer}
          />
        </>
      )}
    </div>
  );
}

export default MobileNavBar;
