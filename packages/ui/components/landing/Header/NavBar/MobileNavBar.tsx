import { useState } from "react";
import { useRouter } from "next/router";
import { Dropdown, Menu } from "antd";
import {
  BookOutlined,
  CloseOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  SettingOutlined,
  SnippetsOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useAuth } from "@coderdojobraga/ui";

const pages = {
  landing: [
    { key: "#", text: "Currículo", icon: <BookOutlined /> },
    { key: "#", text: "Equipa", icon: <TeamOutlined /> },
    { key: "#", text: "Projetos", icon: <SnippetsOutlined /> },
  ],
  authenticated: [
    { key: "/", text: "Página Principal", icon: <HomeOutlined /> },
    { key: "/settings", text: "Configurações", icon: <SettingOutlined /> },
  ],
};

function MobileNavBar() {
  const [isOpen, setOpenStatus] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const Items = () => {
    const navigateToPage = ({ key }: { key: string }) => {
      if (key == "logout") return;
      router.push(key);
    };

    return (
      <Menu onClick={navigateToPage}>
        {pages.landing.map(({ text, ...props }) => (
          <Menu.Item {...props}>{text}</Menu.Item>
        ))}

        {user && <Menu.Divider />}

        {user &&
          pages.authenticated.map(({ text, ...props }) => (
            <Menu.Item {...props}>{text}</Menu.Item>
          ))}

        <Menu.Divider />

        {user ? (
          <Menu.Item key="logout" onClick={logout} icon={<LogoutOutlined />}>
            Sair
          </Menu.Item>
        ) : (
          <Menu.Item key="/dashboard/loginn" icon={<LoginOutlined />}>
            Login
          </Menu.Item>
        )}
      </Menu>
    );
  };

  return (
    <Dropdown
      overlay={Items}
      trigger={["hover", "click"]}
      placement="bottomRight"
      onVisibleChange={(visible) => setOpenStatus(visible)}
    >
      <div>
        <button
          type="button"
          className="bg-primary inline-flex transform items-center justify-center rounded-md p-2 text-xl text-white duration-300 hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
        >
          {isOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>
    </Dropdown>
  );
}

export default MobileNavBar;
