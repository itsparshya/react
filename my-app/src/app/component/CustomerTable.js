import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  LinearProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomerTable = ({ customers, setCustomers, handleEditCustomer }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 10 : prev + 10));
    }, 800);

    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    setIsLoading(true);
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/api/users");
        const customers = await response.json();

        for (let i = 0; i < customers.length; i++) {
          customers[i].dob = customers[i].dob.slice(0, 10); 
        }

        //  setTimeout(() => {
          setCustomers(customers);
          setIsLoading(false); //  Stop loading after data is set
        //  }, 3000);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setIsLoading(false); //  Stop loading even if an error occurs
      }
    };

    fetchCustomers();
  }, [setCustomers]);

  const handleDeleteCustomer = async (index) => {
    const userId = customers[index].id;
    console.log("Deleting user...", userId);

    const res = await fetch(`/api/users/delete/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setCustomers((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress sx={{height: "5px"}} variant="determinate" value={progress} />
        </Box>
      )}
      <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#1e1e1e" }}>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell sx={{ backgroundColor: "#1e1e1e" }}>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell sx={{ backgroundColor: "#1e1e1e" }}>DOB</TableCell>
              <TableCell>Aadhaar</TableCell>
              <TableCell sx={{ backgroundColor: "#1e1e1e" }}>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              customers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.dob}</TableCell>
                  <TableCell>{customer.aadhaar}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditCustomer(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteCustomer(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CustomerTable;
