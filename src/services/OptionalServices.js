import dataConnection from "../connection-api.json";

export const OptionalServices = {
  requestOptionalsByProduct: async (IdProduct) => {
    try {
      const response = await fetch(
        `http://${dataConnection.url}:${dataConnection.port}/optional?IdProduct=${IdProduct}`
      );
      const data = await response.json();
      const optionals = data.detail.result;

      return optionals;
    } catch (error) {
      console.error(error);
      alert("Sem conexão com o servidor.");
      return [];
    }
  },
};
