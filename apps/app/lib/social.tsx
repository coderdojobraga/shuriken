import {
  FaDiscord,
  FaGithub,
  FaGitlab,
  FaSlack,
  FaTrello,
} from "react-icons/fa";
import { SiCodewars, SiScratch, SiSurveymonkey } from "react-icons/si";
import { AiOutlineReddit } from "react-icons/ai";

export const ICONS = {
  scratch: <SiScratch />,
  codewars: <SiCodewars />,
  github: <FaGithub />,
  gitlab: <FaGitlab />,
  trello: <FaTrello />,
  discord: <FaDiscord />,
  slack: <FaSlack />,
  lightbot: <AiOutlineReddit />,
  codemonkey: <SiSurveymonkey />,
};

export const URLS = {
  scratch: "https://scratch.mit.edu/users",
  codewars: "https://www.codewars.com/users",
  github: "https://github.com",
  gitlab: "https://gitlab.com",
  trello: "https://trello.com/u",
  discord: "https://discord.com",
  slack: "https://slack.com",
};
