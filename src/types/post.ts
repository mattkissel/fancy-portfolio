export type Post = {
  title: string;
  date: string;        // "YYYY-MM-DD"
  url: string;
  summary: string;
  tags: string[];
  tech: string[] | null;
  github: string | null;
  links: {label:string, url: string}[] | null;
  content: string;
};