// FileUploaderModal.js

import React, { useState } from 'react';

const ModalUploudStudyPlanning = ({ isOpen, onClose, onUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            fetch('YOUR_SERVER_ENDPOINT', {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Обработка успешного ответа от сервера
                    console.log('File uploaded successfully:', data);
                    onUpload(data); // Если сервер возвращает какие-то данные после загрузки
                    setSelectedFile(null);
                    onClose();
                })
                .catch(error => {
                    // Обработка ошибки при отправке файла на сервер
                    console.error('There was an error uploading the file:', error);
                    // Можно показать сообщение об ошибке пользователю или предпринять другие действия
                });
        }
    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-6 rounded-lg w-96">
                <div className="mb-4">
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div className="flex justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleUpload}>Upload</button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ModalUploudStudyPlanning;
