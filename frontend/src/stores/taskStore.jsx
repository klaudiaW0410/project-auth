import { create } from "zustand";

const apiEnv = import.meta.env.VITE_BACKEND_API;
console.log(apiEnv);

export const taskStore = create((set) => ({
  tasks: [],
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
  setTasks: (tasks) => set({ tasks }),
  // New action to delete all tasks
  deleteAllTasks: async () => {
    try {
      const response = await fetch(`${apiEnv}/deleteAll`, {
        method: "DELETE",
      });
      if (response.ok) {
        set({ tasks: [] }); // Clear the tasks in the state
      } else {
        console.error("Failed to delete tasks");
      }
    } catch (error) {
      console.error(error);
    }
  },
  // New action to fetch tasks
  fetchTasks: async () => {
    try {
      const response = await fetch(`${apiEnv}/get`);
      if (response.ok) {
        const data = await response.json();
        set({ tasks: data });
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error(error);
    }
  },
  // New action to add a task to the server and then to the store
  addTaskToServer: async (task) => {
    try {

      console.log(JSON.stringify({ task: task }))
      const response = await fetch(`${apiEnv}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),

        },
        body: JSON.stringify({ task: task })
      });
      const data = await response.json();

      if (response.ok) {
        set((state) => ({ tasks: [...state.tasks, data] }));
        // Uncomment to forceReload of page
        // location.reload();
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error(error);
    }
  },
  // New action to add a task to the server and then to the store
  // addTaskToServerNEW: async (task) => {
  //   try {
  //     const response = await fetch(`${apiEnv}/add`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ task: task }),
  //     });
  //     const data = await response.json();

  //     if (response.ok) {
  //       set((state) => ({
  //         tasks: [...state.tasks, { task: data.task, _id: data._id }], // Adjust the structure
  //       }));
  //       // ...
  //     } else {
  //       console.error("Failed to add task");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
  // New action to update the boolean is done value in the store -
  handleEdit: async (id) => {
    try {
      const response = await fetch(`${apiEnv}/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedTask = await response.json();

      if (response.ok) {
        console.log("Update successful:", updatedTask);
        // Update the task in the state
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task._id === id ? { ...task, ...updatedTask } : task
          ),
        }));
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error(error);
    }
  },
  // New action to ddelete the specific task by its id
  deleteTaskById: async (id) => {
    try {
      const response = await fetch(`${apiEnv}/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Delete successful");
        // Remove the task from the state
        set((state) => ({
          tasks: state.tasks.filter((task) => task._id !== id),
        }));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  },
}));