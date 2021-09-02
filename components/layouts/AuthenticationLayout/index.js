import { Layout } from "antd";
import Koi from "~/components/Koi";

import styles from "./style.module.css";

const { Content } = Layout;

function AuthenticationLayout({ children }) {
  return (
    <Layout>
      <Content className={styles.content}>
        <Koi />
        <div className={styles.main}>
          <img
            className={styles.logo}
            src="/img/logo.svg"
            alt="Logo of CoderDojo Braga"
          />
          <div className={styles.form}>{children}</div>
        </div>
      </Content>
    </Layout>
  );
}

export default AuthenticationLayout;
