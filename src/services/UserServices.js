import dataConnection from "../connection-api.json";

export default UserServices = {
  login: async (username, password) => {
    try {
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 1500)
      );

      const fetchRequest = fetch(
        `http://${dataConnection.url}:${dataConnection.port}/user?Username=${username}&Password=${password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = await Promise.race([fetchRequest, timeout]);

      const dataFetch = await response.json();

      if (dataFetch.status === 404) {
        alert("Usuário não encontrado ou senha incorreta.");
      }

      return dataFetch.detail.result[0];
    } catch (error) {
      if (error.message === "Request timed out") {
        alert("Sem conexão com o servidor.");
      }
    }
  },
};
