import type { AppProps } from "next/app";
import Head from "next/head";
import { ConfigProvider } from "antd";
import ptPT from "antd/lib/locale/pt_PT";
import { AuthProvider, ThemeProvider } from "@coderdojobraga/ui";

import "~/styles/globals.css";

function Shuriken({ Component, pageProps }: AppProps) {
  const typeTemplate = "Não é um ${type} válido";
  const validateMessages = {
    // You can use '${name}' in these string to replace with the field name
    default: "Erro de validação",
    required: "Este campo é obrigatório",
    enum: "Tem de pertencer a [${enum}]",
    whitespace: "Não pode estar vazio",
    date: {
      format: "O formato não é válido",
      parse: "O formato não foi reconhecido",
      invalid: "A data é inválida",
    },
    types: {
      string: typeTemplate,
      method: typeTemplate,
      array: typeTemplate,
      object: typeTemplate,
      number: typeTemplate,
      date: typeTemplate,
      boolean: typeTemplate,
      integer: typeTemplate,
      float: typeTemplate,
      regexp: typeTemplate,
      email: typeTemplate,
      url: typeTemplate,
      hex: typeTemplate,
    },
    string: {
      len: "Tem de ter exatamente ${len} carateres",
      min: "Tem de ter pelo menos ${min} caratares",
      max: "Não pode ter mais de ${max} carateres",
      range: "Tem de ter entre ${min} e ${max} carateres",
    },
    number: {
      len: "Tem de ser igual a ${len}",
      min: "Não pode ser inferior a ${min}",
      max: "Não pode ser superior a ${max}",
      range: "Tem de estar entre ${min} e ${max}",
    },
    array: {
      len: "Tem de ter exatamente ${len} elementos de comprimento",
      min: "Tão pode ter menos de ${min} elementos de comprimento",
      max: "Não pode ter mais de ${max} elementos de comprimento",
      range: "Tem de ter entre ${min} e ${max} elementos de comprimento",
    },
    pattern: {
      mismatch: "Não respeita o padrão ${pattern}",
    },
  };

  return (
    <ThemeProvider>
      <ConfigProvider form={{ validateMessages }} locale={ptPT}>
        <AuthProvider>
          <Head>
            <title>CoderDojo Braga</title>
          </Head>
          <Component {...pageProps} />
        </AuthProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default Shuriken;
