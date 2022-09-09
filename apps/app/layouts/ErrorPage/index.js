import { useRouter } from "next/router";
import { Button, Result } from "antd";

import styles from "./style.module.css";

function DefaultActions() {
  const router = useRouter();

  return (
    <>
      <Button onClick={() => router.back()} key="back">
        Voltar
      </Button>
      <Button
        onClick={() => router.push("/")}
        key="home"
        type="primary"
      >
        Página Inicial
      </Button>
    </>
  );
}

export default function ErrorPage({
  status,
  title,
  subTitle = null,
  actions = <DefaultActions />,
}) {
  const subtitle = subTitle || `Erro ${status}`;

  return (
    <div className={styles.content}>
      <Result
        status={status}
        title={title}
        subTitle={subtitle}
        extra={actions}
      />
    </div>
  );
}
