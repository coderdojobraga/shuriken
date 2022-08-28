import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAuth, useTheme, ThemeToggle } from "@coderdojobraga/ui";
import { DEFAULT_MENU_ENTRIES } from "./config";
import { getUserInitials } from "./utils";

interface Props {
  landing?: boolean;
}

export function Header({ landing = false }: Props) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isDrawerVisible, setVisibleDrawer] = useState(false);
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);
  const { isDark } = useTheme();

  const onDrawerLogOut = () => {
    logout();
    setVisibleDrawer(false);
  };

  return (
    <section className={isDark && !landing ? "dark" : "light"}>
      <div className="dark:bg-dark">
        <header className="container mx-auto">
          <nav className="mx-2 flex flex-row items-center justify-between pb-3 pt-7 lg:mx-12 xl:mx-20">
            <div
              className="cursor-pointer py-2"
              onClick={(_) => router.push("/")}
            >
              <Image
                layout="fixed"
                width={208}
                height={65}
                src={`/img/logo-lettering-${isDark ? "light" : "dark"}.svg`}
                alt="CoderDojo Braga Logo"
              />
            </div>
            <ul className="hidden items-center gap-8 text-sm uppercase text-black md:flex">
              {DEFAULT_MENU_ENTRIES.map(({ path, text }) => (
                <li className="hover:text-primary cursor-pointer dark:text-white">
                  <Link href={path}>{text}</Link>
                </li>
              ))}
              {user ? (
                <li
                  className="text-bold cursor-pointer"
                  onClick={(_) => setUserDropdownVisible(!userDropdownVisible)}
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
                    className={`absolute z-10 mt-2 ${
                      userDropdownVisible
                        ? "opacity-100"
                        : "invisible -translate-y-full opacity-0"
                    } -translate-x-1/4 transform px-4 py-2 transition-all duration-300`}
                  >
                    <ul>
                      <li>
                        <Link href="/dashboard">Dashboard</Link>
                      </li>
                      <li>
                        <button
                          className="hover:text-primary mt-2"
                          onClick={logout}
                        >
                          LOG OUT
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <Link href="/login">
                  <a className="bg-primary transform rounded-3xl px-4 py-2 uppercase text-white duration-300 hover:bg-purple-600">
                    Login
                  </a>
                </Link>
              )}
              <li>
                <ThemeToggle visible={!landing} />
              </li>
            </ul>
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
                  <Drawer
                    className="flex md:hidden"
                    placement="right"
                    onClose={() => setVisibleDrawer(false)}
                    visible={isDrawerVisible}
                    zIndex={50}
                  >
                    <ul className="flex flex-col items-center gap-6 text-xl uppercase">
                      {DEFAULT_MENU_ENTRIES.map(({ path, text }) => (
                        <li className="hover:text-primary cursor-pointer">
                          <Link href={path}>{text}</Link>
                        </li>
                      ))}
                      <li className="hover:text-primary cursor-pointer">
                        <Link href="/dashboard">Dashboard</Link>
                      </li>
                      <button
                        className="hover:text-primary cursor-pointer"
                        onClick={(_) => onDrawerLogOut()}
                      >
                        LOG OUT
                      </button>
                    </ul>
                  </Drawer>
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
                  <Drawer
                    className="flex md:hidden"
                    placement="right"
                    onClose={() => setVisibleDrawer(false)}
                    visible={isDrawerVisible}
                    zIndex={20}
                  >
                    <ul className="flex flex-col items-center gap-6 text-xl uppercase">
                      {DEFAULT_MENU_ENTRIES.map(({ path, text }) => (
                        <li className="hover:text-primary cursor-pointer">
                          <Link href={path}>{text}</Link>
                        </li>
                      ))}
                      <Link href="/login">
                        <a className="hover:text-primary cursor-pointer">
                          LOGIN
                        </a>
                      </Link>
                    </ul>
                  </Drawer>
                </>
              )}
            </div>
          </nav>
        </header>
      </div>
    </section>
  );
}
