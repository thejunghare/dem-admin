"use client";

import { useEffect, useState } from "react";
import { useClient } from "../lib/context/ClientContext";
import { Table, TextInput, Button, Modal, Checkbox, Label } from "flowbite-react";
import { FiSearch, FiPlus, FiClipboard } from "react-icons/fi";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Client = () => {
    const { list, docs } = useClient();
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');
    let serialcounter = 1;

    function onCloseModal() {
        setOpenModal(false);
        setEmail('');
    }

    function copy() {
        toast("Welcome back!");
    }

    useEffect(() => {
        list();
    }, [list]);

    return (
        <div className="m-3">
            <ToastContainer />

            <p className="font-semibold text-xs py-3">Your clients</p>

            <div className="flex flex-row items-center justify-between mb-2">
                <form className="flex flex-row items-center justify-start max-w-md mb-2 gap-4">
                    <div>
                        <TextInput id="email1" type="text" sizing="sm" placeholder="client Id" required />
                    </div>

                    <Button type="submit" size={"sm"} pill outline>search <FiSearch className="ml-2 h-5 w-5" /></Button>
                </form>

                <div>
                    <Button onClick={() => setOpenModal(true)} size={"sm"} pill outline>Add client <FiPlus className="ml-2 h-5 w-5" /></Button>
                    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add new client</h3>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="division" value="Division" />
                                    </div>
                                    <TextInput
                                        id="division"
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required
                                        sizing={'sm'}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="name" value="Full Name" />
                                    </div>
                                    <TextInput id="name" type="text" required sizing={'sm'} />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="name" value="Image URL" />
                                    </div>
                                    <TextInput id="name" type="text" required sizing={'sm'} />
                                </div>
                                <div className="w-full mt-2 ">
                                    <Button size={"sm"} pill outline>Add <FiPlus className="ml-2 h-5 w-5" /></Button>
                                </div>

                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>

            <Table>
                <Table.Head>
                    <Table.HeadCell>SR.no</Table.HeadCell>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Division</Table.HeadCell>
                    <Table.HeadCell>Employee Count</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                    {docs && docs.length > 0 ? (
                        docs.map((doc) => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={doc.$id}>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{serialcounter++}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex flex-row items-center"
                                >
                                    {doc.$id}
                                    <CopyToClipboard text={doc.$id} className='ml-2 cursor-pointer' onClick={copy}>
                                        <FiClipboard />
                                    </CopyToClipboard>
                                </Table.Cell>
                                <Table.Cell>{doc.client_name}</Table.Cell>
                                <Table.Cell>{doc.division}</Table.Cell>
                                <Table.Cell>1</Table.Cell>
                                <Table.Cell>
                                    <a href="/" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Edit
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    ) : (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <td colSpan={3} className="p-2">No clients found.</td>
                        </Table.Row>
                    )}

                </Table.Body>
            </Table>
        </div>
    );
};

export default Client;
