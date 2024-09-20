import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button, Table, TextInput, Spinner } from "flowbite-react";
import { client } from "../lib/appwritenode";

const sdk = require("node-appwrite");

const users = new sdk.Users(client);

const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await users.list();
        setUserList(response.users);
        setFilteredUserList(response.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users. Please try again.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredUserList(userList);
    } else {
      const filtered = userList.filter((user) =>
        user.email.includes(searchQuery.trim())
      );
      setFilteredUserList(filtered);
    }
  };

  return (
    <div>
      {/* filert */}

      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-start">
          <div>
            <TextInput
              id="Email"
              type="string"
              placeholder="Enter Email"
              required
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <Button outline gradientDuoTone="cyanToBlue" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>

        <div>
          <Button outline gradientDuoTone="cyanToBlue" href="/create-user">
            Create User
          </Button>
        </div>
      </div>

      <div className="m-3 flex items-center justify-center w-full">
        <div className="w-full max-w-7xl">
          {loading ? (
            <div className="absolute w-[50px] h-[50px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Spinner aria-label="Default status example" />;
            </div>
          ) : (
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>User ID</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Phone</Table.HeadCell>
                <Table.HeadCell>Created At</Table.HeadCell>
                <Table.HeadCell>Updated At</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {filteredUserList.length > 0 ? (
                  filteredUserList.map((user) => (
                    <Table.Row key={user.$id}>
                      <Table.Cell>{user.$id}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.name || "N/A"}</Table.Cell>
                      <Table.Cell>{user.phone || "N/A"}</Table.Cell>
                      <Table.Cell>{user.$createdAt || "N/A"}</Table.Cell>
                      <Table.Cell>{user.$updatedAt || "N/A"}</Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan="6">No users found</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          )}
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default UserTable;
