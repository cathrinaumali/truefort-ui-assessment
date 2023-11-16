import { useEffect, useState } from "react";
import UiTable from "../ui/table/table";
import { UserData, ColumnProps } from "../../utils/types";
import Divider from "@mui/joy/Divider";
import Sheet from "@mui/joy/Sheet";
import FormControl from "@mui/joy/FormControl";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import CachedIcon from "@mui/icons-material/Cached";
import Textarea from "@mui/joy/Textarea";
import UserModal from "../userModal/userModal";
// Types
import { FormData, STATUS } from "../../utils/types";
// Styles
import "./users.scss";

const UsersTable = () => {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [toEditUser, setToEditUser] = useState<UserData | null>(null);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [mode, setMode] = useState<"add" | "edit">("add");

  const columns: ColumnProps<UserData>[] = [
    { id: "userId", label: "User ID", align: "left" },
    { id: "firstName", label: "First Name", align: "left" },
    { id: "lastName", label: "Last Name", align: "left" },
    { id: "email", label: "Email", align: "left" },
    { id: "status", label: "Status", align: "left" },
    { id: "createdOn", label: "Created On", align: "left" },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch("../../users/users.json");
      const jsonData = await response.json();
      setUsersData(jsonData);
      setSelected([]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const submitUserForm = (data: FormData) => {
    if (mode === "add") {
      const newData = {
        ...data,
        status: "REGISTERED" as STATUS,
        createdOn: "Thu Apr 14 2022 10:55:20 GMT",
      };
      setUsersData((prev) => [...prev, newData]);
    } else {
      const updateDAta = usersData?.map((user) => {
        return user.id === data.id ? { ...user, ...data } : user;
      });
      setUsersData(updateDAta);
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

  const resetSelected = () => {};

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
      console.log(selected);
      const newUserData = usersData?.filter(
        (user) => !selected.includes(user.userId)
      );
      setUsersData(newUserData);
    } else {
      alert("Please select users to delete");
    }
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
            if (selectedCount === 0) {
              alert("Please select a user to edit");
            } else if (selectedCount > 1) {
              alert("Cannot edit multiple users");
            } else {
              onEdituserClick();
            }
          }}
        />
        <Divider orientation="vertical" sx={dividerColor} />
        <CachedIcon sx={iconColor} onClick={fetchData} />
        <Divider orientation="vertical" sx={dividerColor} />
        <DeleteIcon sx={iconColor} onClick={handleDelete} />
        <Divider orientation="vertical" sx={dividerColor} />
        <Textarea
          name="Outlined"
          placeholder="Grid Filter"
          variant="outlined"
        />
      </FormControl>
    );
  };

  return (
    <div className="users-table__container">
      <h1 className="users-table__title">Users Table</h1>
      <Sheet
        className="users-table__sheet"
        sx={{ mb: 2, ml: 1, backgroundColor: "#404d59" }}
      >
        {renderHeaderToolBar()}
        <UiTable data={usersData} columns={columns} onSelect={handleSelect} />
      </Sheet>
      <UserModal
        mode={mode}
        onClose={() => setOpenAddModal(false)}
        isOpen={openAddModal}
        onFormSubmit={submitUserForm}
        selected={toEditUser} //
      />
    </div>
  );
};
export default UsersTable;
