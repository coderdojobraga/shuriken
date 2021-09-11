import { Avatar, Image, Menu, Space, Typography } from "antd";
import {
  CalendarOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import LinkTo from "~/components/utils/LinkTo";
import { useAuth } from "~/components/Auth";
import * as USER from "~/lib/user";

import styles from "./style.module.css";

export const navbar = [
  {
    icon: <CalendarOutlined />,
    title: "Events",
    slug: "/events",
    protected: true,
  },
  {
    icon: <TrophyOutlined />,
    title: "Badges",
    slug: "/badges",
    protected: true,
  },
];

const getUserProfileUrl = (user) => {
  switch (user.role) {
    case USER.ROLES.GUARDIAN:
      return `/guardian/${user.guardian_id}`;
    case USER.ROLES.MENTOR:
      return `/mentor/${user.mentor_id}`;
    case USER.ROLES.NINJA:
      return `/ninja/${user.ninja_id}`;
  }
};

function Navbar({ selected }) {
  const { user, logout } = useAuth();

  return (
    <Menu selectedKeys={[selected]} mode="horizontal">
      <LinkTo href="/">
        <Image
          className={styles.logo}
          preview={false}
          height={60}
          src="/lettering.png"
        />
      </LinkTo>
      {navbar
        .filter((item) => user && item.protected)
        .map(({ slug, icon, title }) => (
          <Menu.Item key={slug} icon={icon}>
            <LinkTo href={`${slug}`}>{title}</LinkTo>
          </Menu.Item>
        ))}
      {user ? (
        <Menu.SubMenu
          className={styles.avatar}
          key="profile"
          title={
            <LinkTo href={getUserProfileUrl(user)}>
              <Space>
                <Avatar src={user?.photo} icon={<UserOutlined />} />
                <Typography.Text>{`${user.first_name} ${user.last_name}`}</Typography.Text>
              </Space>
            </LinkTo>
          }
        >
          <Menu.Item key="logout" onClick={logout}>
            Logout
          </Menu.Item>
        </Menu.SubMenu>
      ) : null}
    </Menu>
  );
}

export default Navbar;
