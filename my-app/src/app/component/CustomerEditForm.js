"use client";

import React, { useState, useEffect } from "react";
import Form from "./form/Form";

//import handleSubmit, { updateUser } from "../../api/apis";
//import saveCustomer from "../../api/apis";

const CustomerForm = ({
  setShowTable,
  formValues,
  setShowEditForm,
  handleClearForm,
  handleInputChange,
  errors,
  validate,
}) => {
  


  const handleUpdateCustomer = async () => {
    if (!validate()) return;

    const customer = { ...formValues };

    const res = await fetch(`/api/users/update/${customer.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });

    console.log("res :", res);
    const result = await res.json();
    console.log("User updated:", result);
    

 
    handleClearForm();
    setShowEditForm(false);
    setShowTable(true); // Hide form after submit
  };



  return (
    <Form
      formValues={formValues}
      handleUpdateCustomer={handleUpdateCustomer}
      handleClearForm={handleClearForm}
      handleInputChange={handleInputChange}
      errors={errors}
      action={"Update"}
      validate={validate}
    />
  );
};

export default CustomerForm;
