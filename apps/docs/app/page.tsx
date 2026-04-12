import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { source } from '@/lib/source';

export async function generateMetadata(): Promise<Metadata> {
  const page = source.getPage([]);
  if (!page) notFound();

  return {
    title: `${page.data.title} | Konfig`,
    description: page.data.description,
  };
}

export default async function HomePage() {
  // Pass an empty array to match index.mdx at the root of the source directory
  const page = source.getPage([]);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}