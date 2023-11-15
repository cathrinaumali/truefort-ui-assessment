export interface UserData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: "REGISTERED" | "INITIATED"; // Assuming status can only be 'REGISTERED' or 'INITIATED'
  createdOn: string;
}

export interface ColumnProps<T> {
  // map(arg0: (column: T) => React.ReactNode): React.ReactNode;
  id: keyof T;
  align: "left" | "right" | "center" | "inherit" | "justify" | undefined;
  label: string;
}
