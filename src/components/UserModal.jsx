import React from "react";
import { TERipple } from 'tw-elements-react';

function UserModal({ userData, test, onClose, onConfirm, onReject }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">User Information</h2>
                <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
                <p><strong>Department:</strong> {userData.departmentName}</p>
                <p><strong>Test Theme:</strong> {test.testTheme}</p>
                <div className="mt-4">
                   
                        <a
                            href={test.testUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-center shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700"
                        >
                            Посмотреть тест
                        </a>
                   
                </div>
                <div className="mt-4 flex space-x-4">
                 
                        <button
                            onClick={() => onConfirm(test)}
                            className="inline-block w-full rounded bg-green-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white text-center shadow-[0_4px_9px_-4px_#2d6a4f] transition duration-150 ease-in-out hover:bg-green-700 focus:bg-green-700 active:bg-green-800"
                        >
                            Подтвердить
                        </button>
                  
                 
                        <button
                            onClick={() => onReject(test)}
                            className="inline-block w-full rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white text-center shadow-[0_4px_9px_-4px_#d90429] transition duration-150 ease-in-out hover:bg-red-700 focus:bg-red-700 active:bg-red-800"
                        >
                            Отклонить
                        </button>
                    
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 inline-block w-full rounded bg-gray-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white text-center shadow-[0_4px_9px_-4px_#6c757d] transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-800"
                >
                    Закрыть
                </button>
            </div>
        </div>
    );
}

export default UserModal;
