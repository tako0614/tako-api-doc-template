import { useSignal } from "@preact/signals";
export default function Home() {
  const url = useSignal("/");
  return (
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
  );
}
