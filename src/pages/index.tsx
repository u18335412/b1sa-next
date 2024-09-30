import { GenerateRandomString, PuzzleSolver } from "@/components";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ALargeSmall, Puzzle } from "lucide-react";

export default function Home() {
  return (
    <main>
      <div className="bg-gray-50">
        <div className="container mx-auto md:max-w-[30rem] bg-white py-6 min-h-screen px-4">
          <h1 className="tracking-tighter text-xl font-bold text-black">
            Awelani Murovhi
          </h1>
          <p className="tracking-tight text-gray-500">
            Coding Assignment for b1sa
          </p>
          <Tabs defaultValue="string-generator" className="mt-8">
            <TabsList>
              <TabsTrigger
                value="string-generator"
                className="flex items-center gap-2"
              >
                <ALargeSmall className="size-4" />
                String Generator
              </TabsTrigger>
              <TabsTrigger
                value="puzzle-solver"
                className="flex items-center gap-2"
              >
                <Puzzle className="size-3.5" />
                Puzzle Solver
              </TabsTrigger>
            </TabsList>
            <TabsContent value="string-generator">
              <h2 className="text-lg tracking-tighter font-bold text-black">
                Random string generator
              </h2>
              <div className="mt-6">
                <GenerateRandomString />
              </div>
            </TabsContent>
            <TabsContent value="puzzle-solver">
              <h2 className="text-lg tracking-tighter font-bold text-black">
                Puzzle Solver
              </h2>
              <div className="mt-6">
                <PuzzleSolver />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
