import React, { useState } from "react";

import { CSSTransition } from "react-transition-group";
import { styled, makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
// import { ArrowDropDownIcon } from "@material-ui/icons/ArrowDropDown";
import { ArrowDropDown } from "@material-ui/icons";

// --bg:  #242526;
// --bg-accent: #484a4d;
// --text-color: #dadce1;
// --nav-size: 60px;
// --border: 1px solid #474a4d;
// --border-radius: 8px;
// --speed: 500ms;

const navigationStyle = makeStyles({
  navbar: {
    position: "fixed",
    height: "var(60px)",
    backgroundColor: "grey",
    padding: "0 1rem",
    borderBottom: " var(1px solid #474a4d)",
    "& ul": {
      listStyle: "none",
      margin: "0",
      padding: "0",
    },
  },

  navbarNav: {
    backgroundColor: "grey",
    maxWidth: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    "& a": {
      textDecoration: "none",
    },
  },
  navItem: {
    width: "calc(var(60px)*.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    width: "calc(var(60px) * 0.5)",
    height: "calc(var(60px) * 0.5)",
    borderRadius: "50%",
    padding: "5px",
    margin: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "filter 300ms",
    "& :hover": {
      filter: "brightness(1.2)",
    },
  },
});

const dropDownStyle = makeStyles({
  dropdown: {
    position: "absolute",
    top: "58px",
    width: "300px",
    transform: "translateX(-45%)",
    padding: "1rem",
    overflow: "hidden",
    transition: "height var(500ms) ease",
  },
  menu: {
    width: "100%",
  },
  menuItem: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    transition: "background var(500ms)",
    padding: "0.5rem",
  },
  iconLeft: {},
  iconRight: {},
});

function NavBarTest() {
  return (
    <Navbar>
      <NavItem icon="🔥" />
      <NavItem icon="🔥" />
      <NavItem icon={<ArrowDropDown />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar({ children }) {
  const style = navigationStyle();

  return (
    <nav className={style.navbar}>
      <ul className={style.navbarNav}>{children}</ul>
    </nav>
  );
}

function NavItem({ icon, children }) {
  const [open, setOpen] = useState(false);
  const style = navigationStyle();

  return (
    <li className={style.navItem}>
      <a href="#" className={style.iconButton} onClick={() => setOpen(!open)}>
        {icon}
      </a>

      {open && children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const style = dropDownStyle();

  function DropdownItem({ leftIcon, rightIcon, children }) {
    return (
      <Link href="#" className={style.menuItem}>
        <span className={style.iconLeft}>{leftIcon}</span>
        {children}
        <span className={style.iconRight}>{rightIcon}</span>
      </Link>
    );
  }

  return (
    <Box className={style.dropdown}>
      <DropdownItem>Foo</DropdownItem>
      <DropdownItem leftIcon={<ArrowDropDown />}>Bar</DropdownItem>
    </Box>
  );
}

export default NavBarTest;
