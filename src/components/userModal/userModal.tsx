import React, { useRef } from "react";

import Modal from "../ui/modal/modal";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
// Types
import { UserData } from "../../utils/types";
// Styles
import "./userModal.scss";

interface FormData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  id?: string;
}

interface EDIT_MODE {
  mode: "edit";
  selected: UserData | null;
}

interface ADD_MODE {
  mode: "add";
}

type EditUserProps = {
  onClose: () => void;
  isOpen: boolean;
  onFormSubmit: (formData: FormData) => void;
} & (EDIT_MODE | ADD_MODE);

const EditUser = ({
  isOpen,
  mode,
  selected,
  onClose,
  onFormSubmit,
}: EditUserProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { userId, firstName, lastName, email, id } = selected || {};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);
    const userId = formData.get("userId") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;

    console.log({ userId, firstName, lastName, email, id });
    onFormSubmit({ userId, firstName, lastName, email, id });
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} className="user-modal">
      <h2>{mode === "edit" ? "Edit" : "Add"} user</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>User ID</FormLabel>
            <Input autoFocus required name="userId" defaultValue={userId} />
          </FormControl>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input required name="firstName" defaultValue={firstName} />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input required name="lastName" defaultValue={lastName} />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input required name="email" defaultValue={email} />
          </FormControl>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditUser;
