import { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  CalendarOutlined,
  FileOutlined,
  StarOutlined,
} from "@ant-design/icons";

import styles from "./style.module.css";

const { SubMenu } = Menu;

function AppMenu() {
  // These states and handlers are needed in order to sync both menus.
  // Without this, each menu would behave independently
  const [primarySelectedKeys, setPrimarySelectedKeys] = useState(["main"]);
  const [secondarySelectedKeys, setSecondarySelectedKeys] = useState([]);
  const handleClickPrimary = ({ key }) => {
    setPrimarySelectedKeys([key]);
    setSecondarySelectedKeys([]);
  };
  const handleClickSecondary = ({ key }) => {
    setPrimarySelectedKeys([]);
    setSecondarySelectedKeys([key]);
  };

  return (
    <div className={styles.menu}>
      <Menu
        onClick={handleClickPrimary}
        mode="inline"
        selectedKeys={primarySelectedKeys}
        className={styles.primary}
      >
        <Menu.Item key="main" icon={<HomeOutlined />}>
          Painel Principal
        </Menu.Item>
        <SubMenu key="users" icon={<UserOutlined />} title="Utilizadores">
          <Menu.Item key="ninjas">Ninjas</Menu.Item>
          <Menu.Item key="mentors">Mentores</Menu.Item>
          <Menu.Item key="guardians">Guardiões</Menu.Item>
        </SubMenu>
        <Menu.Item key="events" icon={<CalendarOutlined />}>
          Eventos
        </Menu.Item>
        <Menu.Item key="files" icon={<FileOutlined />}>
          Ficheiros
        </Menu.Item>
        <Menu.Item key="badges" icon={<StarOutlined />}>
          Crachás
        </Menu.Item>
      </Menu>
      <Menu
        onClick={handleClickSecondary}
        mode="inline"
        selectedKeys={secondarySelectedKeys}
        className={styles.secondary}
      >
        <Menu.Item key="config" icon={<SettingOutlined />}>
          Configurações
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Sair
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default AppMenu;
