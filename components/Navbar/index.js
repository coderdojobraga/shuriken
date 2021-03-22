import { Avatar, Image, Menu, Typography, Space } from "antd";
import {
  CalendarOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import LinkTo from "../utils/LinkTo";
import { useAuth } from "../Auth";

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

function Navbar({ selected }) {
  const { user } = useAuth();

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
          title={
            <LinkTo href="/profile">
              <Space>
                <Avatar src={user?.photo} icon={<UserOutlined />} />
                <Typography.Text>{`${user.first_name} ${user.last_name}`}</Typography.Text>
              </Space>
            </LinkTo>
          }
        >
          <Menu.Item>
            <LinkTo href="/api/auth/logout">logout</LinkTo>
          </Menu.Item>
        </Menu.SubMenu>
      ) : null}
    </Menu>
  );
}

export default Navbar;
