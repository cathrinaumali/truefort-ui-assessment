import React, { useEffect } from "react";
// Components
import Table from "@mui/joy/Table";
import Checkbox from "@mui/joy/Checkbox";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// Types
import { UiTableProps, UserData } from "../../../utils/types";
// Styles
import "./table.scss";

const tableStyles = {
  "--Table-headerUnderlineThickness": "1px",
  "& thead th:nth-child(1)": { width: "38px" },
  "& thead th:nth-child(7)": { width: "25%" },
  "& th": { color: "#97a3b0" },
  "& td": { color: "#97a3b0" },
  "& thead th": {
    borderColor: "#97a3b0",
    color: "#97a3b0",
    backgroundColor: "#404d59",
    padding: "8px",
  },
  "& tbody td": {
    borderColor: "#97a3b0",
    color: "#97a3b0",
    padding: "8px",
  },
  fontFamily: "Montserrat, sans-serif",
};
const UiTable = <T extends UserData>({
  data,
  columns,
  onSelect,
  selectionRef,
}: UiTableProps<T>) => {
  const [selected, setSelected] = React.useState<string[]>([]);

  const numSelected = selected.length;
  const rowCount = data.length;
  const isSelected = (userId: string) => selected.indexOf(userId) !== -1;

  useEffect(() => {
    if (selectionRef) {
      selectionRef.current = {
        resetSelection: () => setSelected([]),
      };
    }
  }, [selectionRef]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected: string[] = data.map((n) => String(n[columns[0].id]));
      setSelected(newSelected);
      onSelect?.(newSelected);
      return;
    }
    setSelected([]);
    onSelect?.([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, userId: string) => {
    const selectedIndex = selected.indexOf(userId);
    let newSelected: string[] = [];

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
    onSelect?.(newSelected);
  };

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#36404a" }}>
      <Table
        size={"sm"}
        borderAxis="both"
        stickyFooter={false}
        stickyHeader={false}
        sx={tableStyles}
        className={"app-table"}
      >
        <TableHead sx={{ backgroundColor: "#404d59" }}>
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
                key={index}
                onClick={(event) => handleClick(event, row.userId)}
                sx={isItemSelected ? { backgroundColor: "#404d59" } : {}}
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
                  />
                </TableCell>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row[column.id] as React.ReactNode}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default UiTable;
