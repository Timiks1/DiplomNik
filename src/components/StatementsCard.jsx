import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import ModalUploudStudyPlanning from './ModalUploudStudyPlanning';

export function StatementsCard() {
    const [statementData, setStatementData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch('your-api-endpoint')
            .then(response => response.json())
            .then(data => setStatementData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className='grid grid-cols-3 gap-5'>
                <Card className=" w-72 cursor-pointer rounded-lg" onClick={openModal}>
                    <CardHeader floated={false} className="h-64 rounded-lg flex items-center justify-center">
                        Формування навчальних планів
                    </CardHeader>
                </Card>
                <Card className=" w-72 cursor-pointer rounded-lg" onClick={openModal}>
                    <CardHeader floated={false} className="h-64 rounded-lg flex items-center justify-center">
                        Формування робочих навчальних планів
                    </CardHeader>
                </Card>
                <Card className=" w-72 cursor-pointer rounded-lg" onClick={openModal}>
                    <CardHeader floated={false} className="h-64 rounded-lg flex items-center justify-center">
                        План навчального навантаження
                    </CardHeader>
                </Card>
                <Card className=" w-72 cursor-pointer rounded-lg" onClick={openModal}>
                    <CardHeader floated={false} className="h-64 rounded-lg flex items-center justify-center">
                        Індивідуальний план викладача
                    </CardHeader>
                </Card>
                <Card className=" w-72 cursor-pointer rounded-lg" onClick={openModal}>
                    <CardHeader floated={false} className="h-64 rounded-lg flex items-center justify-center">
                        План підвищення кваліфікації
                    </CardHeader>
                </Card>
                <Card className=" w-72 cursor-pointer rounded-lg" onClick={openModal}>
                    <CardHeader floated={false} className="h-64 rounded-lg flex items-center justify-center">
                        Заплановані засідання кафедри
                    </CardHeader>
                </Card>
                <ModalUploudStudyPlanning isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </>
    );
}
