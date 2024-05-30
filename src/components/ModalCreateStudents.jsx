import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import axios from 'axios';

export default function ModalCreateStudents({ isOpen, onClose }) {
    const [studentName, setStudentName] = useState('');
    const [studentAge, setStudentAge] = useState('');
    const [studentGrade, setStudentGrade] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [studentPhone, setStudentPhone] = useState('');
    const [course, setCourse] = useState('');

    const handleCreateStudent = async () => {
        try {
            const response = await axios.post('YOUR_SERVER_ENDPOINT', {
                name: studentName,
                age: studentAge,
                grade: studentGrade,
                email: studentEmail,
                phone: studentPhone
            });

            console.log('Student created:', response.data);
        } catch (error) {
            console.error('Error creating student:', error);
        }
    };

    return (
        <Transition
            show={isOpen}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed inset-0 overflow-y-auto z-50">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
                    <Transition.Child
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="fixed inset-0 transition-opacity"
                        aria-hidden="true"
                    >
                        <div className="absolute inset-0 bg-gray-500 opacity-75" />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                    >
                        <div className="mt-3 sm:text-center">

                            <label htmlFor="student-name" className="block text-lg pb-3 font-bold text-gray-700">
                                Створення студента
                            </label>
                            <select
                                id="course"
                                className="mt-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                            >
                                <option value="">Оберіть курс</option>
                                <option value="1">1 курс</option>
                                <option value="2">2 курс</option>
                                <option value="3">3 курс</option>
                                <option value="4">4 курс</option>
                            </select>
                            <div className='flex gap-4'>
                                <input
                                    type="text"
                                    id="student-name"
                                    className="mt-5 focus:ring-primary-500 h-8 focus:border-primary-500 pl-3 border w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    placeholder="ПІП студента"
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    id="student-age"
                                    className="mt-5 h-8 focus:ring-primary-500 focus:border-primary-500 pl-3 border w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Дата народження: dd.mm.yy"
                                    value={studentAge}
                                    onChange={(e) => setStudentAge(e.target.value)}
                                />
                            </div>
                            <div className='flex gap-4'>
                                <input
                                    type="email"
                                    id="student-email"
                                    className="mt-3 h-8 focus:ring-primary-500 focus:border-primary-500 pl-3 border w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Пошта:student@gmail.com"
                                    value={studentEmail}
                                    onChange={(e) => setStudentEmail(e.target.value)}
                                />
                                <input
                                    type="text"
                                    id="student-phone"
                                    className="mt-3 h-8 focus:ring-primary-500 focus:border-primary-500 pl-3 border w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Телефон: +380  __ ___ __ __"
                                    value={studentPhone}
                                    onChange={(e) => setStudentPhone(e.target.value)}
                                />
                            </div>
                            <div className='flex gap-10 justify-between'>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="mt-10 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-400 bg-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                    Отмена
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCreateStudent}
                                    className="mt-10 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-700 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                    Создать студента
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </div>
        </Transition>
    );
}
