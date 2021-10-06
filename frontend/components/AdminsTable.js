import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Cookies from "js-cookie";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FormDialog from "./FormModal";

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function AdminsTable({ res }) {
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "nom",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "prenom",
      headerName: "Last name",
      width: 150,
      editable: true,
    },

    {
      field: "email",
      headerName: "email",
      sortable: false,
      width: 300,
    },
    {
      field: "",
      headerName: "Actions",
      sortable: false,
      width: 500,
      renderCell: (params) => {
        const onDelete = async () => {
          if (confirm("Are you sure you want to delete this?")) {
            await axios.delete(
              `http://localhost:4000/admins/admin/${params.row.id}`
            );
            setRows((rows) => rows.filter((i) => i.id !== params.row.id));
          }
        };

        if (params.row.id == user._id) return;
        return (
          <IconButton aria-label="delete" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  let user = null;
  if (typeof window != "undefined") {
    user = JSON.parse(localStorage.getItem("user")).user;
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  async function fetchAdmins() {
    if (user) {
      try {
        const res = await axios.get(
          `http://localhost:4000/admins/findAll/${user.belongsTo}`
        );
        if (res) {
          setRows(res.data.message);
        }
      } catch (err) {
        console.log(err);
      }
      return;
    }
  }

  // let res=[]
  useEffect(() => {
    fetchAdmins();
  }, []);
  return (
    <>
      <div
        style={{
          marginTop: "1rem",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          marginLeft: "18rem",
          height: 400,
          width: "800px",
        }}
      >
        <div>
          <Button
            style={{
              width: "10vw",
              backgroundColor: "blue",
              color: "white",
              marginLeft: "30rem",
              marginBottom: "0rem",
            }}
            onClick={handleClickOpen}
          >
            Add Admin
          </Button>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
          style={{ width: "80vw", marginTop: "0rem" }}
        />
      </div>
      <FormDialog
        user={user}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        setRows={setRows}
      />
    </>
  );
}
