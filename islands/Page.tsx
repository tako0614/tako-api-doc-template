import { marked } from "https://esm.sh/marked@4.3.0";
export { h, render } from "preact";
export function Page({doc}: {doc: string}) {
  const html = marked(doc);
  return       <div
  dangerouslySetInnerHTML={{ __html: html  }}
></div>;
}