import { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import DeleteUser from "./DeleteUser";
import { Avatar, Radio, TableHead, TextField } from "@mui/material";
import AddUser from "./AddUser";
import { UserState } from "../context/Context";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const CustomeTable = () => {
  // filter users
  const {
    users,
    filterState: { searchQuery, sort },
    filterDispatch,
  } = UserState();

  const transformUsers = () => {
    let sortedUsers = users;
    if (sort) {
      sortedUsers = sortedUsers.sort((a, b) =>
        sort === "lowToHigh" ? a.age - b.age : b.age - a.age
      );
    }

    if (searchQuery) {
      sortedUsers = sortedUsers.filter((itm) =>
        itm.name.toLowerCase().includes(searchQuery)
      );
    }
    return sortedUsers;
  };

  // pagination users
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <main>
      <main className="flex items-center justify-between">
        <h4 className="text-2xl font-semibold">List of Users </h4>

        <AddUser />
      </main>
      <section className="mt-10">
        <div className="bg-zinc-50 p-3 flex items-center justify-between">
          <TextField
            id="outlined-basic"
            type="search"
            label="Search"
            variant="outlined"
            onChange={(e) => {
              filterDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
          />
          <div className=" flex text-zinc-700 items-center">
            <h4 className="w-fit border-b border-violet-600 font-semibold text-sm mr-2">
              Sort By Age:
            </h4>
            <Radio
              onChange={() =>
                filterDispatch({
                  type: "SORT_BY_AGE",
                  payload: "lowToHigh",
                })
              }
              checked={sort == "lowToHigh" ? true : false}
              type="radio"
              name="ascending"
              id=""
            />
            <label htmlFor="ascending">Ascending</label>
            <Radio
              onChange={() =>
                filterDispatch({
                  type: "SORT_BY_AGE",
                  payload: "highToLow",
                })
              }
              checked={sort == "highToLow" ? true : false}
              type="radio"
              name="descending"
              id=""
            />
            <label htmlFor="descending">Descending</label>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table
            // sx={{ minWidth: 500 }}
            aria-label="custom pagination table"
          >
            <TableHead>
              <TableRow className="bg-zinc-200">
                <TableCell>Name</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">User Name</TableCell>
                <TableCell align="right">User Age</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? transformUsers().slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : transformUsers()
              ).map((row) => (
                <TableRow
                  key={row.id}
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
                  <TableCell align="right">{row?.age}</TableCell>
                  <TableCell align="right">
                    <DeleteUser uid={row?.id} />
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={users.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </section>
    </main>
  );
};

export default CustomeTable;
