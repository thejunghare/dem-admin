import React from "react";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

const Header = () => {
    return (
        <Navbar fluid rounded>
            <NavbarBrand href="/home">
                {/*    <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">DEM</span>
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
                <NavbarLink href="/home" active>
                    Dashboard
                </NavbarLink>
                <NavbarLink href="/clients">Client Info</NavbarLink>
                <NavbarLink href="/download-documents">Download</NavbarLink>
                <NavbarLink href="/calling-json-to-excel">Export Json</NavbarLink>
            </NavbarCollapse>
        </Navbar>
    );
};

export default Header;