import {
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

import social from "~/data/social.json";

const ICONS = {
  facebook: <FacebookOutlined />,
  instagram: <InstagramOutlined />,
  twitter: <TwitterOutlined />,
  github: <GithubOutlined />,
};

const Footer = () => (
  <footer className="bg-dark text-white">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 items-center mx-12">
        <div className="flex flex-row justify-center order-last md:justify-start md:order-first">
          <p>&copy; 2021 CoderDojo Braga.</p>
        </div>
        <div className="flex flex-row justify-center items-center gap-12 m-5">
          {social.map(({ key, base_url, username }) => (
            <a
              key={key}
              href={`${base_url}/${username}`}
              className="text-lg hover:text-primary"
              target="_blank"
              rel="noreferrer"
            >
              {ICONS[key]}
            </a>
          ))}
        </div>
        <div className="flex flex-row justify-center order-first md:justify-end md:order-last">
          <a className="hover:text-primary" href="/terms-of-service.pdf">
            Termos de Serviço
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
