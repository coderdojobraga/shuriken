import { Layout } from "antd";
import { useRouter } from "next/router";
import Navbar from "../Navbar";

import styles from "./style.module.css";

const { Header, Content, Footer } = Layout;

function BaseLayout({ children }) {
  const router = useRouter();

  const { route } = router;

  return (
    <Layout>
      <Header className={styles.navbar}>
        <Navbar selected={route} />
      </Header>
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer}>
        CoderDojo Braga &copy; {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default BaseLayout;
