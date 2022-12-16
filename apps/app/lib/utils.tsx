import {
  SiPython,
  SiScratch,
  SiCodewars,
  SiGithub,
  SiGitlab,
  SiTrello,
  SiDiscord,
  SiSlack,
} from "react-icons/si";

export function getIcon(skill: string) {
  if (skill.startsWith("Python")) {
    return <SiPython />;
  } else if (skill.startsWith("Scratch")) {
    return <SiScratch />;
  }

  switch (skill) {
    case "Scratch":
      return <SiScratch />;
    case "Codewars":
      return <SiCodewars />;
    case "GitHub":
      return <SiGithub />;
    case "GitLab":
      return <SiGitlab />;
    case "Trello":
      return <SiTrello />;
    case "Discord":
      return <SiDiscord />;
    case "Slack":
      return <SiSlack />;
  }
}
