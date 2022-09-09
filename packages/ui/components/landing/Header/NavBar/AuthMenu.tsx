import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar, Dropdown, Menu, Space } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useAuth } from "@coderdojobraga/ui";

const LoginButton = () => (
  <Link href="/login">
    <button
      type="button"
      className="bg-primary transform rounded-3xl px-4 py-2 uppercase text-white duration-300 hover:bg-purple-600 hover:text-white"
    >
      Login
    </button>
  </Link>
);

const AuthMenu = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) return <LoginButton />;

  const Items = () => {
    const navigateToPage = ({ key }: any) => {
      if (key == "logout") return;
      router.push(key);
    };

    const entries = [
      { key: "/", text: "Página Principal", icon: <HomeOutlined /> },
      { key: "/settings", text: "Configurações", icon: <SettingOutlined /> },
    ];

    return (
      <Menu onClick={navigateToPage}>
        {entries.map(({ text, ...props }) => (
          <Menu.Item {...props}>{text}</Menu.Item>
        ))}
        <Menu.Divider />
        <Menu.Item key="logout" onClick={logout} icon={<LogoutOutlined />}>
          Sair
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <Dropdown overlay={Items}>
      <Space align="center">
        <Avatar src={user.photo} />
        {`${user.first_name} ${user.last_name}`}
      </Space>
    </Dropdown>
  );
};

export default AuthMenu;
