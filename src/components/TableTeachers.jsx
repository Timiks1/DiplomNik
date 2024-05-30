import { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Имя", "Должность", "Номер телефона", "E-mail"];

export function TableTeachers() {
    const [teachers, setTeachers] = useState([]);
    

    useEffect(() => {
        // Fetch data from server here
        fetch("your_server_endpoint_for_teachers")
            .then(response => response.json())
            .then(data => setTeachers(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);



    return (
        <Card className="h-full rounded-lg w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(({ name, position, phone, email }, index) => {
                        const isLast = index === teachers.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={name}>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {name}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {position}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {phone}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {email}
                                    </Typography>
                                </td>

                            </tr>

                        );

                    })}

                </tbody>
            </table>
        </Card>
    );
}
