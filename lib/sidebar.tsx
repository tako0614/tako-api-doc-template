import type { FileStructure } from "./types.ts";

export const FileTitle = (
  { href, children }: { href: string; children: preact.ComponentChildren },
) => (
  <li>
    <a href={href} className="file">
      {children}
    </a>
  </li>
);

export const DirTitle = (
  { children }: { children: preact.ComponentChildren },
) => <span className="folder">{children}</span>;

export function renderSidebar(
  routes: FileStructure | undefined,
  path = "",
): preact.JSX.Element | null {
  if (!routes) {
    return null;
  }

  const entries = Object.entries(routes);

  return (
    <ul>
      {entries.map(([key, value]) => {
        if (key === "files" && Array.isArray(value)) {
          return value.map((file) => (
            <FileTitle key={file} href={`${path}${file}`}>
              {file}
            </FileTitle>
          ));
        } else {
          return (
            <li key={key}>
              <DirTitle>{key}</DirTitle>
              {renderSidebar(value as FileStructure, `${path}${key}/`)}
            </li>
          );
        }
      })}
    </ul>
  );
}
