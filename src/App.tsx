import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/system";
import UsersTable from "./components/users/users";

import "./App.css";

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className="app-container">
        <UsersTable />
      </Container>
    </React.Fragment>
  );
};

export default App;
