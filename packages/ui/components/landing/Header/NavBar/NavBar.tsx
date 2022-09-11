import { Grid } from "antd";
import MobileNavBar from "./MobileNavBar";
import AuthMenu from "./AuthMenu";
import { ThemeToggle } from "@coderdojobraga/ui";

const { useBreakpoint } = Grid;

const Entry = ({ name }: { name: string }) => (
  <li className="dark:hover:text-primary hover:text-primary cursor-pointer dark:text-white">
    {name}
  </li>
);

function NavBar({ landing }: any) {
  const screens = useBreakpoint();

  if (screens.md) {
    return (
      <ul className="flex items-center gap-12 text-sm uppercase text-black">
        <Entry name="Currículo" />
        <Entry name="Projetos" />
        <Entry name="Equipa" />
        <AuthMenu />
        <li>
          <ThemeToggle visible={!landing} />
        </li>
      </ul>
    );
  }

  return <MobileNavBar />;
}

export default NavBar;
