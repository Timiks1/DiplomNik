import React, { useState, useEffect } from "react";
import { TERipple } from 'tw-elements-react';
import ServerService from '../services/serverService';
import UserModal from "../components/UserModal";

function TestPage() {
    const [tests, setTests] = useState([]);
    const [selectedTest, setSelectedTest] = useState(null);
    const [userData, setUserData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = () => {
        ServerService.getTeacherTests()
            .then(data => {
                const waitingTests = data.items.filter(test => test.status === 'waiting');
                setTests(waitingTests);
            })
            .catch(error => console.error('Error fetching tests:', error));
    };

    const handleCardClick = (test) => {
        ServerService.getUserById(test.teacherId)
            .then(data => {
                setUserData(data.item);
                setSelectedTest(test);
                setModalOpen(true);
            })
            .catch(error => console.error('Error fetching user data:', error));
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setUserData(null);
        setSelectedTest(null);
    };

    const handleConfirm = async (test) => {
        try {
            const updatedTest = { ...test, status: 'ok' };
            await ServerService.updateTeacherTest(test.id, updatedTest);
            fetchTests();
            handleCloseModal();
        } catch (error) {
            console.error('Error confirming test:', error);
        }
    };

    const handleReject = async (test) => {
        try {
            const updatedTest = { ...test, status: 'denied' };
            await ServerService.updateTeacherTest(test.id, updatedTest);
            fetchTests();
            handleCloseModal();
        } catch (error) {
            console.error('Error rejecting test:', error);
        }
    };

    return (
        <>
            <div className="p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {tests.map(test => (
                        <div
                            key={test.id}
                            onClick={() => handleCardClick(test)}
                            className="cursor-pointer block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
                        >
                            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                {test.testTheme}
                            </h5>
                        </div>
                    ))}
                </div>
            </div>
            {modalOpen && userData && selectedTest && (
                <UserModal 
                    userData={userData}
                    test={selectedTest}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirm}
                    onReject={handleReject}
                />
            )}
        </>
    );
}

export default TestPage;
