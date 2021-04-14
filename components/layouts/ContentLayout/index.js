import { Layout } from "antd";
import { useRouter } from "next/router";
import Navbar from "~/components/Navbar";

import styles from "./style.module.css";

const { Header, Content, Footer } = Layout;

function ContentLayout({ children }) {
  const router = useRouter();

  const { route } = router;

  return (
    <Layout>
      <Header className={styles.navbar}>
        <Navbar selected={route} />
      </Header>
      <Content className={styles.content}>
        <div className={styles.main}>{children}</div>
      </Content>
      <Footer className={styles.footer}>
        CoderDojo Braga &copy; {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default ContentLayout;
