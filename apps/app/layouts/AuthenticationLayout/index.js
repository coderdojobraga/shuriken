import Link from "next/link";

import { Layout } from "antd";

import styles from "./style.module.css";

const { Content } = Layout;

function AuthenticationLayout({ children }) {
  return (
    <Layout>
      <Content className={styles.content}>
        <div className={styles.main}>
          {/* eslint-disable @next/next/no-img-element */}
          <Link href="/web">
            <img
              className={`${styles.logo} cursor-pointer`}
              src="/img/logo.svg"
              alt="Logo of CoderDojo Braga"
            />
          </Link>
          <div className={styles.form}>{children}</div>
        </div>
      </Content>
    </Layout>
  );
}

export default AuthenticationLayout;
