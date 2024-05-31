import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

class ServerService {
  baseUrl = 'https://localhost:7247/api'; // URL вашего сервера
  currentUserSubject;
  currentUser;

  constructor() {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();

    // Устанавливаем интерсептор для добавления токена в заголовок
    axios.interceptors.request.use(
      config => {
        const user = this.currentUserSubject.value;
        if (user && user.token) {
          config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  login(username, password) {
    console.log('Attempting to login with:', { username, password });
    return axios.post(`${this.baseUrl}/Identity/Login`, { userName: username, password: password })
      .then(response => {
        console.log('Login response:', response.data);
        if (response.data && response.data.token) {
          const user = {
            token: response.data.token,
            expiration: response.data.expiration
          };
          // Сохраняем пользователя в локальном хранилище
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', response.data.token);
          // Устанавливаем пользователя в BehaviorSubject
          this.currentUserSubject.next(user);

          // Получаем текущего пользователя
          return this.getCurrentUser().then(currentUserResponse => {
            const currentUser = currentUserResponse.item;
            console.log('Fetched current user:', currentUser);
            if (currentUser && currentUser.id) {
              const updatedUser = {
                ...user,
                userId: currentUser.id,
                userName: currentUser.userName,
                email: currentUser.email,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                departmentEmail: currentUser.departmentEmail,
                phoneNumber: currentUser.phoneNumber,
                departmentName: currentUser.departmentName,
                departmentId: currentUser.departmentId
              };
              // Обновляем пользователя с ID в локальном хранилище
              localStorage.setItem('currentUser', JSON.stringify(updatedUser));
              // Устанавливаем обновленного пользователя в BehaviorSubject
              this.currentUserSubject.next(updatedUser);
              console.log('Updated User:', updatedUser);
              return updatedUser;
            } else {
              console.error('Current user has no ID:', currentUser);
              throw new Error('Current user has no ID');
            }
          }).catch(error => {
            console.error('Error fetching current user:', error);
            return throwError(error);
          });
        } else {
          console.error('Authentication failed:', response.data);
          return throwError('Authentication failed');
        }
      }).catch(error => {
        console.error('Login error:', error);
        return throwError(error);
      });
  }

  getCurrentUser() {
    console.log('Fetching current user...');
    return axios.get(`${this.baseUrl}/Identity/GetCurrentUser`)
      .then(response => {
        console.log('GetCurrentUser response:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching current user:', error);
        throw error;
      });
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }
  getUserById(userId) {
    return axios.get(`${this.baseUrl}/Users/${userId}`)
      .then(response => {
        console.log('GetUserById response:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching user by ID:', error);
        throw error;
      });
  }
  getDepartments() {
    return axios.get(`${this.baseUrl}/Departments`)
      .then(response => {
        console.log('GetDepartments response:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
        throw error;
      });
  }
  getUsersByDepartmentId(departmentId) {
    return axios.get(`${this.baseUrl}/Users/GetByDepartmentId/${departmentId}`)
      .then(response => {
        console.log('GetUsersByDepartmentId response:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching users by department ID:', error);
        throw error;
      });
  }
  getSyllabiByUserId(userId) {
    return axios.get(`${this.baseUrl}/Syllabi/GetByUserId/${userId}`)
      .then(response => {
        console.log('GetSyllabiByUserId response:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching syllabi by user ID:', error);
        throw error;
      });
  }
  getScientificAndPedagogicalActivitiesByUserId(userId) {
    return axios.get(`${this.baseUrl}/ScientificAndPedagogicalActivities/GetByUserId/${userId}`)
      .then(response => {
        console.log('GetScientificAndPedagogicalActivitiesByUserId response:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching scientific and pedagogical activities by user ID:', error);
        throw error;
      });
  }
  getIndividualPlansByUserId(userId) {
    return axios.get(`${this.baseUrl}/IndividualPlans/GetByUserId/${userId}`)
      .then(response => {
        console.log('GetIndividualPlansByUserId response:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching individual plans by user ID:', error);
        throw error;
      });
  }
  getTraineeshipsByUserId(userId) {
    return axios.get(`${this.baseUrl}/Traineeships/GetByUserId/${userId}`)
      .then(response => {
        console.log('GetTraineeshipsByUserId response:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching traineeships by user ID:', error);
        throw error;
      });
  }
  getTeacherTests() {
    return axios.get(`${this.baseUrl}/TeacherTests`)
      .then(response => {
        console.log('GetTeacherTests response:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching teacher tests:', error);
        throw error;
      });
  }
  async updateTeacherTest(testId, updatedTest) {
    try {
        console.log(updatedTest);
        const response = await axios.put(`${this.baseUrl}/TeacherTests/${testId}`, updatedTest);
        return response.data;
    } catch (error) {
        console.error('Error updating teacher test:', error);
        throw error;
    }
}
  logout() {
    // Удаляем пользователя из локального хранилища
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}

export default new ServerService();
