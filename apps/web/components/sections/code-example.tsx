import { CodeBlock } from "../ui/code-block"

export function CodeExample() {

  const integrationCode = `
  // 1. Initialize the client using an API Key
  import { KonfigClient } from "@konfig/sdk";

  const client = new KonfigClient({ 
    apiKey: process.env.KONFIG_API_TOKEN 
  });

  // 2. Fetch keys of that project
  const appConfig = await client.getEnvironment("production");

  console.log("App safely initialized!");
  `

  return (
    <section className="py-24 bg-[#0d0d0f] relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col items-center">
        <div className="text-center mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Typesafe. <span className="text-white/50">Developer-first.</span>
          </h2>
          <p className="text-lg text-white/90">
            Create a project, define variables, and seamlessly fetch them in your app.
            No more hunting for broken .env files.
          </p>
        </div>

        <div className="w-full max-w-3xl">
          <CodeBlock code={integrationCode} />
        </div>
      </div>
    </section>
  )
}
