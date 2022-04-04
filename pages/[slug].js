// import Image from "next/image";
import fs from "fs";
import { join } from "path";
import Markdown from "react-markdown";
import Link from "next/link";

import { Image } from "components/MarkdownComponents";
import Shell from "components/Shell";
import Meta from "components/Meta";
import { parseTalk, talkFilenames } from "utils";

export default function Post({ frontmatter, slug, markdown }) {
  const { title, speaker, date, description, image, conference } = frontmatter;
  const {
    name: speakerName,
    twitter,
    description: speakerDescription,
    image: speakerImage,
  } = speaker;

  const renderers = {
    // blockquote: Blockquote({ speaker, url }),
    // thematicBreak: Break,
    // heading: Heading,
    // // html: props => "",
    // image: Image({ speaker, url: `https://recap.app/${slug}` }),
    // link: Link,
    // list: List,
  };

  return (
    <Shell>
      <Meta
        title={`${title} by ${speakerName} | Microconf Recap`}
        description={description}
        image={image}
      />

      <Link href="/">
        <a className="my-6 underline">⬅️ All Microconf Recap posts</a>
      </Link>

      <article className="prose prose-stone lg:prose-xl dark:prose-invert">
        <img src={image} alt="" />
        {true && (
          <Markdown escapeHtml={false} renderers={renderers}>
            {markdown}
          </Markdown>
        )}
      </article>
    </Shell>
  );
}

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
