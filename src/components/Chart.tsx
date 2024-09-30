"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FC } from "react";

export const description = "A bar chart with a label";

const chartConfig = {
  desktop: {
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const Chart: FC<{
  chartData: {
    value: number;
    word: string;
    count: number;
  }[];
}> = ({ chartData }) => {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
        }}
        dataKey="count"
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="word"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent className="bg-white" />}
        />
        <Bar dataKey="count" fill="var(--color-desktop)" radius={8}>
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
