import React from "react";
import { deleteUser } from "../utils/fetchUsers";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

const DeleteUser = ({ getUsers, uid }) => {
  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    getUsers();
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
