import { useState } from "react";
import Image from "next/image";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useAuth } from "~/components/Auth";
import Link from "next/link";
import { useTheme } from "../../components/Theme";
import DarkModeToggle from "../../components/DarkModeToggle";

function Header({ landing = false }) {
  const { user } = useAuth();
  const [isDrawerVisible, setVisibleDrawer] = useState(false);
  const { isDark } = useTheme();
  return (
    <section className={isDark && !landing ? "dark" : "light"}>
      <div className="dark:bg-dark">
        <header className="container mx-auto">
          <nav className="flex flex-row justify-between items-center mx-2 lg:mx-12 xl:mx-20 pb-3 pt-7">
            <div className="py-2">
              <Image
                layout="fixed"
                width={208}
                height={65}
                src={`/img/logo-lettering-${isDark ? "light" : "dark"}.svg`}
                alt="CoderDojo Braga Logo"
              />
            </div>
            <ul className="hidden md:flex items-center gap-12 text-black text-sm uppercase">
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
                <li className="text-bold">
                  Hello, {user.first_name} {user.last_name}
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
                closable={false}
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
                  <li className="cursor-pointer hover:text-primary">Equipa</li>
                  <li className="cursor-pointer hover:text-primary">
                    <Link href="/blog"> Blog </Link>
                  </li>
                </ul>
              </Drawer>
            </div>
          </nav>
        </header>
      </div>
    </section>
  );
}

export default Header;
