import Head from "next/head";
export default function Shell({ children, className = "max-w-3xl mx-auto" }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Lato|Merriweather"
          rel="stylesheet"
          class="next-head"
        />
      </Head>
      <div className={className}>{children}</div>
    </div>
  );
}
