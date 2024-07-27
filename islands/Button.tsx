import { useEffect } from "preact/hooks";
export default function hanger({ isShow }: { isShow: any }) {
  useEffect(() => {
    console.log("clicked");
  }, []);
  return (
    <div
      class="h-full flex justify-start items-center pt-1 lg:hidden"
      onClick={() => isShow.value = !isShow.value}
    >
      <div class="h-full flex pl-2">
        <p>
          <img src="/logo.png" alt="" class="h-4/6 m-auto" />
        </p>
      </div>
    </div>
  );
}
