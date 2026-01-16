import { FreshContext } from "$fresh/server.ts";
import { Page } from "../islands/Page.tsx";
import { Partial } from "$fresh/runtime.ts";
import { getRoutes } from "../lib/fileStructure.ts";
import { renderSidebar } from "../lib/sidebar.tsx";

export const handler = {
  async GET(_req: Request, ctx: FreshContext) {
    const routes = await getRoutes();
    const markdown = await Deno.readTextFile("./markdowns/Welcome.md");
    return ctx.render({ markdown, routes });
  },
};

export default function Home(
  { data }: { data: { markdown: string; routes: unknown } },
) {
  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://sindresorhus.com/github-markdown-css/github-markdown.css"
        />
      </head>
      <div class="bg-[#181818] text-black hidden-scrollbar">
        <header class="h-[56px] fixed w-full bg-[#efeff0] dark:bg-[#1f1f1f] flex">
          <div class="w-1/3 h-full hidden lg:block"></div>
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
                  <img src="/github.svg" alt="" class="h-3/6 my-auto" loading="lazy" />
                </a>
              </div>
              <div class="my-auto h-full pr-2 flex">
                <a href="x.com/takoserver_com">
                  <img src="/x.svg" alt="" class="h-3/6 my-auto" loading="lazy" />
                </a>
              </div>
            </div>
          </div>
        </header>
        <div class="pt-[56px] flex">
          <div class="flex-shrink-0 hidden lg:block lg:px-4">
            <div class="fixed top-24 bottom-24 w-[17rem] flex overflow-hidden dark:bg-[#242424] rounded-xl">
              <div class="flex-1 h-[calc(100vh_-_6rem)] overflow-y-auto pb-8 p-2">
                <ul class="list-inside font-semibold nested ml-2.5 file-tree">
                  <div class="text-white text-bold text-lg text-center">
                    takos api v2 docs
                  </div>
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
