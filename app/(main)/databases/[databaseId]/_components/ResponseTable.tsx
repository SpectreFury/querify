import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

type ResponseTableProps = {
  responseData: any[];
};

const ResponseTable = ({ responseData }: ResponseTableProps) => {
  console.log(responseData);

  if (!responseData.length) return;

  const keys = Object.keys(responseData[0]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {keys.map((key) => (
              <TableHead key={key}>{key}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {responseData.map((item) => (
            <TableRow>
              {Object.values(item).map((value) => (
                <TableCell className="font-medium">
                  {value as React.ReactNode}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResponseTable;
