import Markdown from "react-markdown";
import Link from "next/link";
import Shell from "components/Shell";
import Meta from "components/Meta";
import Speaker from "components/Speaker";

export default function Talk({ frontmatter, slug, markdown }) {
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

      <h1 className="text-7xl my-4">{title}</h1>

      <Speaker speaker={speaker} />

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
