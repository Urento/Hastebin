import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import ViewHaste from ".././haste/ViewHaste";
import App from "../../App";
import { ThemeProvider } from "styled-components";
import Toggle from "../themes/Toggler";
import { GlobalStyles } from "../themes/globalStyles";
import { lightTheme, darkTheme } from "../themes/Themes";
import { useDarkMode } from "../themes/useDarkMode";
import { Languages } from "../language/Languages";
import { Translate } from "../language/Language";

const changeLanguage = (newLang) => {
  window.localStorage.setItem("language", newLang);
  window.location.reload(false);
};

const NavbarTemplate = () => {
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!mountedComponent) return <div />;

  return (
    <Router>
      {theme === "light" ? (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Hastebin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">{Translate("newHaste")}</Nav.Link>
            </Nav>
            <ThemeProvider theme={themeMode}>
              <>
                <GlobalStyles />
                <div className="App">
                  <Toggle theme={theme} toggleTheme={themeToggler} />
                </div>
              </>
            </ThemeProvider>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <Navbar bg="dark" expand="lg">
          <Navbar.Brand href="/" style={{ color: "white" }}>
            Hastebin
          </Navbar.Brand>
          <Navbar.Toggle
            style={{ color: "white" }}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/" style={{ color: "white" }}>
                New Haste
              </Nav.Link>
            </Nav>
            <NavDropdown
              bg="dark"
              style={{ color: "#fff" }}
              title={
                window.localStorage.getItem("language") != null
                  ? window.localStorage.getItem("language")
                  : "Language"
              }
              id="collasible-nav-dropdown"
            >
              {Languages.map((language) => (
                <NavDropdown.Item
                  onClick={() => {
                    changeLanguage(language);
                  }}
                >
                  {language}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <ThemeProvider theme={themeMode}>
              <>
                <GlobalStyles />
                <div className="App">
                  <Toggle theme={theme} toggleTheme={themeToggler} />
                </div>
              </>
            </ThemeProvider>
          </Navbar.Collapse>
        </Navbar>
      )}
      <Switch>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/v/:id" component={ViewHaste} />
        </Switch>
      </Switch>
    </Router>
  );
};

export default NavbarTemplate;
