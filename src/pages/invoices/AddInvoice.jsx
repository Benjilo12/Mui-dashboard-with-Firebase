import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

function AddInvoice({ handleClose, getUsers }) {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    cost: Yup.number()
      .required("Cost is required")
      .positive("Cost must be positive"),
    date: Yup.date().required("Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      cost: "",
      date: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await addDoc(collection(db, "Invoices"), values);
        getUsers(); // Refresh the list of invoices
        handleClose(); // Close the modal
        toast.success("Invoice added successfully!");
      } catch (error) {
        toast.error("Error adding invoice. Please try again.");
      }
    },
  });

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography>Add Invoice</Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
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
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
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
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
              value={formik.values.cost}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cost && Boolean(formik.errors.cost)}
              helperText={formik.touched.cost && formik.errors.cost}
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
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box sx={{ m: 4 }} />
    </>
  );
}

export default AddInvoice;
