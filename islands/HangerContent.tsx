import { useSignal, useComputed } from "@preact/signals";
import { useEffect } from "preact/hooks";

function HangerContent({ isShow, routes }) {
  useEffect(() => {
    const handleFolderClick = (event) => {
      const target = event.target;
      if (target.classList.contains("folder")) {
        target.classList.toggle("open");
        const ul = target.nextElementSibling;
        if (ul) {
          ul.style.display = ul.style.display === "none" ? "block" : "none";
        }
      }
    };

    const folders = document.querySelectorAll(".folder");
    folders.forEach((folder) => {
      const ul = folder.nextElementSibling;
      if (ul) {
        ul.style.display = "none"; // 初期状態で非表示
      }
    });

    document.addEventListener("click", handleFolderClick);

    return () => {
      document.removeEventListener("click", handleFolderClick);
    };
  }, []);

  if (isShow.value) {
    return (
      <div class="fixed w-full h-screen bg-[#ffffff2f] flex">
        <div class="w-3/4 bg-[#181818] h-screen p-1">
          <div class="list-inside font-semibold nested ml-2.5 file-tree">
            {renderSidebar(routes, "/")}
          </div>
        </div>
        <div
          class="w-1/4 h-screen p-1"
          onClick={() => (isShow.value = !isShow.value)}
        ></div>
      </div>
    );
  } else {
    return null;
  }
}

export default HangerContent;

const FileTitle = ({ href, children }) => (
  <li>
    <a href={href} className="file">
      {children}
    </a>
  </li>
);

const DirTitle = ({ children }) => <span className="folder">{children}</span>;

function renderSidebar(routes, path = "") {
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
              <ul style={{ display: "none" }}>
                {renderSidebar(value, `${path}${key}/`)}
              </ul>
            </li>
          );
        }
      })}
    </ul>
  );
}