import { FC, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks";
import { useSolvePuzzleMutation } from "@/hooks";
import { Chart } from "./Chart";
import {
  AlertCircle,
  ChartNoAxesColumn,
  Table,
  TriangleAlert,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PuzzleTable } from "./PuzzleTable";
import { cn } from "@/lib/utils";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const pattern = /^(?:one|two|three|four|five|six|seven|eight|nine|ten\s?)+$/;

export const PuzzleSolver: FC = () => {
  const [input, setInput] = useState<string>("");
  const [isMalformed, setIsMalformed] = useState<boolean>(false);
  const debouncedInput = useDebounce(input, 700);
  const { data, trigger, error, isMutating } =
    useSolvePuzzleMutation(debouncedInput);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event?.target?.value;
    setInput(value);
  };

  const handleSubmit = () => {
    if (debouncedInput.match(pattern)) trigger(debouncedInput, {});
  };

  useEffect(() => {
    if (debouncedInput === "" || debouncedInput.match(pattern)) {
      setIsMalformed(false);
    } else setIsMalformed(true);
  }, [debouncedInput]);

  return (
    <div>
      <div>
        <p className="tracking-tight text-gray-500">
          Please enter a random number word sequence (e.g.{" "}
          <code className="bg-gray-100 px-1 text-sm">
            onetwothreeonefourfivesix
          </code>
          ).
        </p>
        <div className="mt-4">
          <Label htmlFor="input" className="text-black">
            Sequence
          </Label>
          <Textarea
            id="input"
            data-testid="sequence-input"
            className="mt-2"
            onChange={handleChange}
            value={input}
          />
          {isMalformed && (
            <p
              className={cn(
                "text-orange-700 bg-orange-100 p-3 mt-4 text-sm rounded flex items-center gap-4 font-medium animate-in",
                isMalformed ? "animate-in fade-in-0" : "animate-out fade-out-0"
              )}
            >
              <AlertCircle className="size-4 shrink-0" />
              Your input is malformed, please make sure each word is one
              of(zero, one, two, three, four, five, six, seven, eight, nine,
              ten).
            </p>
          )}
        </div>
        <div className="mt-6">
          <Button
            className="w-full transition-all"
            disabled={isMalformed || debouncedInput === "" || isMutating}
            onClick={handleSubmit}
          >
            {isMutating ? "Solving Puzzle" : "Solve Puzzle"}
          </Button>
        </div>
      </div>
      <div className="mt-6">
        {error ? (
          <Alert variant="destructive" className=" bg-rose-50 border-none">
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>
              Error occurred while solving the puzzle, please try again later.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            {data && (
              <>
                <div>
                  <h3 className="tracking-tighter text-black font-semibold">
                    Puzzle Results
                  </h3>
                  <p className="tracking-tight text-muted-foreground text-sm">
                    Word Sequence:{" "}
                    <code className="bg-gray-100 px-1 text-xs">
                      {data.wordSequence}
                    </code>
                  </p>
                </div>
                <Tabs defaultValue="chart" className=" mt-2">
                  <TabsList>
                    <TabsTrigger
                      value="chart"
                      className="flex items-center gap-2 text-xs"
                    >
                      <ChartNoAxesColumn className="size-3" />
                      Chart
                    </TabsTrigger>
                    <TabsTrigger
                      value="table"
                      className="flex items-center gap-2 text-xs"
                    >
                      <Table className="size-3" />
                      Table
                    </TabsTrigger>
                  </TabsList>
                  <div className="mt-6">
                    <TabsContent value="chart">
                      <Chart chartData={data?.answer} />
                    </TabsContent>
                    <TabsContent value="table">
                      <PuzzleTable tableDate={data?.answer} />
                    </TabsContent>
                  </div>
                </Tabs>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
