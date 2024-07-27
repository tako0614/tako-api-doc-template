import { Page } from "../islands/Page.tsx";
const doc = await Deno.readTextFile("./markdowns/home.md");
export default function Home() {
  console.log(doc);
  return (
    <Page doc={doc} />
  );
}
