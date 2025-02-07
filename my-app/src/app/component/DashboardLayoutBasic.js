"use client"

import * as React from "react";
import Image from 'next/image';
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { NextAppProvider } from '@toolpad/core/nextjs';
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import CustomerForm from "./CustomerForm";
import { useState } from "react";
import CustomerTable from "./CustomerTable";
import CustomerEditForm from "./CustomerEditForm"
import { Landmark } from 'lucide-react';

// Updated Navigation with Customer Actions
const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "customers",
    title: "Customers",
    icon: <PersonIcon />,
    children: [
      {
        segment: "add-customer",
        title: "Add Customer",
        icon: <PersonAddIcon />,
      },
      {
        segment: "edit-customer",
        title: "Edit Customer",
        icon: <EditIcon />,
        
      },
      // {
      //   segment: "remove-customer",
      //   title: "Remove Customer",
      //   icon: <PersonRemoveIcon />,
      // },
      {
        segment: "show-customer",
        title: "View Customer",
        icon: <VisibilityIcon />,
      },
    ],
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Operations",
  },
  {
    segment: "add-customer",
    title: "Add Customer",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,

  },
];



const demoTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1976d2', // light theme primary color
        },
        secondary: {
          main: '#f50057', // light theme secondary color
        },
        background: {
          default: '#ffffff', // light background
          paper: '#f4f6f8', // paper background
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#90caf9', // dark theme primary color
        },
        secondary: {
          main: '#ff4081', // dark theme secondary color
        },
        background: {
          default: '#121212', // dark background
          paper: '#1e1e1e', // paper background
        },
      },
    },
  },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});


function useDemoRouter(initialPath) {
  const [pathname, setPathname] = useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const branding = {
  title: 'BANK',
  homeUrl: '',
  logo: <Landmark size={35} />
};



export default function DashboardLayoutBasic(props) {

  const [errors, setErrors] = useState({});
  const [customers, setCustomers] = useState([])
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const router = useDemoRouter("/customers/add-customer");

  const validate = () => {

    console.log("validation is on   ",)
    let newErrors = {};
    if (!formValues.name.trim()) newErrors.name = "Name is required";
    if (!formValues.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formValues.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formValues.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formValues.dob) newErrors.dob = "Date of Birth is required";
    if (!formValues.aadhaar.trim()) {
      newErrors.aadhaar = "Aadhaar number is required";
    } else if (!/^\d{12}$/.test(formValues.aadhaar)) {
      newErrors.aadhaar = "Aadhaar must be 12 digits";
    }
    if (!formValues.address.trim()) newErrors.address = "Address is required";
    if (!formValues.terms) newErrors.terms = "You must agree to terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };


  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    dob: "",
    aadhaar: "",
    address: "",
    terms: false,
  });

  const handleClearForm = () => {
    setFormValues({
      name: "",
      email: "",
      phone: "",
      address: "",
      dob: "",
      aadhaar: "",
      terms: false,
    });
  };

  // Listen for navigation changes
  React.useEffect(() => {
    if (router.pathname === "/customers/add-customer") {
      handleClearForm();
      setShowForm(true); // Show form when route matches
    }
    else {
      setShowForm(false);
    }
    if (router.pathname === "/customers/edit-customer") {

      
      if (formValues.id != null) {
        setShowEditForm(true); // Show form when route matches

      }
    }
    else {
      setShowEditForm(false)

    }
    if (router.pathname === "/customers/show-customer") {
      setShowTable(true); // Show form when route matches
    }
    else {
      setShowTable(false)
    }
    console.log(router.pathname)
    console.log("router : ",router)


  }, [router.pathname, formValues.id]);

  const handleEditCustomer = (index) => {

    //when editing edit form should open in edit customer grid
    router.pathname = "/customers/edit-customer"

    setFormValues(customers[index])

  }


  return (
    
    <AppProvider
      navigation={NAVIGATION} // Pass the updated navigation with the onClick handlers
      router={router}
      theme={demoTheme}
      branding={branding}
    >
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={1}>
            {/* Add the CustomerForm when the state is set to true */}


            
            <Grid size={100}>
              {showForm &&
                <CustomerForm
                  formValues={formValues}
                  setFormValues={setFormValues}
                  setShowForm={setShowForm}
                  handleClearForm={handleClearForm}
                  handleInputChange={handleInputChange}
                  errors={errors}
                  validate={validate} />}
            </Grid>

            <Grid size={100}>
              {showEditForm &&
                <CustomerEditForm
                  setShowTable={setShowTable}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  setShowEditForm={setShowEditForm}
                  handleClearForm={handleClearForm}
                  handleInputChange={handleInputChange}
                  errors={errors}
                  validate={validate} />}
            </Grid>

            <Grid size={100}>
              {showTable &&
                <CustomerTable
                  customers={customers}
                  setCustomers={setCustomers}
                  handleEditCustomer={handleEditCustomer} />}
            </Grid>

            {/* Add other layout content here */}
            <NextAppProvider>
      </NextAppProvider>

          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
