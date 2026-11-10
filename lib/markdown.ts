import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import { Post, PostMeta, Project, Profile } from "@/types";

const postsDirectory = path.join(process.cwd(), "content/posts");
const postsJsonPath = path.join(process.cwd(), "data/posts.json");
const projectsJsonPath = path.join(process.cwd(), "data/projects.json");
const profileJsonPath = path.join(process.cwd(), "data/profile.json");

export function getAllPosts(): PostMeta[] {
  try {
    if (fs.existsSync(postsJsonPath)) {
      const raw = fs.readFileSync(postsJsonPath, "utf8");
      const posts: PostMeta[] = JSON.parse(raw);
      return posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  } catch (error) {
    console.error("Error reading posts.json:", error);
  }

  // Fallback to scanning content/posts directory
  try {
    if (!fs.existsSync(postsDirectory)) return [];
    const fileNames = fs.readdirSync(postsDirectory);
    const posts: PostMeta[] = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title || slug,
          excerpt: data.excerpt || "",
          date: data.date || "2026-01-01",
          tags: data.tags || [],
          readingTime: data.readingTime || "5 min read",
          featured: Boolean(data.featured),
        };
      });

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error scanning posts directory:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    // Get metadata from posts.json if available
    const allPosts = getAllPosts();
    const metaFromJson = allPosts.find((p) => p.slug === slug);

    return {
      slug,
      title: metaFromJson?.title || data.title || slug,
      excerpt: metaFromJson?.excerpt || data.excerpt || "",
      date: metaFromJson?.date || data.date || "2026-01-01",
      tags: metaFromJson?.tags || data.tags || [],
      readingTime: metaFromJson?.readingTime || data.readingTime || "5 min read",
      featured: metaFromJson?.featured ?? data.featured,
      contentHtml,
    };
  } catch (error) {
    console.error(`Error loading post by slug ${slug}:`, error);
    return null;
  }
}

export function getAllProjects(): Project[] {
  try {
    if (fs.existsSync(projectsJsonPath)) {
      const raw = fs.readFileSync(projectsJsonPath, "utf8");
      return JSON.parse(raw);
    }
  } catch (error) {
    console.error("Error reading projects.json:", error);
  }
  return [];
}

export function getFeaturedProjects(): Project[] {
  const projects = getAllProjects();
  return projects.filter((p) => p.featured);
}

export function getProfile(): Profile {
  try {
    if (fs.existsSync(profileJsonPath)) {
      const raw = fs.readFileSync(profileJsonPath, "utf8");
      return JSON.parse(raw);
    }
  } catch (error) {
    console.error("Error reading profile.json:", error);
  }

  return {
    name: "Nguyễn Hạc Phong",
    alias: "Hạc Phong (Nguyen Phong)",
    title: "Full-Stack Systems & AI Infrastructure Engineer",
    headline: "Architecting autonomous AI infrastructure & high-performance web systems.",
    subtitle: "Nguyễn Hạc Phong (Hạc Phong) • Systems Engineer specializing in Context MMU Gateways, Model Context Protocol (MCP), Chaumian eCash & Programmatic SEO.",
    bio: "Full-stack and AI infrastructure engineer building deterministic context paging gateways (Phonix G-MMU), decentralized M2M payment & trust protocols (NostrPulse MCP), and high-traffic Programmatic SEO platforms (CheckDamp UK).",
    status: "Available for engineering & research collaborations",
    location: "Ho Chi Minh City, Vietnam",
    education: {
      school: "University of Information Technology (UIT) - VNU-HCM",
      url: "https://www.uit.edu.vn",
      degree: "Computer Science / Software Engineering",
    },
    nostr: {
      nip05: "phong@hacphong.com",
      npub: "npub1p8jw2mhsel5vpcmgxu45nuwwxfwrqxv0pvygrvknelwhpyzf5v4sd3u7gw",
      pubkeyHex: "09e4e56ef0cfe8c0e368372b49f1ce325c30198f0b0881b2d3cfdd709049a32b",
      lightningAddress: "hacphong@getalby.com",
    },
    links: {
      email: "phong@hacphong.com",
      github: "https://github.com/PHONGUIT22",
      linkedin: "https://www.linkedin.com/in/nguy%E1%BB%85n-phong-a673681b5/",
      facebook: "https://www.facebook.com/phong.nguyen.916206/",
      layers: "https://layers.to/np798573l7ecnk8fcs",
    },
  };
}
