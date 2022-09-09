import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Button, Result } from "antd";
import { useAuth } from "@coderdojobraga/ui";
import { throttle } from "lodash-es";
import * as api from "bokkenjs";
import AppLayout from "~/layouts/AppLayout";

export async function getServerSideProps({ query }) {
  const { token } = query;

  if (!token) {
    return {
      props: {
        status: "info",
      },
    };
  }

  return await api
    .verify_email(token)
    .then(() => {
      return {
        props: {
          status: "success",
        },
      };
    })
    .catch((error) => {
      switch (error.status) {
        case 401:
          return {
            props: {
              status: "error",
            },
          };
        case 500:
          return {
            redirect: {
              destination: "/500",
              permanent: false,
            },
          };
        default:
          throw new Error(
            `Unknown error code ${error.status}: ${error.data.errors.detail}`
          );
      }
    });
}

const SuccessActions = () => {
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
};

const RegisterActions = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.replace("/register")} type="primary">
      Finalizar Registo
    </Button>
  );
};

const ResendEmailActions = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const ask_confirmation_email = useRef(
    throttle(
      () => {
        setLoading(true);

        api
          .resend_confirmation_email()
          .then((status) => {
            switch (status) {
              case 201:
                break;
              case 204:
                router.replace("/");
                break;
            }
          })
          .finally(() => setLoading(false));
      },
      5000,
      { trailing: false }
    )
  );

  return (
    <Button
      loading={isLoading}
      onClick={(_) => ask_confirmation_email.current()}
      type="primary"
    >
      Pedir Novamente
    </Button>
  );
};

const Confirm = ({ status }) => {
  const router = useRouter();
  const { user } = useAuth();

  const messages = {
    success: {
      subject: "Verificação bem sucedida",
      description: `Obrigado por verificares o teu email. ${
        user?.registered ? "" : "Termina o teu registo, por favor."
      }`,
      actions: user?.registered ? <SuccessActions /> : <RegisterActions />,
    },
    info: {
      subject: "Informação",
      description:
        "Antes de continuar, é necessário confirmar o teu endereço de email. Se não recebeste, podes pedir para reenviar.",
      actions: <ResendEmailActions />,
    },
    error: {
      subject: "Verificação falhou",
      description: "O link expirou. Por favor, tenta outra vez.",
      actions: <ResendEmailActions />,
    },
  };

  if (status == "info" && !user) {
    router.push("/login");
    return null;
  }

  if (status == "info" && user.verified) {
    router.push("/register");
    return null;
  }

  return (
    <AppLayout hidePrimaryMenu>
      <Result
        status={status}
        title={messages[status].subject}
        subTitle={messages[status].description}
        extra={messages[status].actions}
      />
    </AppLayout>
  );
};

export default Confirm;
