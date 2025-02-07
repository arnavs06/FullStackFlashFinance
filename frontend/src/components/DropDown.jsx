import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";

function Dropdown() {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<MdMenu size="30px" />}
        bg="rgb(0, 51, 81)" 
        color="white"
        _hover={{ bg: "#00509d" }} 
        _active={{ bg: "rgb(0, 40, 65)" }} 
      />
      <MenuList bg="rgb(0, 51, 81)" border="none">
        <MenuItem as={Link} to="/" color="white" _hover={{ bg: "rgba(204, 162, 75, 0.8)" }}>
          Home
        </MenuItem>
        <MenuItem as={Link} to="/login" color="white" _hover={{ bg: "rgba(204, 162, 75, 0.8)" }}>
          Login
        </MenuItem>
        <MenuItem as={Link} to="/about" color="white" _hover={{ bg: "rgba(204, 162, 75, 0.8)" }}>
          About
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default Dropdown;
