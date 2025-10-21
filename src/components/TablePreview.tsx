
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TablePreviewProps {
  data: Array<Array<string>>;
  maxRows?: number;
}

export const TablePreview = ({ data, maxRows = 10 }: TablePreviewProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="font-telegraf text-gray-600">No data available</p>
      </div>
    );
  }

  const headers = data[0];
  const rows = data.slice(1, maxRows + 1);

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="font-telegraf font-semibold">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} className="font-telegraf">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data.length > maxRows + 1 && (
        <p className="text-sm text-gray-500 mt-2 font-telegraf text-center">
          Showing {maxRows} of {data.length - 1} rows
        </p>
      )}
    </div>
  );
};
