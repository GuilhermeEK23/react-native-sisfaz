import dataConnection from "../connection-api.json";

export default ProductServices = {
  requestAllProducts: async () => {
    try {
      const response = await fetch(
        `http://${dataConnection.url}:${dataConnection.port}/productsapp?IdEnterprise=${dataConnection.idEnterprise}&CodeGroupBase=${dataConnection.codeGroupBase}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      const products = responseData.detail.result;
      return products;
    } catch (error) {
      alert("Sem conexão com o servidor.");
      return [];
    }
  },
};
