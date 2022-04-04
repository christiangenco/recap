import Talk from "components/Talk";
import { useDoc } from "hooks/useFirebase";
import { useRouter } from "next/router";

export default function FourOhFour() {
  const router = useRouter();
  const slug = router.asPath.split("/").pop();
  const { data: frontmatter } = useDoc(`/posts/${slug}`);
  const { data: bodyWrapper } = useDoc(`/bodies/${slug}`);
  const body = bodyWrapper?.body;

  if (body)
    return <Talk frontmatter={frontmatter} markdown={body} slug={slug} />;

  return (
    <div className="prose">
      <h1>404 - Page Not Found</h1>
      <a href="/">Go back home</a>
    </div>
  );
}
