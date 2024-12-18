import dataConnection from "../connection-api.json";

export default AdditionalServices = {
  requestAdditional: async () => {
    try {
      const response = await fetch(
        `http://${dataConnection.url}:${dataConnection.port}/additional?IdEnterprise=${dataConnection.idEnterprise}`
      );
      const responseData = await response.json();
      const additional = responseData.detail.result;
      return additional;
    } catch (error) {
      alert("Sem conexão com o servidor.");
      return [];
    }
  },
};
