import React, { useState } from "react";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { Client, Users } from "node-appwrite";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6648c699000032e4623c")
  .setKey(
    "6999a3b40772137237646f8485adbe712ddabbfc8868bc6e2450617391e03f6911fb8732a18b41412a93eb1ee820ad989bea2566729c8001a04ad1dfc63fb64cc31df7bf0361167d28b99c89982733c5d1a600b65470bf744669631ae2c0716e393b26314fe9c5fb6e39bc72da709d23a82eb75f986490d02738f1211476fd91"
  );

const users = new Users(client);

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password } = formData;

    try {
      const userResponse = await users.create(
        uuidv4(),
        email,
        phone,
        password,
        name
      );

      console.log("User created successfully:", userResponse);
      toast.success("User created successfully !!");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(
        "Failed to create user. A user with the same email, or phone already exists !!"
      );
    }
  };

  return (
    <div className="flex justify-center">
      <div>
        <Toaster />
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name" value="Full Name" />
          <TextInput
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email" value="Email Address" />
          <TextInput
            id="email"
            type="email"
            placeholder="name@flowbite.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone" value="Phone Number" />
          <TextInput
            id="phone"
            type="text"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="password" value="Password" />
          <TextInput
            id="password"
            type="password"
            placeholder="Enter a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default CreateUser;
