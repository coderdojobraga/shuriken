import { Grid } from "antd";
import MobileNavBar from "./MobileNavBar";
import AuthMenu from "./AuthMenu";
import DarkModeToggle from "../../../components/DarkModeToggle";

const { useBreakpoint } = Grid;

const Entry = ({ name }) => (
  <li className="cursor-pointer dark:text-white dark:hover:text-primary hover:text-primary">
    {name}
  </li>
);

function NavBar({ landing }) {
  const screens = useBreakpoint();

  if (screens.md) {
    return (
      <ul className="flex items-center gap-12 text-black text-sm uppercase">
        <Entry name="Currículo" />
        <Entry name="Projetos" />
        <Entry name="Equipa" />
        <AuthMenu />
        <li>
          <DarkModeToggle visible={!landing} />
        </li>
      </ul>
    );
  }

  return <MobileNavBar />;
}

export default NavBar;
