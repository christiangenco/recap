import Shell from "components/Shell";
import Meta from "components/Meta";
import { getTalks } from "utils";
import { format } from "date-fns";

function Talk({ title, speaker, date, description, image, conference }) {
  const {
    name: speakerName,
    twitter,
    description: speakerDescription,
    image: speakerImage,
  } = speaker || {};

  const href = "";
  const readingTime = "";

  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0">
        <img className="h-48 w-full object-cover" src={image} alt="" />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            <a href={href} className="hover:underline">
              category?
            </a>
          </p>
          <a href={href} className="block mt-2">
            <p className="text-xl font-semibold text-gray-900">{title}</p>
            <p className="mt-3 text-base text-gray-500">{description}</p>
          </a>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <a href={`https://twitter.com/${twitter}`}>
              <span className="sr-only">{speakerName}</span>
              <img
                className="h-10 w-10 rounded-full"
                src={speakerImage}
                alt=""
              />
            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <a
                href={`https://twitter.com/${twitter}`}
                className="hover:underline"
              >
                {speakerName}
              </a>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={date}>{format(date, "yyyy-MM-dd")}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{readingTime} read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home({ talks }) {
  talks.forEach(
    (talk) =>
      (talk.frontmatter.date =
        new Date(talk.frontmatter.date || 0) || new Date())
  );
  return (
    <Shell className="">
      <Meta
        title={`Microconf Recap`}
        description={"Recaps of Microconf talks."}
        image={"/microconf.jpg"}
      />
      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none md:grid-cols-2">
        {talks
          .sort((a, b) => b.frontmatter.date - a.frontmatter.date)
          .map(({ frontmatter }) => {
            return <Talk key={frontmatter.title} {...frontmatter} />;
          })}
      </div>
    </Shell>
  );
}

export const getStaticProps = async (context) => {
  const talks = getTalks();
  return {
    props: { talks },
  };
};
