import { useState, useEffect } from "react";
import Link from "next/link";
import { Drawer } from "antd";
import {
  BookOutlined,
  CrownOutlined,
  DashboardOutlined,
  LoginOutlined,
  LogoutOutlined,
  SnippetsOutlined,
  PlusOutlined,
  TeamOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useAuth } from "@coderdojobraga/ui";

import { MENU_ENTRIES } from "../config";
import { getUserInitials } from "../utils";

import styles from "./style.module.css";

const icons = {
  "/web/curriculum": <SnippetsOutlined />,
  "/web/recruitment": <PlusOutlined />,
  "/web/team": <TeamOutlined />,
  "/web/hall-of-fame": <CrownOutlined />,
  "/blog": <BookOutlined />,
};

interface LoginButtonProps {
  isLoading: boolean;
}

const LoginButton = ({ isLoading }: LoginButtonProps) => (
  <li
    className={isLoading ? styles.loader : "hover:text-primary cursor-pointer"}
  >
    <div className="flex items-center justify-center gap-x-2">
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

  const onDrawerLogOut = () => {
    logout();
    setVisibleDrawer(false);
  };

  return (
    <Drawer
      className="flex md:hidden"
      placement="right"
      onClose={() => setVisibleDrawer(false)}
      visible={isDrawerVisible}
      zIndex={50}
    >
      <ul className="flex flex-col items-center gap-6 text-xl uppercase">
        {MENU_ENTRIES.map(({ key, text }) => (
          <li className="hover:text-primary cursor-pointer">
            <div className="flex items-center justify-center gap-x-2">
              {icons[key as keyof typeof icons]}
              <Link href={key}>{text}</Link>
            </div>
          </li>
        ))}

        {user ? (
          <>
            <li className="hover:text-primary cursor-pointer">
              <Link href="/dashboard">
                <div className="flex items-center justify-center gap-x-2">
                  <DashboardOutlined />
                  <p className="hover:text-primary cursor-pointer">Dashboard</p>
                </div>
              </Link>
            </li>

            <button
              className="hover:text-primary cursor-pointer"
              onClick={(_) => onDrawerLogOut()}
            >
              <div className="flex items-center justify-center gap-x-2">
                <LogoutOutlined />
                <p className="hover:text-primary cursor-pointer">SAIR</p>
              </div>
            </button>
          </>
        ) : (
          <Link href="/dashboard/login">
            <LoginButton isLoading={isLoading} />
          </Link>
        )}
      </ul>
    </Drawer>
  );
};

function MobileNavBar() {
  const { user } = useAuth();

  const [isDrawerVisible, setVisibleDrawer] = useState(false);

  return (
    <div className="flex flex-1 justify-end px-2 md:hidden">
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
