import { marked } from "https://esm.sh/marked@4.3.0";

interface Props {
  doc: string | null;
}

export function Page({ doc }: Props) {
  if (!doc) {
    return <div class="text-gray-500">No content available</div>;
  }
  const html = marked(doc);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
