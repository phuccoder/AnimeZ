import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TableBody,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import callApi from "../ultis/apiCaller";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

export default function Dashboard() {
  const [animeList, setAnimeList] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function getData() {
    await callApi("Film", "GET", null).then((res) => {
      setAnimeList(res.data);
    });
    console.log(animeList);
  }

  useEffect(() => {
    getData();
  }, []);

  function deleteData(id) {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  }

  function handleConfirmDelete() {
    callApi("Film/" + deleteId, "DELETE", null).then((res) => {
      console.log(res);
      setDeleteDialogOpen(false);
      setSuccessDialogOpen(true);
    });
  }

  function handleClose() {
    setDeleteDialogOpen(false);
  }

  function handleSuccessClose() {
    setSuccessDialogOpen(false);
  }

  return (
    <div>
      <Link to="/add">
        <Button variant="contained" style={{ float: "left" }}>
          <AddIcon />
          Add New Film
        </Button>
      </Link>
      <Table
        style={{
          marginBottom: "20px",
          borderRadius: "8px",
          borderCollapse: "collapse",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                borderRight: "1px solid #ddd",
                backgroundColor: "#3f51b5",
                color: "#fff",
                fontWeight: "bold",
                padding: "10px",
                fontFamily: "Roboto Slab, serif",
              }}
            >
              ID
            </TableCell>
            <TableCell
              style={{
                borderRight: "1px solid #ddd",
                backgroundColor: "#3f51b5",
                color: "#fff",
                fontWeight: "bold",
                padding: "10px",
                fontFamily: "Roboto Slab, serif",
              }}
            >
              Image
            </TableCell>
            <TableCell
              style={{
                borderRight: "1px solid #ddd",
                backgroundColor: "#3f51b5",
                color: "#fff",
                fontWeight: "bold",
                padding: "10px",
                fontFamily: "Roboto Slab, serif",
              }}
            >
              Name
            </TableCell>
            <TableCell
              style={{
                borderRight: "1px solid #ddd",
                backgroundColor: "#3f51b5",
                color: "#fff",
                fontWeight: "bold",
                padding: "10px",
                fontFamily: "Roboto Slab, serif",
              }}
            >
              Status
            </TableCell>
            <TableCell
              style={{
                borderRight: "1px solid #ddd",
                backgroundColor: "#3f51b5",
                color: "#fff",
                fontWeight: "bold",
                padding: "10px",
                fontFamily: "Roboto Slab, serif",
              }}
            >
              Episode
            </TableCell>
            <TableCell
              style={{
                borderRight: "1px solid #ddd",
                backgroundColor: "#3f51b5",
                color: "#fff",
                fontWeight: "bold",
                padding: "10px",
                fontFamily: "Roboto Slab, serif",
              }}
            >
              Studio
            </TableCell>
            <TableCell
              style={{
                borderRight: "1px solid #ddd",
                backgroundColor: "#3f51b5",
                color: "#fff",
                fontWeight: "bold",
                padding: "10px",
                fontFamily: "Roboto Slab, serif",
              }}
            >
              Description
            </TableCell>
            <TableCell
              style={{
                borderRight: "1px solid #ddd",
                backgroundColor: "#3f51b5",
                color: "#fff",
                fontWeight: "bold",
                padding: "10px",
                fontFamily: "Roboto Slab, serif",
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        {animeList.map((anime, index) => (
          <TableBody style={{ backgroundColor: "#e3f2fd" }}>
            <TableRow
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#e3f2fd" : "white",
                "&:hover": {
                  backgroundColor: "#bbdefb",
                },
                border: "1px solid #ddd", // Màu sắc và độ dày của đường giữa
              }}
            >
              <TableCell
                style={{
                  borderRight: "1px solid #ddd",
                  fontFamily: "Roboto Slab, serif",
                }}
              >
                {anime.id}
              </TableCell>
              <TableCell style={{ borderRight: "1px solid #ddd" }}>
                <img
                  style={{
                    width: "200px",
                    height: "300px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  src={anime.image}
                ></img>
              </TableCell>
              <TableCell
                style={{
                  borderRight: "1px solid #ddd",
                  fontFamily: "Roboto Slab, serif",
                }}
              >
                {anime.name}
              </TableCell>
              <TableCell
                style={{
                  borderRight: "1px solid #ddd",
                  fontFamily: "Roboto Slab, serif",
                }}
              >
                {anime.status}
              </TableCell>
              <TableCell
                style={{
                  borderRight: "1px solid #ddd",
                  fontFamily: "Roboto Slab, serif",
                }}
              >
                {anime.episode}
              </TableCell>
              <TableCell
                style={{
                  borderRight: "1px solid #ddd",
                  fontFamily: "Roboto Slab, serif",
                }}
              >
                {anime.studio}
              </TableCell>
              <TableCell
                style={{
                  borderRight: "1px solid #ddd",
                  fontFamily: "Roboto Slab, serif",
                }}
              >
                <p style={{ textOverflow: "ellipsis" }}>{anime.description}</p>
              </TableCell>
              <TableCell style={{ borderRight: "1px solid #ddd" }}>
                <Link to={`/${anime.id}/edit`}>
                  <Button variant="contained" color="primary">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => deleteData(anime.id)}
                >
                  Delete
                </Button>
                <Dialog
                  open={deleteDialogOpen}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Delete Confirmation"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Do you want to delete this film?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      No
                    </Button>
                    <Button
                      onClick={handleConfirmDelete}
                      color="primary"
                      autoFocus
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={successDialogOpen}
                  onClose={handleSuccessClose}
                  aria-labelledby="success-dialog-title"
                >
                  <DialogTitle id="success-dialog-title">
                    {"Success"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="success-dialog-description">
                      Film deleted successfully
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleSuccessClose}
                      color="primary"
                      autoFocus
                    >
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
}
