import { Grid } from "antd";
import MobileNavBar from "./MobileNavBar";
import AuthMenu from "./AuthMenu";

const { useBreakpoint } = Grid;

function NavBar() {
  const screens = useBreakpoint();

  if (screens.md) {
    return (
      <ul className="flex items-center gap-12 text-black text-sm uppercase">
        <li className="cursor-pointer hover:text-primary">Currículo</li>
        <li className="cursor-pointer hover:text-primary">Projetos</li>
        <li className="cursor-pointer hover:text-primary">Equipa</li>
        <AuthMenu />
      </ul>
    );
  }

  return <MobileNavBar />;
}

export default NavBar;
