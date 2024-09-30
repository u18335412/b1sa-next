import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FC, useMemo } from "react";

export const PuzzleTable: FC<{
  tableDate: {
    value: number;
    word: string;
    count: number;
  }[];
}> = ({ tableDate }) => {
  const totalWords = useMemo(
    () => tableDate.reduce((currentSum, { count }) => currentSum + count, 0),
    [tableDate]
  );
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-full">Value</TableHead>
          <TableHead className="w-full">Word</TableHead>
          <TableHead className="w-full">Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableDate.map(({ count, word, value }) => (
          <TableRow key={word}>
            <TableCell>{value}</TableCell>
            <TableCell>{word}</TableCell>
            <TableCell className=" text-center">{count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2} className=" tracking-tighter">
            Total Word Count
          </TableCell>
          <TableCell className="text-center font-black">{totalWords}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
