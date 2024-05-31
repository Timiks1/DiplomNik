import React, { useEffect, useState } from 'react';
import { useServer } from '../contexts/ServerContext';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const TeachersPage = () => {
  const [departmentId, setDepartmentId] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [syllabi, setSyllabi] = useState([]);
  const [activities, setActivities] = useState([]);
  const [individualPlans, setIndividualPlans] = useState([]);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const serverService = useServer();

  useEffect(() => {
    const fetchDepartmentAndUsers = async () => {
      try {
        const departmentsResponse = await serverService.getDepartments();
        const department = departmentsResponse.items.find(dep => dep.description === 'Teachers');
        if (department) {
          localStorage.setItem('teachersDepartmentId', department.id);
          setDepartmentId(department.id);
          console.log('Teachers department ID saved:', department.id);

          // Получаем пользователей по ID департамента
          const usersResponse = await serverService.getUsersByDepartmentId(department.id);
          setUsers(usersResponse.items);
          console.log('Users fetched:', usersResponse.items);
        } else {
          console.error('Teachers department not found');
          setError('Teachers department not found');
        }
      } catch (err) {
        console.error('Error fetching departments or users:', err);
        setError('Error fetching departments or users');
      }
    };

    fetchDepartmentAndUsers();
  }, [serverService]);

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);

    try {
      const syllabiResponse = await serverService.getSyllabiByUserId(user.id);
      setSyllabi(syllabiResponse.items);
      console.log('Syllabi fetched:', syllabiResponse.items);

      const activitiesResponse = await serverService.getScientificAndPedagogicalActivitiesByUserId(user.id);
      setActivities(activitiesResponse.items);
      console.log('Activities fetched:', activitiesResponse.items);

      const individualPlansResponse = await serverService.getIndividualPlansByUserId(user.id);
      setIndividualPlans(individualPlansResponse.items);
      console.log('Individual Plans fetched:', individualPlansResponse.items);
    } catch (err) {
      console.error('Error fetching syllabi, activities or individual plans:', err);
      setError('Error fetching syllabi, activities or individual plans');
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
    setSyllabi([]);
    setActivities([]);
    setIndividualPlans([]);
  };

  const downloadFile = (fileContent, fileName) => {
    const link = document.createElement('a');
    link.href = `data:application/octet-stream;base64,${fileContent}`;
    link.download = fileName;
    link.click();
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teachers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map(user => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleUserClick(user)}
          >
            <h2 className="text-lg font-semibold mb-2">{user.firstName} {user.lastName}</h2>
            <p className="text-gray-700 mb-1">{user.email}</p>
            <p className="text-gray-600">{user.phoneNumber}</p>
          </div>
        ))}
      </div>

      {selectedUser && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Teacher Details"
          className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto my-8"
          overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
        >
          <h2 className="text-2xl font-bold mb-4">{selectedUser.firstName} {selectedUser.lastName}</h2>
          <p className="text-gray-700 mb-2">Email: {selectedUser.email}</p>
          <p className="text-gray-700 mb-2">Phone: {selectedUser.phoneNumber}</p>
          <p className="text-gray-700 mb-2">Department: {selectedUser.departmentName}</p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">Syllabi</h3>
          <ul className="list-disc pl-5">
            {syllabi.map(syllabus => (
              <li key={syllabus.id} className="mb-2">
                {syllabus.name}
                <button
                  onClick={() => downloadFile(syllabus.file, `${syllabus.name}.pdf`)}
                  className="ml-4 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Download
                </button>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mt-4 mb-2">Scientific and Pedagogical Activities</h3>
          <ul className="list-disc pl-5">
            {activities.map(activity => (
              <li key={activity.id} className="mb-2">
                {activity.name}
                <button
                  onClick={() => downloadFile(activity.file, `${activity.name}.pdf`)}
                  className="ml-4 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Download
                </button>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mt-4 mb-2">Individual Plans</h3>
          <ul className="list-disc pl-5">
            {individualPlans.map(plan => (
              <li key={plan.id} className="mb-2">
                {plan.name}
                <button
                  onClick={() => downloadFile(plan.file, `${plan.name}.pdf`)}
                  className="ml-4 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Download
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default TeachersPage;
