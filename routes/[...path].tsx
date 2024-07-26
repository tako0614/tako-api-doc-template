import { useSignal } from "@preact/signals";
import { FreshContext } from "$fresh/server.ts";
let routes: FileStructure | undefined;
export const handler = {
  async GET(_req: Request, ctx: FreshContext) {
    const url = ctx.params.path;
    if (!routes) {
      routes = await getDirectoryStructure("./markdowns");
    }
    const urlArray = url.split("/").filter(part => part); // 空の要素を取り除く

    if (urlArray.length === 0) {
      return ctx.render({ url, markdown: null });
    }

    let current = routes;
    let exists = true;
    let isDir = false;
    //only file , not directory
        for (const part of urlArray) {
      if (typeof current !== 'object' || !current) {
        console.log("a")
        exists = false;
        break;
      }
      if (current.files.includes(part)) {
        console.log("o",part)
        exists = true;
        break;
      } else if (part in current) {
        current = current[part] as FileStructure;
        console.log("i")
        exists = false;
        isDir = true;
      } else {
        console.log("u")
        exists = false;
        break;
      }
    }
    if (exists) {
      const filePath = `./markdowns/${url}.md`;
      const markdown = await Deno.readTextFile(filePath);
      return ctx.render({ url, markdown });
    } else {
      if(isDir){
        return ctx.render({ url, markdown: null });
      }
      return ctx.renderNotFound();
    }
  },
};
type FileStructure = {
  files: string[];
  [directory: string]: FileStructure | string[];
};

// function to get directory structure
async function getDirectoryStructure(path: string): Promise<FileStructure> {
  const structure: FileStructure = { files: [] };

  for await (const entry of Deno.readDir(path)) {
    if (entry.isFile) {
      structure.files.push(entry.name.split(".").slice(0, -1).join("."));
    } else if (entry.isDirectory) {
      structure[entry.name] = await getDirectoryStructure(`${path}/${entry.name}`);
    }
  }

  return structure;
}
export default function Home({ data }: { data: { url: string } }) {
  console.log(data)
  return (
    <div class="bg-[#ffffff] dark:bg-[#181818] dark:text-white text-black hidden-scrollbar">
      <header class="h-[56px] fixed w-full bg-[#efeff0] dark:bg-[#1f1f1f] flex">
        <div class="w-1/3 h-full hidden lg:block">
        </div>
        <div class="m-auto flex gap-8">
          <a
            href="/"
            class="font-semibold text-neutral-100 text-md bg-clip-text"
          >
            home
          </a>
          <a
            href=""
            class="font-semibold text-neutral-100 text-md bg-clip-text"
          >
            news
          </a>
          <a
            href="https://takos.jp"
            class="font-semibold text-neutral-100 text-md bg-clip-text"
          >
            takos
          </a>
        </div>
        <div class="w-1/3 h-full hidden lg:block">
          <div class="h-full flex justify-end items-center">
            <div class="my-auto h-full pr-2 flex">
              <a href="https://github.com/takoserver">
                <img src="/github.svg" alt="" class="h-3/6 my-auto" />
              </a>
            </div>
            <div class="my-auto h-full pr-2 flex">
              <a href="x.com/takoserver_com">
                <img src="/x.svg" alt="" class="h-3/6 my-auto" />
              </a>
            </div>
          </div>
        </div>
      </header>
      <div class="pt-[56px] flex">
        {/*side bar */}
        <div class="flex-shrink-0 hidden lg:block lg:px-4">
          <div class="fixed top-24 w-[17rem] flex overflow-hidden">

          </div>
        </div>
      </div>
    </div>
  );
}
