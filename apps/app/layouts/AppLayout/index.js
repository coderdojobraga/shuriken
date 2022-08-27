import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout } from "antd";
import { useEffect, useState } from "react";
import AppMenu from "~/components/AppMenu";

import styles from "./style.module.css";

const { Content, Sider } = Layout;

function AppLayout({ children, hidePrimaryMenu = false }) {
  const [isMobile, setMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [collapsed, setCollapsed] = useState();

  const setUpViewport = () => {
    if (window.innerWidth < 576) setMobile(true);
    else if (window.innerWidth >= 576) {
      setMobile(false);
      setDrawerVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", setUpViewport);
    // check if viewport is mobile on first load
    setUpViewport();
  }, []);

  const ResponsiveSider = ({ children }) => {
    if (isMobile) {
      setCollapsed(false);
      return (
        <Drawer
          visible={drawerVisible}
          placement="left"
          bodyStyle={{ padding: 0 }}
          onClose={() => setDrawerVisible(false)}
        >
          {children}
        </Drawer>
      );
    }
    return (
      <Sider breakpoint="xl" width={256} onCollapse={setCollapsed}>
        {children}
      </Sider>
    );
  };

  return (
    <Layout hasSider={true}>
      {isMobile && (
        <Button
          size="large"
          type="link"
          icon={<MenuOutlined />}
          className={styles.button}
          onClick={() => setDrawerVisible(true)}
        />
      )}
      <ResponsiveSider hidePrimaryMenu={hidePrimaryMenu}>
        <AppMenu collapsed={collapsed} hidePrimaryMenu={hidePrimaryMenu} />
      </ResponsiveSider>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
}

export default AppLayout;
