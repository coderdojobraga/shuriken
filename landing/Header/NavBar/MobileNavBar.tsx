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
import { useAuth } from "~/components/Auth";

const pages = {
  landing: [
    { key: "#", text: "Currículo", icon: <BookOutlined /> },
    { key: "#", text: "Equipa", icon: <TeamOutlined /> },
    { key: "#", text: "Projetos", icon: <SnippetsOutlined /> },
  ],
  authenticated: [
    { key: "/dashboard", text: "Página Principal", icon: <HomeOutlined /> },
    { key: "/settings", text: "Configurações", icon: <SettingOutlined /> },
  ],
};

function MobileNavBar() {
  const [isOpen, setOpenStatus] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const Items = () => {
    const navigateToPage = ({ key }) => {
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
          <Menu.Item key="/login" icon={<LoginOutlined />}>
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
          className="bg-primary text-white text-xl inline-flex items-center justify-center p-2 transform duration-300 rounded-md hover:text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
        >
          {isOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>
    </Dropdown>
  );
}

export default MobileNavBar;
