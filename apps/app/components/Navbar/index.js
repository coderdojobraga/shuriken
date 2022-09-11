import Link from "next/link";
import { Avatar, Image, Menu, Space, Typography } from "antd";
import {
  CalendarOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth } from "@coderdojobraga/ui";

import styles from "./style.module.css";
import { EUser } from "bokkenjs";

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
    case EUser.Guardian:
      return `/guardian/${user.guardian_id}`;
    case EUser.Mentor:
      return `/mentor/${user.mentor_id}`;
    case EUser.Ninja:
      return `/ninja/${user.ninja_id}`;
  }
};

function Navbar({ selected }) {
  const { user, logout } = useAuth();

  return (
    <Menu selectedKeys={[selected]} mode="horizontal">
      <Link href="/">
        <Image
          className={styles.logo}
          preview={false}
          height={60}
          src="/lettering.png"
          alt="CoderDojo Braga"
        />
      </Link>
      {navbar
        .filter((item) => user && item.protected)
        .map(({ slug, icon, title }) => (
          <Menu.Item key={slug} icon={icon}>
            <Link href={`${slug}`}>{title}</Link>
          </Menu.Item>
        ))}
      {user ? (
        <Menu.SubMenu
          className={styles.avatar}
          key="profile"
          title={
            <Link href={getUserProfileUrl(user)}>
              <Space>
                <Avatar src={user?.photo} icon={<UserOutlined />} />
                <Typography.Text>{`${user.first_name} ${user.last_name}`}</Typography.Text>
              </Space>
            </Link>
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
