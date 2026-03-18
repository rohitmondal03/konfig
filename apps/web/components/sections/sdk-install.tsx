import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SDKInstall() {
  return (
    <section className="py-24 border-t border-white/5 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row gap-16 items-center">

        <div className="flex-1 text-center md:text-left space-y-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            Install the SDK
          </h2>
          <p className="sm:text-lg text-white/80 max-w-lg">
            Konfig is available on all major package managers. Add it to your project in seconds and start fetching your configurations securely.
          </p>
        </div>

        <div className="flex-1 w-full max-w-md bg-black/50 border border-zinc-100 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
          <Tabs defaultValue="npm" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/5 p-1 rounded-lg mb-6 border-zinc-100">
              <TabsTrigger value="npm" className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60">npm</TabsTrigger>
              <TabsTrigger value="pnpm" className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60">pnpm</TabsTrigger>
              <TabsTrigger value="yarn" className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60">yarn</TabsTrigger>
            </TabsList>

            <div className="rounded-lg bg-black border border-zinc-500 p-4 text-sm font-mono text-white/80 overflow-x-auto">
              <TabsContent value="npm" className="m-0 focus-visible:ring-0 text-white/90">
                <span className="text-blue-400">npm</span> <span className="text-white/60">install</span> @konfig/sdk
              </TabsContent>
              <TabsContent value="pnpm" className="m-0 focus-visible:ring-0 text-white/90">
                <span className="text-blue-400">pnpm</span> <span className="text-white/60">add</span> @konfig/sdk
              </TabsContent>
              <TabsContent value="yarn" className="m-0 focus-visible:ring-0 text-white/90">
                <span className="text-blue-400">yarn</span> <span className="text-white/60">add</span> @konfig/sdk
              </TabsContent>
            </div>
          </Tabs>
        </div>

      </div>
    </section>
  )
}
