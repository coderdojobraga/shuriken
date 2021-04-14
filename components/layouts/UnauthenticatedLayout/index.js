import React from "react";
import { Layout } from "antd";

import styles from "./style.module.css";

function UnauthenticatedLayout({ children }) {
  const { Content } = Layout;
  return (
    <Layout>
      <Content className={styles.content}>
        <div className={styles.main}>
          <img
            className={styles.logo}
            src="/img/logo.svg"
            alt="CoderDojo Logo"
          />
          <div className={styles.form}>{children}</div>
        </div>
      </Content>
    </Layout>
  );
}

export default UnauthenticatedLayout;
