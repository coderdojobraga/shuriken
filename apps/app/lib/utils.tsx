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

export function getImg(skill: string) {
  switch (skill) {
    case "Python":
      return (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
          height="25"
          width="25"
          alt="Python Logo"
        />
      );
    case "Scratch":
      return <SiScratch style={{ fontSize: "25px" }} />;
    case "HTML/CSS/Javascript":
      return (
        <div style={{ display: "flex" }}>
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg"
            title="HTML"
            alt="HTML"
            width="25"
            height="25"
          />
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg"
            title="CSS"
            alt="CSS"
            width="25"
            height="25"
          />
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
            title="JavaScript"
            alt="JavaScript"
            width="25"
            height="25"
          />
        </div>
      );
  }
}
