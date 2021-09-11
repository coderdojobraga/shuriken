import Image from "next/image";
import Link from "next/link";
import { NavBar } from "@landing";

const Header = () => {
  return (
    <header className="container mx-auto">
      <nav className="flex flex-row justify-between items-center mx-2 lg:mx-12 xl:mx-20 py-3 mt-4">
        <div className="py-2">
          <Link href="/">
            <Image
              width={199}
              height={58}
              className="cursor-pointer"
              src="/img/logo-lettering-dark.svg"
              alt="CoderDojo Braga Logo"
            />
          </Link>
        </div>
        <NavBar />
      </nav>
    </header>
  );
};

export default Header;
