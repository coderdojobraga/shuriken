import { useRouter } from "next/router";
import Image from "next/image";

import styles from "./style.module.css";

interface IProps {
  status: string;
  title: string;
  subtitle?: string;
  actions?: any;
}

const DefaultActions = () => {
  const router = useRouter();

  return (
    <div style={{ margin: "auto", marginTop: "20px" }}>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.button}
          onClick={() => router.back()}
          key="back"
        >
          Voltar
        </button>
        <button
          className={styles.button}
          style={{ backgroundColor: "#722ed1", color: "white" }}
          onClick={() => router.push("/")}
          key="home"
        >
          Página Inicial
        </button>
      </div>
    </div>
  );
};

const ErrorPage = ({
  status,
  title,
  subtitle = "",
  actions = <DefaultActions />,
}: IProps) => {
  return (
    <div className={styles.main}>
      <div>
        <div className={styles.logo}>
          <Image src="/img/logo.svg" width={200} height={200} />
        </div>
        <div style={{ textAlign: "center" }}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <h2 className={styles.status}>Erro {status}</h2>
        </div>
        <div>{actions}</div>
      </div>
    </div>
  );
};

export default ErrorPage;
