import { useState } from "react";
import { addUser } from "../utils/fetchUsers";
import ModalAll from "./ModalAll";
import { Button, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";

const basicData = {
  name: "",
  user_name: "",
  email: "",
  phone: "",
  img: "",
  age: 0,
};

const AddUser = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(basicData);

  const { name, user_name, email, phone, img, age } = user;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleAdduser = async (e) => {
    e.preventDefault();
    try {
      await addUser(user);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
      >
        Add User
      </button>
      <ModalAll title={"Add User"} open={open} setOpen={setOpen}>
        <div className="mx-10 my-6">
          <div className="absolute z-10 right-0 top-3">
            <Button onClick={() => setOpen(!open)} type="button">
              <Close />
            </Button>
          </div>
          <form
            onSubmit={handleAdduser}
            className="flex flex-col gap-3 max-w-[600px] mx-auto "
          >
            <label htmlFor="">name</label>
            <TextField
              required
              className="bg-zinc-50 text-zinc-700"
              type="text"
              value={name}
              onChange={handleChange}
              name="name"
            />
            <label htmlFor="">user_name</label>
            <TextField
              required
              className="bg-zinc-50 text-zinc-700"
              type="text"
              value={user_name}
              onChange={handleChange}
              name="user_name"
            />
            <label htmlFor="">email</label>
            <TextField
              required
              className="bg-zinc-50 text-zinc-700"
              type="email"
              value={email}
              onChange={handleChange}
              name="email"
            />
            <label htmlFor="">phone</label>
            <TextField
              required
              className="bg-zinc-50 text-zinc-700"
              type="text"
              value={phone}
              onChange={handleChange}
              name="phone"
            />
            <label htmlFor="">img url</label>
            <TextField
              className="bg-zinc-50 text-zinc-700 "
              type="text"
              value={img}
              onChange={handleChange}
              name="img"
            />
            <label htmlFor="">Age </label>
            <TextField
              className="bg-zinc-50 text-zinc-700 "
              type="number"
              value={age}
              onChange={handleChange}
              name="age"
            />
            <button
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
              type="submit"
            >
              Add user
            </button>
          </form>
        </div>
      </ModalAll>
    </>
  );
};

export default AddUser;
