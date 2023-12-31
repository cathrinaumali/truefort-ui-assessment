import { useEffect, useState, useRef } from "react";
// Components
import Divider from "@mui/material/Divider";
import Sheet from "@mui/joy/Sheet";
import FormControl from "@mui/joy/FormControl";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import CachedIcon from "@mui/icons-material/Cached";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import UiTable from "../ui/table/table";
import UserModal from "../userModal/userModal";
import Snackbar from "../ui/snackbar/snackbar";
// Types
import { FormData, STATUS, UserData, ColumnProps } from "../../utils/types";
import { AlertColor } from "@mui/material/Alert";
// Styles
import "./users.scss";

const UsersTable = () => {
  const selectionRef = useRef<{ resetSelection: () => void } | null>(null);
  // States
  const [originalData, setOriginalData] = useState<UserData[]>([]);
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [toEditUser, setToEditUser] = useState<UserData | null>(null);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMeta, setSnackBarMeta] = useState<{
    message: string;
    severity: AlertColor;
  }>({
    severity: "error",
    message: "Failed!",
  });

  // Function to reset selection from outside the table component
  const handleResetSelection = () => {
    if (selectionRef.current) {
      selectionRef.current.resetSelection();
    }
  };

  const columns: ColumnProps<UserData>[] = [
    { id: "userId", label: "User ID", align: "left" },
    { id: "firstName", label: "First Name", align: "left" },
    { id: "lastName", label: "Last Name", align: "left" },
    { id: "email", label: "Email", align: "left" },
    { id: "status", label: "Status", align: "left" },
    { id: "createdOn", label: "Created On", align: "left" },
  ];

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("../../users/users.json");
      const jsonData = await response.json();
      setUsersData(jsonData);
      setOriginalData(jsonData);
      setSelected([]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const callSnackBar = (message: string, severity: AlertColor) => {
    setOpenSnackBar(true);
    setSnackBarMeta({
      message,
      severity,
    });
  };

  const submitUserForm = (data: FormData) => {
    if (mode === "add") {
      const currentDate = new Date();
      const formattedDate = currentDate.toUTCString();
      const newData = {
        ...data,
        status: "REGISTERED" as STATUS,
        createdOn: formattedDate,
      };
      setUsersData((prev) => [...prev, newData]);
      callSnackBar(`Successfully added new user`, "success");
    } else {
      const updateDAta = usersData?.map((user) => {
        return user.id === data.id ? { ...user, ...data } : user;
      });
      setUsersData(updateDAta);
      setOpenSnackBar(true);
      setToEditUser(null);
      handleResetSelection();
      callSnackBar(`Successfully updated user`, "success");
    }
  };

  const onAddUserClick = () => {
    setOpenAddModal(true);
    setMode("add");
  };

  const onEdituserClick = () => {
    if (toEditUser) {
      setOpenAddModal(true);
      setMode("edit");
    }
  };

  const resetSelected = () => {
    setSearchTerm("");
    fetchData();
  };

  const handleSelect = (userIDs: string[]) => {
    setSelected(userIDs);
    if (userIDs?.length === 1) {
      const selectedUser = usersData?.filter(
        (user) => user.userId === userIDs[0]
      );
      setToEditUser(selectedUser[0]);
    } else {
      setToEditUser(null);
    }
  };

  const handleDelete = () => {
    if (selected?.length) {
      const newUserData = usersData?.filter(
        (user) => !selected.includes(user.userId)
      );
      setUsersData(newUserData);
      handleResetSelection();
    } else {
      setOpenSnackBar(true);
      callSnackBar("Please select users to delete", "error");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    const term = searchTerm.toLowerCase();

    setSearchTerm(searchTerm);

    const searchResults = originalData.filter((item) => {
      return Object.values(item).some((value) => {
        const stringValue = String(value).toLowerCase();
        return stringValue.includes(term);
      });
    });
    setUsersData(searchTerm ? searchResults : originalData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderHeaderToolBar = () => {
    const iconColor = { color: "#74808e" };
    const dividerColor = { backgroundColor: "#ccc" };
    return (
      <FormControl
        orientation="horizontal"
        sx={{ mb: 2, ml: 1 }}
        className="users-table__toolbar"
      >
        <PlaylistAddIcon sx={iconColor} onClick={onAddUserClick} />
        <Divider orientation="vertical" sx={dividerColor} />
        <EditNoteIcon
          sx={iconColor}
          onClick={() => {
            const selectedCount = selected?.length || 0;
            if (selectedCount === 0 || toEditUser === null) {
              callSnackBar("Please select a user to edit", "error");
            } else if (selectedCount > 1) {
              callSnackBar("Cannot edit multiple users", "error");
            } else {
              onEdituserClick();
            }
          }}
        />
        <Divider orientation="vertical" sx={dividerColor} />
        <CachedIcon sx={iconColor} onClick={resetSelected} />
        <Divider orientation="vertical" sx={dividerColor} />
        <DeleteIcon sx={iconColor} onClick={handleDelete} />
        <Divider orientation="vertical" sx={dividerColor} />

        <TextField
          type="text"
          name="search"
          placeholder="Grid Filter"
          variant="outlined"
          onChange={handleSearch}
          value={searchTerm}
          size="small"
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& label.Mui-focused": {
              color: "white",
            },
          }}
        />
      </FormControl>
    );
  };

  return (
    <div className="users-table__container">
      <h1 className="users-table__title">Users Table</h1>
      <Sheet
        className="users-table__sheet"
        sx={{
          mb: 2,
          ml: 1,
          backgroundColor: "#404d59",
          margin: "0",
          padding: "0",
        }}
      >
        {renderHeaderToolBar()}
        {isLoading ? (
          <Box sx={{ display: "flex" }} className="users-table__loader">
            <CircularProgress />
          </Box>
        ) : (
          <UiTable
            data={usersData}
            columns={columns}
            onSelect={handleSelect}
            selectionRef={selectionRef}
          />
        )}
      </Sheet>
      <UserModal
        mode={mode}
        onClose={() => setOpenAddModal(false)}
        isOpen={openAddModal}
        onFormSubmit={submitUserForm}
        selected={toEditUser}
      />
      <Snackbar
        open={openSnackBar}
        snackBarMeta={snackBarMeta}
        setOpen={setOpenSnackBar}
      />
    </div>
  );
};
export default UsersTable;
