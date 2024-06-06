import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function CustomNavBar() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <Link to="/">
        <NavbarBrand className="flex items-center gap-4">
          <img src={Logo} alt="Company Logo" width={30} />
          <p className="font-bold text-inherit">TravelPlanner.AI</p>
        </NavbarBrand>
      </Link>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link to="/">Home</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/about"}>
          <Link color="foreground" to="/about">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link color={"foreground"} className="w-full" to="/" size="lg">
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color={"foreground"} className="w-full" to="/about" size="lg">
            About
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
      {/* <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent> */}
    </Navbar>
  );
}
