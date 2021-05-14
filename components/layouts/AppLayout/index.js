import { Layout } from "antd";
import AppMenu from "~/components/AppMenu";

import styles from "./style.module.css";

const { Content, Sider } = Layout;

function AppLayout({ children, hidePrimaryMenu }) {
  return (
    <Layout hasSider>
      <Sider breakpoint="lg" width="256">
        <AppMenu
          avatarSrc=""
          name="To be replaced"
          type="champion"
          hidePrimaryMenu={hidePrimaryMenu}
        />
      </Sider>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
}

export default AppLayout;
