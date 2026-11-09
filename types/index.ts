export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tech: string[];
  github: string | null;
  demo: string | null;
  featured: boolean;
  status: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: string;
  featured?: boolean;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

export interface Profile {
  name: string;
  alias: string;
  title: string;
  headline: string;
  subtitle: string;
  bio: string;
  status: string;
  location: string;
  education?: {
    school: string;
    url: string;
    degree: string;
  };
  nostr: {
    nip05: string;
    npub: string;
    pubkeyHex?: string;
    lightningAddress: string;
  };
  links: {
    email: string;
    github: string;
    x?: string;
    linkedin?: string;
    facebook?: string;
    layers?: string;
  };
}
