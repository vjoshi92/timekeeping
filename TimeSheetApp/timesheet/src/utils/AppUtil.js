import dayjs from "dayjs";

export const StatusColorFormatter = (status) => {
  if (status) {
    const sStatus = status.toLowerCase(); // Converts status to lowercase
    switch (sStatus) {
      case "approved":
      case "completed": // All lowercase
        return "#41AF6E";
      case "pending":
        return "orange";
      case "pending for approval":
        return "orange";
      case "open":
      case "in progress":
        return "#ED6A15";
      case "rejected":
        return "#E83D64";
      case "Rejected":
        return "#E83D64";
      case "locked":
        return "#009FE3";
      default:
        return "#009FE3"; // Default color
    }
  } else {
    return "#000"; // Fallback color if no status
  }
};
export const formatDateToISO = (date) => {
  if (!date) return "";

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return null;
  if (dateString.includes("/")) return dateString;
  if (dateString.length !== 8) {
    return null;
  }

  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);

  return `${year}/${month}/${day}`;
};

export const formatFullDateString = (dateValue) => {
  if (dateValue && dateValue !== "0000-00-00") {
    return dayjs(dateValue).format("DD-MMM-YYYY");
  } else {
    if (dateValue === "0000-00-00") {
      return null;
    } else {
      return dateValue;
    }
  }
};

export const formatFullTimeString = (dateValue) => {
  if (dateValue && dateValue !== "0000-00-00") {
    return dayjs(dateValue).format("HH:mm:ss");
  } else {
    if (dateValue === "0000-00-00") {
      return null;
    } else {
      return dateValue;
    }
  }
};

export const StatusCaseFormatting = (status) => {
  if (status) {
    return status.toUpperCase();
  } else {
    return status;
  }
};

export const PrepareBatchPayload = (values) => {
  let batchPayload = [
    "--batch",
    "Content-Type: multipart/mixed; boundary=changeset",
  ];

  values.forEach((item) => {
    batchPayload.push(
      "",
      "--changeset",
      "Content-Type: application/http",
      "Content-Transfer-Encoding: binary",
      "",
      "POST TimeEntryCollection?sap-client=100 HTTP/1.1",
      "Content-Type: application/json",
      "",
      JSON.stringify(item, null, 2)
    );
  });

  batchPayload.push("--changeset--", "", "--batch--");
  const response = batchPayload.join("\n");

  return response;
};

export const getWeekStartDate = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when Sunday is the first day of the week
  const weekStartDate = new Date(today.setDate(diff));
  weekStartDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day
  return weekStartDate;
};
