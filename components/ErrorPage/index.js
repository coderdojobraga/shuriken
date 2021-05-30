import { useRouter } from "next/router";
import { Button, Result } from "antd";

import styles from "./style.module.css";

export default function ErrorPage({ status, title }) {
  const router = useRouter();

  return (
    <div className={styles.content}>
      <Result
        status={status}
        title={title}
        subTitle={`Erro ${status}`}
        extra={[
          <Button onClick={() => router.back()} key="back">
            Voltar
          </Button>,
          <Button
            onClick={() => router.push("/dashboard")}
            key="home"
            type="primary"
          >
            Página Inicial
          </Button>,
        ]}
      />
    </div>
  );
}
