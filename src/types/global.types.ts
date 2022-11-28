export enum Nav {
    aboutme = "aboutme",
    skills = "skills",
    projects = "projects",
    knowledge = "knowledge",
  }

export type GeneralLinkAttribute = {
    href: string;
    //icon: React.ReactElement;
    style?: string;
    label?: string | null;
  };

export interface NavDicInterface {
    [Nav.aboutme]: GeneralLinkAttribute;
    [Nav.skills]: GeneralLinkAttribute;
    [Nav.projects]: GeneralLinkAttribute;
    [Nav.knowledge]: GeneralLinkAttribute;
  }