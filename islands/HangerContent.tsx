import type { Signal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { renderSidebar } from "../lib/sidebar.tsx";
import type { FileStructure } from "../lib/types.ts";

interface Props {
  isShow: Signal<boolean>;
  routes: FileStructure;
}

export default function HangerContent({ isShow, routes }: Props) {
  useEffect(() => {
    const handleFolderClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("folder")) {
        target.classList.toggle("open");
        const ul = target.nextElementSibling as HTMLElement | null;
        if (ul) {
          ul.style.display = ul.style.display === "none" ? "block" : "none";
        }
      }
    };

    document.addEventListener("click", handleFolderClick);
    return () => document.removeEventListener("click", handleFolderClick);
  }, []);

  if (!isShow.value) {
    return null;
  }

  return (
    <div class="fixed w-full h-screen bg-[#ffffff2f] flex z-50">
      <div class="w-3/4 bg-[#181818] h-screen p-1 overflow-y-auto">
        <div class="list-inside font-semibold nested ml-2.5 file-tree">
          {renderSidebar(routes, "/")}
        </div>
      </div>
      <div
        class="w-1/4 h-screen"
        onClick={() => (isShow.value = false)}
      />
    </div>
  );
}
