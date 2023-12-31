import React, { useRef } from "react";
// Components
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

type CommonProps = {
  onClose: () => void;
  isOpen: boolean;
  onFormSubmit: (formData: FormData) => void;
};

interface EditModeProps extends CommonProps {
  mode: "edit";
  selected: UserData | null;
}

interface AddModeProps extends CommonProps {
  mode: "add";
}

type EditUserProps = EditModeProps | AddModeProps;

const EditUser = (props: EditUserProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { isOpen, mode, onClose, onFormSubmit } = props;

  let selecteValues = null;

  if (mode === "edit") {
    const { selected } = props as EditModeProps;
    selecteValues = selected;
  }
  const { userId, firstName, lastName, email, id } = selecteValues || {};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);
    const newUserId = formData.get("userId") as string;
    const newFirstName = formData.get("firstName") as string;
    const newLastName = formData.get("lastName") as string;
    const newEmail = formData.get("email") as string;
    if (
      newUserId !== userId ||
      newFirstName !== firstName ||
      newLastName !== lastName ||
      newEmail !== email
    ) {
      onFormSubmit({
        userId: newUserId,
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        id,
      });
    }
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
