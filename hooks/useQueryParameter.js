import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import omit from 'lodash.omit';

// function queryParameters(router) {
//   const pathParameterKeys = [...router.pathname.matchAll(/\[(\w+)\]/g)].map(
//     (e) => e[1]
//   );
//   return omit(router.query, pathParameterKeys);
// }

// function toQueryString(obj) {
//   return Object.keys(obj)
//     .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
//     .join("&");
// }

export default function useQueryParameter({
  id,
  defaultValue,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
}) {
  const router = useRouter();

  const [value, setValue] = useState(
    router.query[id] === undefined
      ? defaultValue
      : deserialize(router.query[id])
  );

  useEffect(() => {
    if (router) {
      if (router.query[id]) setValue(deserialize(router.query[id]));
      else setValueAndQuery(value);
    }
  }, [router?.query[id]]);

  // console.log({
  //   router: router.query[id],
  //   defaultValue,
  //   value,
  //   query: router.query,
  // });

  function setValueAndQuery(newValue) {
    setValue(newValue);
    // console.log({ newValue, serialized: serialize(newValue) });

    let url = new URL(window.location);
    url.searchParams.set(id, serialize(newValue));
    window.history.replaceState({}, "", url);
    // router.replace(url, undefined, { shallow: true });
  }

  // function setParam(value) {
  //   let url = new URL(window.location);
  //   url.searchParams.set(id, value);
  //   window.history.replaceState({}, "", url);
  //   router.replace(url, undefined, { shallow: true });

  //   url = new URL(window.location);
  //   setValue(cast(url.searchParams.get(id)));
  // }

  // useEffect(() => {
  //   const url = new URL(window.location);
  //   setParam(url.searchParams.get(id) || defaultValue);
  // }, []);

  // function refreshParam() {
  //   console.log(`${key} refreshParam`);
  // }

  // useEffect(() => {
  //   window.addEventListener("popstate", refreshParam);
  //   return () => window.removeEventListener("popstate", refreshParam);
  // }, []);

  // update value on URL change
  // useEffect(() => {
  //   setValue(router.query[id]);
  // }, [router.query]);

  return [value, setValueAndQuery];
}
