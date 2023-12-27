import DialogTitle from "@mui/material/DialogTitle";
import { Dialog } from "@mui/material";

const ModalAll = ({ title, children, open, setOpen }) => {
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(!open)}>
        <DialogTitle className="text-center ">{title}</DialogTitle>
        {children}
      </Dialog>
    </>
  );
};

export default ModalAll;
