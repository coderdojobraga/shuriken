import {
  SiCodewars,
  SiCss3,
  SiDiscord,
  SiGithub,
  SiGitlab,
  SiHtml5,
  SiJavascript,
  SiPython,
  SiScratch,
  SiSlack,
  SiTrello,
} from "react-icons/si";

export function getIcon(skill: string) {
  switch (skill) {
    case "Python":
      return <SiPython />;

    case "Scratch":
      return <SiScratch />;
    case "Codewars":
      return <SiCodewars />;
    case "HTML/CSS/Javascript":
      return (
        <>
          <div className="row flex">
            <SiHtml5 style={{ marginRight: "8px" }} />
            <SiCss3 style={{ marginRight: "8px" }} />
            <SiJavascript />
          </div>
        </>
      );

    case "GitHub":
      return <SiGithub />;
    case "GitLab":
      return <SiGitlab />;
    case "Discord":
      return <SiDiscord />;
    case "Slack":
      return <SiSlack />;
  }
}
