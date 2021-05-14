import { useState } from "react";
import { Menu, Avatar, Typography } from "antd";
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
import Image from "next/image";

const { SubMenu, Item } = Menu;
const { Text, Title } = Typography;

function AppMenu({ hidePrimaryMenu, avatarSrc, name, type }) {
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
        <div className={styles.logo}>
          <Image
            src={"/img/logo-lettering.png"}
            alt="Logótipo CoderDojo"
            width={200}
            height={58}
          />
        </div>
        {!hidePrimaryMenu && (
          <>
            <div className={styles.user}>
              <Avatar
                src={avatarSrc}
                size="large"
                alt="Avatar"
                icon={<UserOutlined />}
                className={styles.avatar}
              />
              <Title level={5}>{name}</Title>
              <Text type="secondary">{type}</Text>
            </div>
            <Item key="main" icon={<HomeOutlined />}>
              Painel Principal
            </Item>
            {type === "champion" && (
              <SubMenu key="users" icon={<UserOutlined />} title="Utilizadores">
                <Item key="ninjas">Ninjas</Item>
                <Item key="mentors">Mentores</Item>
                <Item key="guardians">Guardiões</Item>
              </SubMenu>
            )}
            <Item key="events" icon={<CalendarOutlined />}>
              Eventos
            </Item>
            <Item key="files" icon={<FileOutlined />}>
              Ficheiros
            </Item>
            {type === "ninja" && (
              <Item key="badges" icon={<StarOutlined />}>
                Crachás
              </Item>
            )}
          </>
        )}
      </Menu>
      <Menu
        onClick={handleClickSecondary}
        mode="inline"
        selectedKeys={secondarySelectedKeys}
        className={styles.secondary}
      >
        <Item key="config" icon={<SettingOutlined />}>
          Configurações
        </Item>
        <Item key="logout" icon={<LogoutOutlined />}>
          Sair
        </Item>
      </Menu>
    </div>
  );
}

export default AppMenu;
