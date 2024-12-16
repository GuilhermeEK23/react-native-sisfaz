import dataConnection from "../connection-api.json";

const convertImageToBase64 = (data) => {
  const byteArray = new Uint8Array(data);
  const base64String = btoa(
    byteArray.reduce((data, byte) => data + String.fromCharCode(byte), "")
  );

  // Gerar a URL Base64
  const imageUrl = `data:image/jpeg;base64,${base64String}`;

  return imageUrl;
};

export default GroupServices = {
  requestAllGroups: async () => {
    try {
      const response = await fetch(
        `http://${dataConnection.url}:${dataConnection.port}/groups?IdEnterprise=${dataConnection.idEnterprise}&CodeGroupBase=${dataConnection.codeGroupBase}`
      );
      const dataResponse = await response.json();
      return dataResponse.detail.result;
    } catch (error) {
      alert("Sem conexão com o servidor.");
      return [];
    }
  },
  filterGroups: (allGroups) => {
    const groupBase = allGroups.find(
      (group) => group.Code === dataConnection.codeGroupBase
    );

    const groups = allGroups.filter(
      (group) => group.ParentIdGroup === groupBase.IdGroup
    );

    groups.forEach((group) => {
      if (group.Image !== null) {
        group.Image = convertImageToBase64(group.Image.data);
      }
      return group;
    });
    return groups;
  },
  filterSubGroups: (allGroups, groupId) => {
    const subGroups = allGroups.filter(
      (group) => group.ParentIdGroup === groupId
    );
    return subGroups;
  },
};
