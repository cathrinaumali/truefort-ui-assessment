import { useEffect, useState } from "react";
import UiTable from "../table/table";
import { UserData, ColumnProps } from "../../utils/types";

const UsersTable = () => {
  const [usersData, setUsersData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../../users/users.json");
        const jsonData = await response.json();
        setUsersData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(usersData);

  const columns: ColumnProps<UserData>[] = [
    { id: "userId", label: "User ID", align: "left" },
    { id: "firstName", label: "First Name", align: "left" },
    { id: "lastName", label: "Last Name", align: "left" },
    { id: "email", label: "Email", align: "left" },
    { id: "status", label: "Status", align: "left" },
    { id: "createdOn", label: "Created On", align: "left" },
  ];
  return (
    <div>
      <h1>Users Table</h1>
      <UiTable data={usersData} columns={columns} />
    </div>
  );
};
export default UsersTable;
