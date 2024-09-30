import { FC } from "react";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { TriangleAlert } from "lucide-react";
import { useGetRandomString } from "@/hooks";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

export const GenerateRandomString: FC = () => {
  const { data, isLoading, error, mutate, isValidating } = useGetRandomString();

  if (error) {
    return (
      <Alert>
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>Oops!</AlertTitle>
        <AlertDescription>
          Error occurred while fetching random string, please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      {isLoading || isValidating ? (
        <Skeleton className="h-40 w-full" />
      ) : (
        <ScrollArea className="h-40 rounded-md bg-gray-50">
          {data ? (
            <p
              className={cn(
                "break-all p-2 text-black",
                data && "animate-in fade-in-0"
              )}
            >
              {data?.wordSequence}
            </p>
          ) : (
            <div className="grid place-content-center h-40">
              <p className="text-sm tracking-tight font-bold text-gray-700">
                Generate Random String
              </p>
            </div>
          )}
        </ScrollArea>
      )}
      <Button
        className="w-full mt-4 disabled:cursor-progress"
        disabled={isLoading || isValidating}
        onClick={() => mutate()}
      >
        {isLoading || isValidating ? (
          <span className="animate-in fade-in-50">Generating</span>
        ) : (
          <span className="animate-in fade-in-50">Generate Random String</span>
        )}
      </Button>
    </div>
  );
};
