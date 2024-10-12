// async function fetchData(url, method, title, newTitle, token) {
//   //   if (!token && (!url.includes("/login") || !url.includes("/register"))) {
//   //     throw new Error("token is required");
//   //   }
//   if (!token) {
//     throw new Error("token is required");
//   }

//   if (["DELETE", "PUT", "POST"].includes(method)) {
//     options.body = JSON.stringify(
//       newTitle != null ? { title, newTitle } : { title }
//     );
//   }
//   if (token) {
//     options.headers.Authorization = token;
//   }

//   try {
//     let response = await fetch(`${url}/tasks`, options);
//     let responseJsonData = await response.json();
//     if (response.ok) {
//       return responseJsonData;
//     } else {
//       // return Promise.reject({ message: "Cannot load data ", status: response.status });
//       throw new Error({
//         message: "Cannot load data ",
//         status: response.status,
//       });
//     }
//   } catch (exc) {
//     throw exc;
//     // return Promise.reject(exc);
//   }
// }

class TaskService {
    private getToken() {
      return localStorage.getItem("access_token") || null;
    }
  
    async updateTask(title: string, newTitle: string) {
      const token = this.getToken();
      if (!token) {
        throw new Error("token is required, please login.");
      }
  
      const response = await fetch(`${config.url}/tasks`, {
        body: JSON.stringify({ title, newTitle }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        return Promise.reject(await response.json());
      }
  
      return response.json();
    }
  }
  
  const taskService = new TaskService();
  
  button.addEventListener("click", async () => {
    const result = await taskService.updateTask('sdfsdf', 'sdfs');
  });
  