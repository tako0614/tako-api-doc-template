import type { Signal } from "@preact/signals";

interface Props {
  isShow: Signal<boolean>;
}

export default function MobileMenuToggle({ isShow }: Props) {
  return (
    <div
      class="h-full flex justify-start items-center pt-1 lg:hidden"
      onClick={() => (isShow.value = !isShow.value)}
    >
      <div class="h-full flex pl-2">
        <img src="/logo.png" alt="Menu" class="h-4/6 m-auto" loading="lazy" />
      </div>
    </div>
  );
}
