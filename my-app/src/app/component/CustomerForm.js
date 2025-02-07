"use client";

import React, { useState, useEffect } from "react";
import Form from "./form/Form"

const CustomerForm = ({ 
  formValues,
  setShowForm,
  handleClearForm,
  handleInputChange,
  errors,
  validate}) => {


  const handleAddCustomer = async () => {

    if (!validate()) return;

    const newCustomer = { ...formValues };

    console.log("Add user is calling.......",newCustomer);

    //ADD USERS API IS CALLED
    console.log("Add user is calling.......");
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    });

    const result = await res.json();
    // console.log("res :", newCustomer);
    // console.log("User added:", result);

    handleClearForm(); // Clear form after submit
    setShowForm(false); // Hide form after submit
  };



  return (
   <Form  
   formValues={formValues}
   handleAddCustomer={handleAddCustomer}
   handleClearForm={handleClearForm}
   handleInputChange={handleInputChange}
   errors={errors}
   action={"Add"}
   />
  );
};

export default CustomerForm;
