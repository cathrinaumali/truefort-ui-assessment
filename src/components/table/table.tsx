import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import EditNoteIcon from "@mui/icons-material/EditNote";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import CachedIcon from "@mui/icons-material/Cached";

interface ColumnProps<T> {
  id: keyof T;
  align: "left" | "right" | "center" | "inherit" | "justify" | undefined;
  label: string;
}

interface UiTableProps<T> {
  data: T[];
  columns: ColumnProps<T>[];
}

const UiTable = <T,>({ data, columns }: UiTableProps<T>) => {
  const [stripe, setStripe] = React.useState("odd");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  console.log(selected);

  const numSelected = selected.length;
  const rowCount = data.length;

  const isSelected = (userId: string) => selected.indexOf(userId) !== -1;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      console.log(data);
      const newSelected: readonly string[] = data.map((n) =>
        String(n[columns[0].id])
      );
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, userId: string) => {
    const selectedIndex = selected.indexOf(userId);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, userId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <Sheet>
      <FormControl orientation="horizontal" sx={{ mb: 2, ml: 1 }}>
        <EditNoteIcon />
        <PlaylistAddIcon />
        <DeleteIcon />
        <CachedIcon />
      </FormControl>
      <TableContainer component={Paper}>
        <Table aria-label="striped table" stripe={stripe} size={"sm"}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={handleSelectAllClick}
                  slotProps={{
                    input: {
                      "aria-label": "select all desserts",
                    },
                  }}
                  sx={{ verticalAlign: "sub" }}
                />
              </TableCell>
              {columns.map((column, index) => (
                <TableCell key={index} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => {
              const isItemSelected = isSelected(row.userId);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  key={row.userId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={(event) => handleClick(event, row.userId)}
                >
                  <TableCell scope="row">
                    <Checkbox
                      checked={isItemSelected}
                      slotProps={{
                        input: {
                          "aria-labelledby": labelId,
                        },
                      }}
                      sx={{ verticalAlign: "top" }}
                    />{" "}
                  </TableCell>
                  {columns.map((column, index) => (
                    <TableCell key={index} align={column.align}>
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Sheet>
  );
};
export default UiTable;
