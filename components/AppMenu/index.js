import { useRouter } from "next/router";
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
import Image from "next/image";
import { useAuth } from "~/components/Auth";

import styles from "./style.module.css";

const { SubMenu, Item } = Menu;
const { Text, Title } = Typography;

function AppMenu({ hidePrimaryMenu, collapsed }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { pathname } = router;

  // These states and handlers are needed in order to sync both menus.
  // Without this, each menu would behave independently
  const [primarySelectedKeys, setPrimarySelectedKeys] = useState([pathname]);
  const [secondarySelectedKeys, setSecondarySelectedKeys] = useState([]);
  const handleClickPrimary = ({ key }) => {
    router.push(key);
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
        {collapsed ? (
          <div className={styles.logo_collapsed}>
            <Image
              src={"/img/logo.svg"}
              alt="Logótipo CoderDojo"
              width={200}
              height={200}
            />
          </div>
        ) : (
          <div className={styles.logo}>
            <Image
              src={"/img/logo-lettering.png"}
              alt="Logótipo CoderDojo"
              width={200}
              height={58}
            />
          </div>
        )}
        {!hidePrimaryMenu && (
          <>
            <div className={styles.user}>
              <Avatar
                src={user.photo}
                size="large"
                alt="Avatar"
                icon={<UserOutlined />}
                className={styles.avatar}
              />
              {!collapsed && (
                <Title level={5}>
                  {`${user.first_name} ${user.last_name}`}
                </Title>
              )}
              {!collapsed && <Text type="secondary">{user.role}</Text>}
            </div>
            <Item key="/dashboard" icon={<HomeOutlined />}>
              Painel Principal
            </Item>
            {user.role === "champion" && (
              <SubMenu
                key="/users"
                icon={<UserOutlined />}
                title="Utilizadores"
              >
                <Item key="/ninjas">Ninjas</Item>
                <Item key="/mentors">Mentores</Item>
                <Item key="/guardians">Guardiões</Item>
              </SubMenu>
            )}
            <Item key="/events" icon={<CalendarOutlined />}>
              Eventos
            </Item>
            <Item key="/files" icon={<FileOutlined />}>
              Ficheiros
            </Item>
            {user.role === "ninja" && (
              <Item key="/badges" icon={<StarOutlined />}>
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
        <Item key="/settings" icon={<SettingOutlined />}>
          Configurações
        </Item>
        <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
          Sair
        </Item>
      </Menu>
    </div>
  );
}

export default AppMenu;
