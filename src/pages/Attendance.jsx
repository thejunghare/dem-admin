import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Databases, Client, Query } from 'appwrite';
import { Table, Container, Form } from 'react-bootstrap';
import axios from 'axios';

const appwrite = new Client();
appwrite
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6648c699000032e4623c');

const databases = new Databases(appwrite);
const GEOAPIFY_API_KEY = 'c66ee1d6102c42a2832965e7a1ae66ba';

const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    const fetchAddress = useCallback(async (latitude, longitude) => {
        try {
            const response = await axios.get(
                `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${GEOAPIFY_API_KEY}`
            );
            if (response.data.features && response.data.features.length > 0) {
                return response.data.features[0].properties.formatted;
            } else {
                return 'Address not found';
            }
        } catch (error) {
            console.error('Error fetching address:', error);
            return 'Error fetching address';
        }
    }, []);

    const fetchAttendance = useCallback(async (selectedDate) => {
        try {
            const startOfDay = `${selectedDate}:00:00:00`;
            const endOfDay = `${selectedDate}:23:59:59`;

            const response = await databases.listDocuments(
                '66502c6e0015d7be8526',
                '5', // Replace with your actual collection ID
                [
                    Query.greaterThanEqual('dateTime', startOfDay),
                    Query.lessThanEqual('dateTime', endOfDay)
                ]
            );

            const attendanceData = await Promise.all(
                response.documents.map(async (record) => {
                    const [latitude, longitude] = record.location.split(','); // Assuming 'location' is the field name
                    const address = await fetchAddress(latitude, longitude);
                    return { ...record, address };
                })
            );
            return attendanceData;
        } catch (error) {
            console.error('Error fetching attendance data:', error);
            return [];
        }
    }, [fetchAddress]);

    const processAttendanceData = useMemo(() => (attendanceData) => {
        const groupedData = {};

        attendanceData.forEach((record) => {
            const { employeeId, dateTime, type, location } = record;

            // Replace the colon between the date and time with a space
            const cleanedDateTime = dateTime.replace(':', ' ');

            // Create a new Date object from the cleaned string
            const dateObj = new Date(cleanedDateTime);

            // Format the time part as hh:mm:ss AM/PM
            const timeOptions = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            };
            const time = dateObj.toLocaleTimeString('en-US', timeOptions);

            if (!groupedData[employeeId]) {
                groupedData[employeeId] = {
                    employeeId,
                    punchIn: '',
                    punchOut: '',
                    punchInLocation: '',
                    punchOutLocation: ''
                };
            }

            if (type === 'In') {
                groupedData[employeeId].punchIn = time;
                groupedData[employeeId].punchInLocation = location;
            } else if (type === 'out') {
                groupedData[employeeId].punchOut = time;
                groupedData[employeeId].punchOutLocation = location;
            }
        });

        return Object.values(groupedData);
    }, []);

    useEffect(() => {
        const getAttendanceData = async () => {
            const data = await fetchAttendance(selectedDate);
            const processedData = processAttendanceData(data);
            setAttendanceData(processedData);
        };

        if (selectedDate) {
            getAttendanceData();
        }
    }, [selectedDate, fetchAttendance, processAttendanceData]);

    return (
        <div>
            <div className='w-25 m-auto m-3'>
                <Form.Group controlId="datePicker">
                    <Form.Control
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </Form.Group>
            </div>

            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Serial No.</th> {/* Serial number header */}
                            <th>Date</th>
                            <th>Employee ID</th>
                            <th>Punch In Time</th>
                            <th>PunchIn Location</th>
                            <th>Punch Out Time</th>
                            <th>Punch Out Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((record, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td> {/* Serial number */}
                                <td>{selectedDate}</td>
                                <td>{record.employeeId}</td>
                                <td>{record.punchIn}</td>
                                <td>{record.punchInLocation}</td>
                                <td>{record.punchOut}</td>
                                <td>{record.punchOutLocation}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default Attendance;
