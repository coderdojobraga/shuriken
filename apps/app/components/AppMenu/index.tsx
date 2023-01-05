import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Menu, Typography } from "antd";
import {
  BookOutlined,
  CalendarOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  SnippetsOutlined,
  StarOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth } from "@coderdojobraga/ui";
import { EUser, IUser } from "bokkenjs";

import styles from "./style.module.css";

const { SubMenu, Item } = Menu;
const { Text, Title } = Typography;

function AppMenu({ hidePrimaryMenu, collapsed }: any) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { asPath } = router;

  const getUserProfileUrl = (user: IUser | undefined) => {
    switch (user?.role) {
      case EUser.Guardian:
        return `guardian/${user.guardian_id}`;
      case EUser.Mentor:
        return `mentor/${user.mentor_id}`;
      case EUser.Ninja:
        return `ninja/${user.ninja_id}`;
    }

    return "/";
  };

  // These states and handlers are needed in order to sync both menus.
  // Without this, each menu would behave independently
  const [primarySelectedKeys, setPrimarySelectedKeys] = useState<string[]>([
    asPath,
  ]);
  const [secondarySelectedKeys, setSecondarySelectedKeys] = useState<string[]>(
    []
  );
  const handleClickPrimary = ({ key }: { key: string }) => {
    router.push(key);
    setPrimarySelectedKeys([key]);
    setSecondarySelectedKeys([]);
  };
  const handleClickSecondary = ({ key }: { key: string }) => {
    if (key == "logout") return;
    router.push(key);
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
        <Link href="/">
          {collapsed ? (
            <div className={styles.logo_collapsed}>
              <Image
                src="/img/logo.svg"
                alt="Logótipo CoderDojo"
                width={200}
                height={200}
              />
            </div>
          ) : (
            <div className={styles.logo}>
              <Image
                src="/img/logo-lettering-dark.svg"
                alt="Logótipo CoderDojo"
                width={199}
                height={50}
                layout="responsive"
              />
            </div>
          )}
        </Link>
        {!hidePrimaryMenu && (
          <>
            <div className={styles.user}>
              <Link href={`/profile/${getUserProfileUrl(user)}`}>
                <a>
                  <Avatar
                    src={user?.photo}
                    size="large"
                    alt="Avatar"
                    icon={<UserOutlined />}
                    className={styles.avatar}
                  />
                </a>
              </Link>
              {!collapsed && (
                <Title level={5}>
                  {`${user?.first_name} ${user?.last_name}`}
                </Title>
              )}
              {!collapsed && (
                <Text type="secondary">
                  {(user?.role === EUser.Guardian && "Guardião") || user?.role}
                </Text>
              )}
            </div>
            <Item key="/" icon={<HomeOutlined />}>
              Painel Principal
            </Item>
            {user?.role !== EUser.Organizer && (
              <Item key="/events" icon={<CalendarOutlined />}>
                Eventos
              </Item>
            )}
            {user?.role === EUser.Organizer && (
              <>
                <SubMenu
                  key="/users"
                  icon={<UserOutlined />}
                  title="Utilizadores"
                >
                  <Item key="/ninjas">Ninjas</Item>
                  <Item key="/admin/mentors">Mentores</Item>
                  <Item key="/guardians">Guardiões</Item>
                </SubMenu>
                <SubMenu icon={<CalendarOutlined />} title="Eventos">
                  <Item key="/events">Listar eventos</Item>
                  <Item key="/admin/event">Criar evento</Item>
                </SubMenu>
              </>
            )}
            <Item key="/files" icon={<SnippetsOutlined />}>
              Ficheiros
            </Item>
            {user?.role === EUser.Guardian && (
              <Item key="/ninjas" icon={<UserAddOutlined />}>
                Ninjas
              </Item>
            )}
            {user?.role === EUser.Mentor && (
              <Item
                key={`/lectures/mentor/${user.mentor_id}`}
                icon={<BookOutlined />}
              >
                Sessões
              </Item>
            )}
            {user?.role === EUser.Ninja && (
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
