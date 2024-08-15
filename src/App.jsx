import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
import Topbar from "./pages/dashboard/global/Topbar";
import Sidebar from "./pages/dashboard/global/Sidebar";
import Dashboard from "./pages/dashboard/index";
import Team from "./pages/team/Team";
import Contact from "./pages/contacts/Contact";
import Invoices from "./pages/invoices/invoices";
import Form from "./pages/form/Form";
import Calendar from "./pages/calendar/Calendar";
import Faq from "./pages/faq/Faq";
import Bar from "./pages/bar/";
import Pie from "./pages/pie";
import Line from "./pages/line/Line";
import Geography from "./pages/geography/Geography";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route
                    path="dashboard"
                    element={<ProtectedRoute element={Dashboard} />}
                  />
                  <Route
                    path="team"
                    element={<ProtectedRoute element={Team} />}
                  />
                  <Route
                    path="contact"
                    element={<ProtectedRoute element={Contact} />}
                  />
                  <Route
                    path="invoices"
                    element={<ProtectedRoute element={Invoices} />}
                  />
                  <Route
                    path="form"
                    element={<ProtectedRoute element={Form} />}
                  />
                  <Route
                    path="calendar"
                    element={<ProtectedRoute element={Calendar} />}
                  />
                  <Route
                    path="faq"
                    element={<ProtectedRoute element={Faq} />}
                  />
                  <Route
                    path="bar"
                    element={<ProtectedRoute element={Bar} />}
                  />
                  <Route
                    path="pie"
                    element={<ProtectedRoute element={Pie} />}
                  />
                  <Route
                    path="line"
                    element={<ProtectedRoute element={Line} />}
                  />
                  <Route
                    path="geography"
                    element={<ProtectedRoute element={Geography} />}
                  />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

const Layout = ({ children }) => {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        {children}
      </main>
    </div>
  );
};

export default App;
