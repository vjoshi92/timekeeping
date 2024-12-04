import axios from "axios";

const baseURL = "JMDNEW/sap/opu/odata/sap/ZCO_CAPEX_V1_SRV";

const instance = axios.create({
  baseURL
});

export const getTableData = async (params = { $top: 100, $skip: 0 }) => {
  const { data } = await instance.get("/Approver_DashboardSet", {
    params
  });

  return data.d?.results || data.d || data.value;
};

export const getTableCount = async () => {
  const { data } = await instance.get("/Approver_DashboardSet/$count");
  return data;
};
