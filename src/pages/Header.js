import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
  MegaMenu,
  MegaMenuDropdown,
} from "flowbite-react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <MegaMenu>
      <NavbarBrand href="/">
        <img alt="" src="/favicon.svg" className="mr-3 h-6 sm:h-9" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Dem admin
        </span>
      </NavbarBrand>
      <div className="order-2 hidden items-center md:flex">
        <a
          href="#"
          className="mr-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 md:mr-2 md:px-5 md:py-2.5 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Calling app
        </a>
        <Button href="#">Survey app</Button>
      </div>
      <NavbarToggle />
      <NavbarCollapse>
        <NavLink to="/">Home</NavLink>
        <MegaMenuDropdown toggle={<>Features</>}>
          <ul className="grid grid-cols-3">
            <div className="space-y-4 p-4">
              <li>
                <NavLink
                  to="/create-user"
                  className="group flex items-center hover:text-primary-600 dark:hover:text-primary-500"
                >
                  <svg
                    className="me-2 h-3 w-3 text-gray-400 group-hover:text-primary-600 dark:text-gray-500 dark:group-hover:text-primary-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  User
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/download-documents"
                  className="group flex items-center hover:text-primary-600 dark:hover:text-primary-500"
                >
                  <svg
                    className="me-2 h-3 w-3 text-gray-400 group-hover:text-primary-600 dark:text-gray-500 dark:group-hover:text-primary-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  Download JSON
                </NavLink>
              </li>
            </div>
            <div className="space-y-4 p-4">
              <li>
                <a
                  href="#"
                  className="group flex items-center hover:text-primary-600 dark:hover:text-primary-500"
                >
                  <svg
                    className="me-2 h-3 w-3 text-gray-400 group-hover:text-primary-600 dark:text-gray-500 dark:group-hover:text-primary-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M19 4h-1a1 1 0 1 0 0 2v11a1 1 0 0 1-2 0V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a1 1 0 0 0-1-1ZM3 4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4Zm9 13H4a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-3H4a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-3H4a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-3h-2a1 1 0 0 1 0-2h2a1 1 0 1 1 0 2Zm0-3h-2a1 1 0 0 1 0-2h2a1 1 0 1 1 0 2Z" />
                    <path d="M6 5H5v1h1V5Z" />
                  </svg>
                  Birthday count
                </a>
              </li>
              <li>
                <NavLink
                  to="/calling-json-to-excel"
                  className="group flex items-center hover:text-primary-600 dark:hover:text-primary-500"
                >
                  <svg
                    className="me-2 h-3 w-3 text-gray-400 group-hover:text-primary-600 dark:text-gray-500 dark:group-hover:text-primary-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M19 4h-1a1 1 0 1 0 0 2v11a1 1 0 0 1-2 0V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a1 1 0 0 0-1-1ZM3 4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4Zm9 13H4a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-3H4a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-3H4a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-3h-2a1 1 0 0 1 0-2h2a1 1 0 1 1 0 2Zm0-3h-2a1 1 0 0 1 0-2h2a1 1 0 1 1 0 2Z" />
                    <path d="M6 5H5v1h1V5Z" />
                  </svg>
                  Download excel
                </NavLink>
              </li>
            </div>
            <div className="space-y-4 p-4">
              <li>
                <NavLink
                  to="/survey-count"
                  className="group flex items-center hover:text-primary-600 dark:hover:text-primary-500"
                >
                  <svg
                    className="me-2 h-3 w-3 text-gray-400 group-hover:text-primary-600 dark:text-gray-500 dark:group-hover:text-primary-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 14 20"
                  >
                    <path d="M12 0H2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM7.5 17.5h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2ZM12 13H2V4h10v9Z" />
                  </svg>
                  Survey count
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/clients"
                  className="group flex items-center hover:text-primary-600 dark:hover:text-primary-500"
                >
                  <svg
                    className="me-2 h-3 w-3 text-gray-400 group-hover:text-primary-600 dark:text-gray-500 dark:group-hover:text-primary-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 14 20"
                  >
                    <path d="M12 0H2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM7.5 17.5h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2ZM12 13H2V4h10v9Z" />
                  </svg>
                  Client
                </NavLink>
              </li>
            </div>
          </ul>
        </MegaMenuDropdown>
        <NavbarLink href="#">About</NavbarLink>
      </NavbarCollapse>
    </MegaMenu>
  );
};

export default Header;
