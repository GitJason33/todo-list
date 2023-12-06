import { myFetch } from "./fetch.config.js";


class TaskService {
  /** get todos at some page starting from 1 */
  static async getAll(page = 1) {
    const res = await myFetch("GET", `/task/all?page=${page}`);
    return res;
  }



  /** get sample todos for home page */
  static async getExamples() {
    const res = await myFetch("GET", `/task/examples`);
    return res;
  }



  /** get a todo using its ID, if the user don't own it, it will return not found */
  static async getOne(id) {
    const res = await myFetch("GET", `/task/${id}`);
    return res;
  }



  static async create(data) {
    const res = await myFetch("POST", `/task`, {
      body: data,
    });
    return res;
  }
  
  
  
  static async edit(id, data) {
    const res = await myFetch("PUT", `/task/${id}`, {
      body: data,
    });
    return res;
  }



  static async markAsDone(id) {
    const res = await myFetch("PUT", `/task/done/${id}`);
    return res;
  }



  static async delete(id) {
    const res = await myFetch("DELETE", `/task/${id}`);
    return res;
  }
}

export default TaskService;
