export const DEFAULT_MENU_ENTRIES = {
  LANDING: [
    { path: "/curriculum", text: "Currículo" },
    //   { path: "/projects", text: "Projetos" },
    { path: "/team", text: "Equipa" },
    { path: "/blog", text: "Blog" },
  ],
  BLOG: [
    { path: `${process.env.BASE_URL}/curriculum`, text: "Currículo" },
    //   { path: "/projects", text: "Projetos" },
    { path: `${process.env.BASE_URL}/team`, text: "Equipa" },
    { path: "/", text: "Blog" },
  ],
};
