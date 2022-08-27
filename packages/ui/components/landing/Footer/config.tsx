import {
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { ISocialNetwork } from "./types";

export const SOCIAL_NETWORKS: ISocialNetwork[] = [
  {
    key: "facebook",
    base_url: "https://facebook.com",
    username: "coderdojobraga",
    Icon: <FacebookOutlined />,
  },
  {
    key: "instagram",
    base_url: "https://instagram.com",
    username: "coderdojobraga",
    Icon: <InstagramOutlined />,
  },
  {
    key: "twitter",
    base_url: "https://twitter.com",
    username: "coderdojobraga",
    Icon: <TwitterOutlined />,
  },
  {
    key: "github",
    base_url: "https://github.com",
    username: "coderdojobraga",
    Icon: <GithubOutlined />,
  },
];
