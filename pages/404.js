import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Layout, Result } from "antd";

import styles from "~/styles/404.module.css";

const { Content } = Layout;

export default function NotFound() {
  const router = useRouter();

  return (
    <Layout>
      <Content className={styles.content}>
        <Result
          status="404"
          title="Ups! Esta página não existe."
          icon={
            <Image
              width={500}
              height={500}
              layout="fixed"
              src="/img/ninjas/white.png"
            />
          }
          subTitle="Erro 404"
          extra={
            <Button onClick={() => router.back()} type="primary">
              Voltar
            </Button>
          }
        />
      </Content>
    </Layout>
  );
}
