import Image from "next/image";
import Link from "next/link";
import { NavBar } from "@landing";
import { useTheme } from "../../components/Theme";

function Header() {
  const { isDark } = useTheme();
  return (
    <section className={isDark ? "dark" : "light"}>
      <div className="dark:bg-dark">
        <header className="container mx-auto">
          <nav className="flex flex-row justify-between items-center mx-2 lg:mx-12 xl:mx-20 pb-3 pt-7">
            <div className="py-2">
              <Link href="/">
                <Image
                  width={199}
                  height={58}
                  className="cursor-pointer"
                  src={`/img/logo-lettering-${isDark ? "light" : "dark"}.svg`}
                  alt="CoderDojo Braga Logo"
                />
              </Link>
            </div>
            <NavBar />
          </nav>
        </header>
      </div>
    </section>
  );
}

export default Header;
