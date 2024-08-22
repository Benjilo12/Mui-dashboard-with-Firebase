import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

function EditInvoice({ handleNewClose, getUsers, invoice }) {
  const [name, setName] = useState(invoice?.name || "");
  const [phone, setPhone] = useState(invoice?.phone || "");
  const [email, setEmail] = useState(invoice?.email || "");
  const [cost, setCost] = useState(invoice?.cost || "");
  const [date, setDate] = useState(invoice?.date || "");

  //fetching update from firebase
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const invoiceRef = doc(db, "Invoices", invoice.id);
      await updateDoc(invoiceRef, { name, phone, email, cost, date });
      await getUsers(); // Ensure the list refreshes after update
      handleNewClose(); // Close the modal
      toast.success("Invoice updated successfully!");
    } catch (error) {
      toast.error(`Error updating invoice: ${error.message}`);
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography>Edit Invoice</Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={handleNewClose}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="phone"
              name="phone"
              label="Phone"
              type="number"
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="cost"
              name="cost"
              label="Cost"
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              sx={{ minWidth: "100%" }}
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="date"
              name="date"
              label="Date"
              type="date"
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box sx={{ m: 4 }} />
    </>
  );
}

export default EditInvoice;
