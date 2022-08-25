import { useState } from "react";
import Image from "next/image";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useAuth } from "~/components/Auth";
import Link from "next/link";
import { useTheme } from "../../components/Theme";
import DarkModeToggle from "../../components/DarkModeToggle";
import { useRouter } from "next/router";

function Header({ landing = false }) {
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
          <nav className="flex flex-row justify-between items-center mx-2 lg:mx-12 xl:mx-20 pb-3 pt-7">
            <div
              className="py-2 cursor-pointer"
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
            <ul className="hidden md:flex items-center gap-8 text-black text-sm uppercase">
              <li className="cursor-pointer dark:text-white hover:text-primary">
                <Link href="/curriculum">Currículo</Link>
              </li>
              <li className="cursor-pointer dark:text-white hover:text-primary">
                <Link href="/projects">Projetos</Link>
              </li>
              <li className="cursor-pointer dark:text-white hover:text-primary">
                <Link href="/team">Equipa</Link>
              </li>
              <li className="cursor-pointer dark:text-white hover:text-primary">
                <Link href="/blog"> Blog </Link>
              </li>
              {user ? (
                <li
                  className="text-bold cursor-pointer"
                  onClick={(_) => setUserDropdownVisible(!userDropdownVisible)}
                >
                  {user.photo ? (
                    /* eslint-disable @next/next/no-img-element */
                    <img
                      className="z-50"
                      src={user.photo}
                      width={50}
                      height={50}
                    />
                  ) : (
                    <div className="rounded-full border-2 border-primary relative z-50 select-none text-lg px-2 py-1">
                      {user.first_name[0] + user.last_name[0]}
                    </div>
                  )}
                  <div
                    className={`mt-2 absolute z-10 ${
                      userDropdownVisible
                        ? "opacity-100"
                        : "opacity-0 invisible -translate-y-full"
                    } -translate-x-1/4 transition-all duration-300 transform px-4 py-2`}
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
                  <a className="bg-primary text-white rounded-3xl px-4 py-2 transform duration-300 uppercase hover:bg-purple-600">
                    Login
                  </a>
                </Link>
              )}
              <li>
                <DarkModeToggle visible={!landing} />
              </li>
            </ul>
            <div className="flex md:hidden flex-1 justify-end px-2">
              {user ? (
                <>
                  <button type="button" onClick={(_) => setVisibleDrawer(true)}>
                    {user.photo ? (
                      /* eslint-disable @next/next/no-img-element */
                      <img
                        className="z-50"
                        src={user.photo}
                        width={50}
                        height={50}
                      />
                    ) : (
                      <div className="rounded-full border-2 border-primary relative z-50 select-none text-lg px-2 py-1">
                        {user.first_name[0] + user.last_name[0]}
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
                    <ul className="flex flex-col items-center text-xl gap-6 uppercase">
                      <li className="cursor-pointer hover:text-primary">
                        Currículo
                      </li>
                      <li className="cursor-pointer hover:text-primary">
                        Projetos
                      </li>
                      <li className="cursor-pointer hover:text-primary">
                        Equipa
                      </li>
                      <li className="cursor-pointer hover:text-primary">
                        <Link href="/blog"> Blog </Link>
                      </li>
                      <li className="cursor-pointer hover:text-primary">
                        <Link href="/dashboard"> Dashboard </Link>
                      </li>
                      <button
                        className="cursor-pointer hover:text-primary"
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
                    className="bg-primary text-white text-xl inline-flex items-center justify-center p-2 transform duration-300 rounded-md hover:text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
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
                    <ul className="flex flex-col items-center text-xl gap-6 uppercase">
                      <li className="cursor-pointer hover:text-primary">
                        Currículo
                      </li>
                      <li className="cursor-pointer hover:text-primary">
                        Projetos
                      </li>
                      <li className="cursor-pointer hover:text-primary">
                        Equipa
                      </li>
                      <li className="cursor-pointer hover:text-primary">
                        <Link href="/blog"> Blog </Link>
                      </li>
                      <Link href="/login">
                        <a className="cursor-pointer hover:text-primary">
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

export default Header;
