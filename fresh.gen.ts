// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_path_ from "./routes/[...path].tsx";
import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_joke from "./routes/api/joke.ts";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $Button from "./islands/Button.tsx";
import * as $FileTree from "./islands/FileTree.tsx";
import * as $Hanger from "./islands/Hanger.tsx";
import * as $HangerContent from "./islands/HangerContent.tsx";
import * as $Page from "./islands/Page.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/[...path].tsx": $_path_,
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/joke.ts": $api_joke,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/Button.tsx": $Button,
    "./islands/FileTree.tsx": $FileTree,
    "./islands/Hanger.tsx": $Hanger,
    "./islands/HangerContent.tsx": $HangerContent,
    "./islands/Page.tsx": $Page,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
