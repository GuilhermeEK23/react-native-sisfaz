import dataConnection from "../connection-api.json";

export default UserServices = {
  login: async (username, password) => {
    try {
      const response = await fetch(
        `http://${dataConnection.url}:${dataConnection.port}/user?Username=${username}&Password=${password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const dataFetch = await response.json();
      if (dataFetch.status === 404) {
        return null;
      }

      return dataFetch.detail.result[0];
    } catch (error) {
      throw error;
    }
  },
};
