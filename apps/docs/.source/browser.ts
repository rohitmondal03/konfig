// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"getting-started.mdx": () => import("../content/getting-started.mdx?collection=docs"), "index.mdx": () => import("../content/index.mdx?collection=docs"), "installation.mdx": () => import("../content/installation.mdx?collection=docs"), "concepts/api-keys.mdx": () => import("../content/concepts/api-keys.mdx?collection=docs"), "concepts/configs.mdx": () => import("../content/concepts/configs.mdx?collection=docs"), "concepts/projects.mdx": () => import("../content/concepts/projects.mdx?collection=docs"), "guides/express.mdx": () => import("../content/guides/express.mdx?collection=docs"), "guides/nextjs.mdx": () => import("../content/guides/nextjs.mdx?collection=docs"), "guides/node.mdx": () => import("../content/guides/node.mdx?collection=docs"), "sdk/api-reference.mdx": () => import("../content/sdk/api-reference.mdx?collection=docs"), "sdk/overview.mdx": () => import("../content/sdk/overview.mdx?collection=docs"), "sdk/usage.mdx": () => import("../content/sdk/usage.mdx?collection=docs"), }),
};
export default browserCollections;