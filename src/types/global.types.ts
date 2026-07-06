export enum Nav {
  aboutme = "aboutme",
  experience = "experience",
  projects = "projects",
  knowledge = "knowledge",
}

export enum Info {
  facebook = "facebook",
  instagram = "instagram",
  twitter = "twitter",
  x = "x",
  github = "github",
  pdf = "pdf",
  pdf2 = "pdf2",
  linkedin = "linkedin",
}

export type GeneralLinkAttribute = {
  href: string;
  iconName?: string;
  style?: string;
  label?: string | null;
};

export interface NavDicInterface {
  [Nav.aboutme]: GeneralLinkAttribute;
  [Nav.experience]: GeneralLinkAttribute;
  [Nav.projects]: GeneralLinkAttribute;
  [Nav.knowledge]: GeneralLinkAttribute;
}
export interface SocialsInterface {
  social: Info;
  className?: string;
}

export interface SocialDicInterface {
  [Info.facebook]: GeneralLinkAttribute;
  [Info.instagram]: GeneralLinkAttribute;
  [Info.twitter]: GeneralLinkAttribute;
  [Info.x]: GeneralLinkAttribute;
  [Info.github]: GeneralLinkAttribute;
  [Info.pdf]: GeneralLinkAttribute;
  [Info.pdf2]: GeneralLinkAttribute;
  [Info.linkedin]: GeneralLinkAttribute;
}

export type svgProps = {
  className?: string;
  class?: string;
  props?: {};
};


//Knowledges

export enum Knowledge {
  PL = "PL",
  SGBD = "SGBD",
  FW = "FW",
  AI = "AI",
}

export type KnowData = {
  name: string;
  src: string;
  show: boolean;
  // Invertir el icono en dark mode (para logos monocromos negros).
  invert?: boolean;
};

export type KnowAttribute = {
  title: string;
  data: KnowData[];
};
export interface KnowDicInterface {
  [Knowledge.PL]: KnowAttribute;
  [Knowledge.SGBD]: KnowAttribute;
  [Knowledge.FW]: KnowAttribute;
  [Knowledge.AI]: KnowAttribute;
}
export interface KnowInterface {
  section: Knowledge;
}