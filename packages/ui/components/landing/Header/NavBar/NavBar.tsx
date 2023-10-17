import { useState } from "react";
import Link from "next/link";
import { Grid } from "antd";

import { DashboardOutlined, LogoutOutlined } from "@ant-design/icons";

import { ThemeToggle, useAuth } from "@coderdojobraga/ui";
import MobileNavBar from "../MobileNavBar/MobileNavBar";

import { MENU_ENTRIES } from "../config";
import { getUserInitials } from "../utils";

import styles from "./style.module.css";

import { ChevronDownIcon } from '@heroicons/react/24/solid'



const { useBreakpoint } = Grid;

interface EntryProps {
  href: string;
  text: string;
}

const Entry = ({ href, text }: EntryProps) => (
  <li className="hover:text-primary cursor-pointer dark:text-white">
    <Link href={href}>{text}</Link>
  </li>
);

interface UserDropDownProps {
  logout: () => void;
}

const UserDropDown = ({ logout }: UserDropDownProps) => (
  <ul>
    <li className="flex items-center text-base justify-start gap-x-2">
      <DashboardOutlined />
      <Link href="/dashboard">Dashboard</Link>
    </li>
    <li className="flex items-center justify-start gap-x-2">
      <LogoutOutlined className="mt-2" />
      <button className="hover:text-primary mt-2" onClick={logout}>
        SAIR
      </button>
    </li>
  </ul>
);

interface LoginButtonProps {
  isLoading: boolean;
}

const LoginButton = ({ isLoading }: LoginButtonProps) => (
  <li
    className={
      isLoading
        ? styles.loader
        : "bg-primary m-auto block transform cursor-pointer rounded-3xl px-4 py-2 text-white duration-300 hover:scale-110"
    }
  >
    <Link href="/dashboard/login">{!isLoading ? "LOGIN" : ""}</Link>
  </li>
);

function NavBar({ landing = true }: any) {
  const screens = useBreakpoint();

  const { user, isLoading, logout } = useAuth();

  const [userDropdownVisible, setUserDropdownVisible] = useState(false);
  const [eventosDropdownVisible, setEventosDropdownVisible] = useState(false);

  const closeEventsDropdown = () => {
    setEventosDropdownVisible(false);
  }

  const closeUserDropdown = () => {
    setUserDropdownVisible(false);
  };

  if (screens.md) {
    return (
      <ul className="flex items-center gap-5 text-base uppercase text-black md:flex">
        {MENU_ENTRIES.map(({ key, text }) => (
          <Entry href={key} text={text} />
        ))}
        <div className="relative inline-block text-left">
          <div className="cursor-pointer flex items-center gap-x-1.5"
            onClick={() => {
              setEventosDropdownVisible(!eventosDropdownVisible);
              closeUserDropdown();
            }}>
            Eventos
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          {eventosDropdownVisible && (
            <div className="absolute right-0 z-30 mt-2 h-35 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 text-base uppercase text-black focus:outline-none">
              <a href="/web/dojocon" className="block px-4 py-2 text-base">Dojo Con</a>
              <a href="/web/codercamp" className="block px-4 py-2 text-base">Coder Camp</a>
              {/* <a href="/web/dojocare" className="block px-3 py-2 text-xs">Dojo Care</a> */}
            </div>
          )}
        </div>
        {
          user ? (
            <li
              className="text-bold cursor-pointer"
              onClick={() => {
                setUserDropdownVisible(!userDropdownVisible)
                closeEventsDropdown()
              }}
            >
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
              <div
                className={`absolute z-10 mt-2 ${userDropdownVisible
                  ? "opacity-100"
                  : "invisible -translate-y-full opacity-0"
                  } -translate-x-1/4 transform px-4 py-2 transition-all duration-300`}
              >
                <UserDropDown logout={logout} />
              </div>
            </li>
          ) : (
            <LoginButton isLoading={isLoading} />
          )
        }
         <li>
          <ThemeToggle visible={!landing} />
        </li>
      </ul >
    );
  }

  return <MobileNavBar landing={landing} />;
}


export default NavBar;
