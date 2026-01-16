import { useSignal } from "@preact/signals";
import { FreshContext } from "$fresh/server.ts";
import { Page } from "../islands/Page.tsx";
import { Partial } from "$fresh/runtime.ts";
import MobileMenuToggle from "../islands/MobileMenuToggle.tsx";
import HangerContent from "../islands/HangerContent.tsx";
import { getRoutes } from "../lib/fileStructure.ts";
import { renderSidebar } from "../lib/sidebar.tsx";
import type { FileStructure } from "../lib/types.ts";

export const handler = {
  async GET(_req: Request, ctx: FreshContext) {
    const url = ctx.params.path;
    const routes = await getRoutes();
    const urlArray = url.split("/").filter((part) => part);

    if (urlArray.length === 0) {
      return ctx.render({ url, markdown: null, routes });
    }

    let current: FileStructure = routes;
    let exists = false;
    let isDir = false;

    for (const part of urlArray) {
      if (typeof current !== "object" || !current) {
        exists = false;
        break;
      }
      if (current.files.includes(part)) {
        exists = true;
        break;
      } else if (part in current) {
        current = current[part] as FileStructure;
        exists = false;
        isDir = true;
      } else {
        exists = false;
        break;
      }
    }

    if (exists) {
      const filePath = `./markdowns/${url}.md`;
      const markdown = await Deno.readTextFile(filePath);
      return ctx.render({ url, markdown, routes });
    } else if (isDir) {
      return ctx.render({ url, markdown: null, routes });
    } else {
      return ctx.renderNotFound();
    }
  },
};

export default function DocPage(
  { data }: { data: { url: string; markdown: string | null; routes: FileStructure } },
) {
  const isShow = useSignal(false);

  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://sindresorhus.com/github-markdown-css/github-markdown.css"
        />
      </head>
      <div class="bg-[#ffffff] dark:bg-[#181818] text-black hidden-scrollbar">
        <header class="h-[56px] fixed w-full bg-[#efeff0] dark:bg-[#1f1f1f] flex">
          <div class="w-1/3 h-full block">
            <MobileMenuToggle isShow={isShow} />
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
          <div class="w-1/3 h-full block">
            <div class="h-full flex justify-end items-center pt-1">
              <div class="h-full flex pr-2 my-auto">
                <a href="https://github.com/takoserver">
                  <img src="/github.svg" alt="" class="h-4/6 m-auto" loading="lazy" />
                </a>
              </div>
            </div>
          </div>
        </header>
        <HangerContent isShow={isShow} routes={data.routes} />
        <div class="pt-[56px] flex">
          <div class="flex-shrink-0 hidden lg:block lg:px-4">
            <div class="fixed top-24 bottom-24 w-[17rem] flex overflow-hidden dark:bg-[#242424] rounded-xl">
              <div class="flex-1 h-[calc(100vh_-_6rem)] overflow-y-auto pb-8 p-2">
                <ul class="list-inside font-semibold nested ml-2.5 file-tree">
                  {renderSidebar(data.routes, "/")}
                </ul>
              </div>
            </div>
          </div>
          <Partial name="body">
            <div
              class="w-full min-w-0 text-white h-screen overflow-y-hidden flex"
              id="md"
            >
              <div class="lg:ml-[18rem] mt-4 min-w-0 flex w-full">
                <div class="w-2/3 lg:w-1/2 mx-auto">
                  <div
                    class="markdown-body"
                    style={{ backgroundColor: "#181818" }}
                  >
                    <Page doc={data.markdown} />
                  </div>
                </div>
              </div>
            </div>
          </Partial>
        </div>
      </div>
    </>
  );
}
