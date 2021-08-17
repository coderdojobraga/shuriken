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
  <footer className="bg-primary text-white py-8">
    <div className="container mx-auto flex flex-col items-center">
      <ul className="flex flex-row items-center divide-x divide-black">
        <li className="cursor-pointer px-4 hover:text-purple-700">Currículo</li>
        <li className="cursor-pointer px-4 hover:text-purple-700">Projetos</li>
        <li className="cursor-pointer px-4 hover:text-purple-700">Equipa</li>
        <li className="cursor-pointer px-4 hover:text-purple-700">Sessões</li>
      </ul>
      <div className="flex flex-row items-center gap-12 m-5">
        {social.map(({ key, base_url, username }) => (
          <a
            key={key}
            href={`${base_url}/${username}`}
            className="text-2xl hover:text-purple-700"
            target="_blank"
            rel="noreferrer"
          >
            {ICONS[key]}
          </a>
        ))}
      </div>
      <p className="m-5">&copy; 2021 CoderDojo Braga.</p>
    </div>
  </footer>
);

export default Footer;
