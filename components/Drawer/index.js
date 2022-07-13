import Link from "next/link";

import { AiOutlineClose } from "react-icons/ai";

import { useAuth } from "../Auth";
import { useTheme } from "../Theme";

import DarkModeToggle from "../DarkModeToggle";

export const Drawer = ({ isOpen, onClickClose, landing }) => {
  const { user } = useAuth();
  const { isDark } = useTheme();

  return (
    <div className={`${isDark && !landing ? "dark" : "light"}`}>
      <nav
        className={`py-10 bg-white dark:bg-dark h-screen flex flex-col justify-between fixed top-0 right-0 w-9/12 z-50 transition ease-in-out duration-100 transform : ;
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col">
          <button onClick={onClickClose} className="m-3 self-end">
            <AiOutlineClose size={36} color={isDark && "white"} />
          </button>

          <ul className="flex flex-col items-center text-xl gap-6 uppercase mt-2">
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
            <li>
              <DarkModeToggle visible={!landing} />
            </li>
          </ul>
        </div>

        {user ? (
          <div className="text-bold text-lg dark:text-white text-center">
            Hello, {user.first_name} {user.last_name}
          </div>
        ) : (
          <div className="mx-auto">
            <Link href="/login">
              <a className="bg-primary text-white rounded px-16 py-4 transform duration-300 uppercase hover:bg-purple-600">
                Login
              </a>
            </Link>
          </div>
        )}
      </nav>

      {/* OVERLAY */}
      <div
        onClick={onClickClose}
        className={`${
          !isOpen && "hidden"
        } bg-gray-400 dark:bg-gray-50 fixed top-0 bottom-0 right-0 left-0 z-40 opacity-80`}
      />
    </div>
  );
};
