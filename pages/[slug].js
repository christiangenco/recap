// import Image from "next/image";
import fs from "fs";
import { join } from "path";

import { parseTalk, talkFilenames } from "utils";
import Talk from "components/Talk";

export default Talk;

export const getStaticProps = async (context) => {
  const TALKS_PATH = join(process.cwd(), "talks");
  const { slug } = context.params;
  const path = join(TALKS_PATH, `${slug}.md`);

  return {
    props: { slug, ...parseTalk(path) },
  };
};

export const getStaticPaths = async () => {
  // return { paths: [{ params: { slug: "rob-walling-2021" } }], fallback: false };
  return {
    paths: talkFilenames()
      .map((path) => path.replace(/\.md?$/, ""))
      .map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};
