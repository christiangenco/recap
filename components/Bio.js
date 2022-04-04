import { useEffect, useState } from "react";
// import { Follow } from "react-twitter-widgets";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";

export default function Bio() {
  const [frontend, setFrontend] = useState(false);
  useEffect(() => {
    setFrontend(true);
  }, []);
  return (
    <div className="flex items-center justify-end my-4">
      <p className="text-right">
        by{" "}
        <a
          href="http://christian.gen.co"
          className="text-blue-600 hover:underline"
        >
          Christian Genco
        </a>
        {frontend && <TwitterFollowButton screenName={"cgenco"} />}
      </p>
      <a href="http://christian.gen.co" className="">
        <img
          src={"/cgenco.jpg"}
          alt={`Christian Genco`}
          className="ml-2 mb-0 rounded-full h-16"
        />
      </a>
    </div>
  );
}
