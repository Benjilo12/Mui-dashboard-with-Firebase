import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";
import { tokens } from "../../theme";
import Swal from "sweetalert2";
import { db } from "../../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import AddInvoice from "./AddInvoice";
import LoadingSkeleton from "../dashboard/global/LoadingSkeleton";
import EditInvoice from "./EditInvoice";

function Invoices() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newopen, setNewOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null); // State for selected invoice
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleNewOpen = () => setNewOpen(true);
  const handleNewClose = () => setNewOpen(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor:
      theme.palette.mode === "dark" ? colors.primary[400] : colors.primary[400],
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "Invoices"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRows(data);
      setFilteredRows(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "Invoices"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRows(data);
    setFilteredRows(data);
    setLoading(false);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    const userDoc = doc(db, "Invoices", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getUsers();
  };

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice); // Set the selected invoice
    handleNewOpen(); // Open the edit modal
  };

  const filterData = (value) => {
    if (value) {
      const filtered = rows.filter((row) =>
        row.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRows(filtered);
    } else {
      setFilteredRows(rows);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", headerClassName: "super-header" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      headerClassName: "super-header",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      headerClassName: "super-header",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerClassName: "super-header",
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      headerClassName: "super-header",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]} pt="15px">
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      headerClassName: "super-header",
    },
    {
      field: "actions",
      headerName: "Action",
      type: "actions",
      width: 200,
      headerClassName: "super-header",
      getActions: (params) => [
        <Tooltip title="Edit">
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleEdit(params.row)} // Pass the whole row
          />
        </Tooltip>,
        <Tooltip title="Delete">
          <GridActionsCellItem
            icon={<DeleteIcon sx={{ color: "red" }} />}
            label="Delete"
            onClick={() => deleteUser(params.id)}
          />
        </Tooltip>,
      ],
    },
  ];

  return (
    <>
      <Modal
        open={newopen}
        onClose={handleNewClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditInvoice
            handleNewClose={handleNewClose}
            getUsers={getUsers}
            invoice={selectedInvoice} // Pass the selected invoice here
          />
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddInvoice handleClose={handleClose} getUsers={getUsers} />
        </Box>
      </Modal>

      <Box m="20px">
        <Header title="INVOICES" subtitle="List of Invoice Balance" />
        <Box
          m="30px 0 0 0"
          height="69vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            // "& .super-header": {
            //   backgroundColor: colors.blueAccent[700],
            // },
          }}
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: colors.primary[400],
              justifyContent: "space-between",
              marginTop: "40px",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ padding: "6px" }}
            >
              Invoices
            </Typography>
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              sx={{
                backgroundColor: colors.blueAccent[400],
                borderRadius: "3px",
              }}
              onClick={handleOpen}
            >
              Add
            </Button>
          </Box>
          <Divider />
          <Stack direction="row" spacing={2} sx={{ marginTop: "8px" }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onInputChange={(e, value) => filterData(value)}
              getOptionLabel={(row) => row.name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Name" />
              )}
            />
          </Stack>
          <>
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <DataGrid
                checkboxSelection
                rows={filteredRows}
                columns={columns}
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSize={paginationModel.pageSize}
                rowsPerPageOptions={[5, 10, 20]}
              />
            )}
          </>
        </Box>
      </Box>
    </>
  );
}

export default Invoices;
