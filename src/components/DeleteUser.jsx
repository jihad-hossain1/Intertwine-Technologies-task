import React from "react";
import { deleteUser } from "../utils/fetchUsers";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

const DeleteUser = ({ uid }) => {
  const handleDeleteUser = async (id) => {
    await deleteUser(id);

    window.location.reload(false);
  };

  return (
    <>
      <Button
        variant="text"
        color="warning"
        onClick={() => handleDeleteUser(uid)}
      >
        <DeleteIcon />
      </Button>
    </>
  );
};

export default DeleteUser;
