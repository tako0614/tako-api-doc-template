interface FileTreeProps {
  routes: FileStructure;
}
type FileStructure = {
  files: string[];
  [directory: string]: FileStructure | string[];
};
import { useSignal } from "@preact/signals";
const FileTree = ({ routes }: FileTreeProps) => {
  function renderSidebar(routes: FileStructure | undefined, level: number) {
    console.log(routes);
    if (!routes) {
      return null;
    }
    //ignore error
    // @ts-ignore
    const obj = Object.entries(routes).sort(([key1], [key2]) => {
      // directories first then files
      if (key1 === "files" && key2 !== "files") {
        return 1;
      } else if (key1 !== "files" && key2 === "files") {
        return -1;
      }
    }); // sort by key
    return obj.map(([key, value]) => {
      if (key === "files" && Array.isArray(value)) {
        return value.map((file) => {
          return (
            <li>
              <a href={`/${file}`}>{" " + file}</a>
            </li>
          );
        });
      } else {
        const isOpen = useSignal(false);
        return (
          <li>
            <p style={{ marginLeft: `${2 * level}px` }}>{key}</p>
            {isOpen && renderSidebar(value as FileStructure, level + 1)}
          </li>
        );
      }
    });
  }
  return renderSidebar(routes, 0);
};

export default FileTree;
