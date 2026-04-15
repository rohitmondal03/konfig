// @ts-nocheck
import * as __fd_glob_11 from "../content/sdk/usage.mdx?collection=docs"
import * as __fd_glob_10 from "../content/sdk/overview.mdx?collection=docs"
import * as __fd_glob_9 from "../content/sdk/api-reference.mdx?collection=docs"
import * as __fd_glob_8 from "../content/guides/node.mdx?collection=docs"
import * as __fd_glob_7 from "../content/guides/nextjs.mdx?collection=docs"
import * as __fd_glob_6 from "../content/guides/express.mdx?collection=docs"
import * as __fd_glob_5 from "../content/concepts/projects.mdx?collection=docs"
import * as __fd_glob_4 from "../content/concepts/configs.mdx?collection=docs"
import * as __fd_glob_3 from "../content/concepts/api-keys.mdx?collection=docs"
import * as __fd_glob_2 from "../content/installation.mdx?collection=docs"
import * as __fd_glob_1 from "../content/index.mdx?collection=docs"
import * as __fd_glob_0 from "../content/getting-started.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content", {}, {"getting-started.mdx": __fd_glob_0, "index.mdx": __fd_glob_1, "installation.mdx": __fd_glob_2, "concepts/api-keys.mdx": __fd_glob_3, "concepts/configs.mdx": __fd_glob_4, "concepts/projects.mdx": __fd_glob_5, "guides/express.mdx": __fd_glob_6, "guides/nextjs.mdx": __fd_glob_7, "guides/node.mdx": __fd_glob_8, "sdk/api-reference.mdx": __fd_glob_9, "sdk/overview.mdx": __fd_glob_10, "sdk/usage.mdx": __fd_glob_11, });