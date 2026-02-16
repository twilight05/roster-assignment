export interface NavChild {
  label: string;
  href: string;
  icon: string;
}

export interface NavItem {
  label: string;
  icon: string;
  href?: string;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  { label: "Startpagina", icon: "/assets/Startpagina.svg", href: "/" },
  {
    label: "Rooster",
    icon: "/assets/Rooster.svg",
    children: [
      {
        label: "Mijn Rooster",
        href: "/mijn-rooster",
        icon: "/assets/Mijn.svg",
      },
      { label: "Planner", href: "/planner", icon: "/assets/Planner.svg" },
      {
        label: "Instellingen",
        href: "/instellingen",
        icon: "/assets/Planner.svg",
      },
    ],
  },
  {
    label: "My to do Protocols",
    icon: "/assets/Planner.svg",
    href: "/protocols",
  },
  {
    label: "Document Management",
    icon: "/assets/document.svg",
    href: "/documents",
  },
  {
    label: "Department News",
    icon: "/assets/department.svg",
    href: "/department-news",
  },
  {
    label: "Knowledge Base",
    icon: "/assets/knowledge.svg",
    href: "/knowledge-base",
  },
  {
    label: "General News",
    icon: "/assets/generalnews.svg",
    href: "/general-news",
  },
];
