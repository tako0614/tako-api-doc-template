import type { FileStructure } from "./types.ts";

let cachedRoutes: FileStructure | undefined;

export async function getDirectoryStructure(
  path: string,
): Promise<FileStructure> {
  const structure: FileStructure = { files: [] };

  for await (const entry of Deno.readDir(path)) {
    if (entry.isFile) {
      structure.files.push(entry.name.split(".").slice(0, -1).join("."));
    } else if (entry.isDirectory) {
      structure[entry.name] = await getDirectoryStructure(
        `${path}/${entry.name}`,
      );
    }
  }

  return structure;
}

export async function getRoutes(): Promise<FileStructure> {
  if (!cachedRoutes) {
    cachedRoutes = await getDirectoryStructure("./markdowns");
  }
  return cachedRoutes;
}
