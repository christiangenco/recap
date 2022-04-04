import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

// export const TALKS_PATH = join(process.cwd(), "talks");

export function parseTalk(path) {
  const { data, content } = matter(fs.readFileSync(path));
  if (data.date) data.date = +new Date(data.date);
  return { frontmatter: data, markdown: content, path };
}

export function talkFilenames() {
  const TALKS_PATH = join(process.cwd(), "talks");

  return fs.readdirSync(TALKS_PATH).filter((path) => path.includes(".md"));
}

export function getTalks() {
  const TALKS_PATH = join(process.cwd(), "talks");
  return talkFilenames().map((filename) => {
    return parseTalk(join(TALKS_PATH, filename));
  });
}

export async function getStaticProps() {
  const data = getData();
  return {
    props: {
      data,
    },
  };
}
