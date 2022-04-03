import fs from "fs";
import { join } from "path";
import Markdown from "react-markdown";

import Shell from "components/Shell";
import Meta from "components/Meta";
import { parseTalk, talkFilenames } from "utils";

export default function Post({ frontmatter, slug, markdown }) {
  const {
    title,
    speaker: {
      name: speakerName,
      twitter,
      description: speakerDescription,
      image: speakerImage,
    },
    date,
    description,
    image,
    conference,
  } = frontmatter;

  return (
    <Shell>
      <Meta
        title={`${title} by ${speakerName} | Microconf Recap`}
        description={description}
        image={image}
      />

      <article className="prose prose-stone lg:prose-xl dark:prose-invert">
        <img src={image} alt="" />
        <Markdown
          children={markdown}
          components={
            {
              // TODO: wrap <figure> in a <div> instead of <p>
              // https://github.com/josestg/rehype-figure/blob/master/index.js
              // img: ({ src, alt, title }) => {
              //   console.log({ src, alt, title });
              //   return (
              //     <figure>
              //       <img src="src" />
              //       <figcaption>alt</figcaption>
              //     </figure>
              //   );
              // },
            }
          }
        />
      </article>
    </Shell>
  );
}

const TALKS_PATH = join(process.cwd(), "talks");

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const path = join(TALKS_PATH, `${slug}.md`);

  return {
    props: { slug, ...parseTalk(path) },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: talkFilenames()
      .map((path) => path.replace(/\.md?$/, ""))
      .map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};
