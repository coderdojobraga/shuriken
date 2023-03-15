import Image from "next/image";
import Link from "next/link";

import { useTheme } from "@coderdojobraga/ui";
import NavBar from "../Header/NavBar/NavBar";

interface Props {
  landing?: boolean;
}

export function Header({ landing = false }: Props) {
  const { isDark } = useTheme();

  return (
    <section className={isDark && !landing ? "dark" : "light"}>
      <div className="dark:bg-dark">
        <header className="container mx-auto">
          <nav className="mx-2 flex flex-row items-center justify-between pb-3 pt-7 lg:mx-12 xl:mx-20">
            <div className="cursor-pointer py-2">
              <Link href="/web">
                <Image
                  layout="fixed"
                  width={208}
                  height={65}
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
