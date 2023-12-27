import { useEffect, useState } from "react";
import { getAllUsers } from "../utils/fetchUsers";
import AddUser from "./AddUser";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  IconButton,
  Avatar,
  TableFooter,
  TablePagination,
  Button,
} from "@mui/material";
import DeleteUser from "./DeleteUser";

const MainTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getAllUsers();
    console.log(data);
    setUsers(data);
  };

  return (
    <div>
      <h4>total users: {users?.length}</h4>
      <main>
        <AddUser />
      </main>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-zinc-200">
              <TableCell>Name</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">User Name</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  <Avatar alt="User Image" src={row?.img} />
                </TableCell>
                <TableCell align="right">{row?.email}</TableCell>
                <TableCell align="right">{row?.phone}</TableCell>
                <TableCell align="right">{row?.user_name}</TableCell>
                <TableCell align="right">
                  <DeleteUser getUsers={getUsers} uid={row?.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter
            className=""
            style={{
              display: "flex",
              justifyContent: "space-between",
              justifyItems: "end",
            }}
          >
            <Button>Previous</Button>
            <Button>Next</Button>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MainTable;
