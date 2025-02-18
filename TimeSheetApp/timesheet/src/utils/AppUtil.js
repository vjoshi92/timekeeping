import dayjs from "dayjs";

export const StatusColorFormatter = (status) => {
  if (status) {
    const sStatus = status.toLowerCase(); // Converts status to lowercase
    switch (sStatus) {
      case "approved":
      case "completed": // All lowercase
      case "30":
        return "#41AF6E";
      case "pending":
      case "20":
      case "pending for approval":
        return "orange";
      case "open":
      case "in progress":
        return "#ED6A15";
      case "rejected":
      case "40":
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

export const StatusTextFormatting = (status) => {
  if (status == "20") {    
    return "Pending for Approval";
  }else if (status == "30") {    
    return "Approved";
  } else if (status == "40") {    
    return "Rejected";
  }    
  else {
    return "";
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

export const PrepareApprovalBatchPayload = (values) => {
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
      "POST ApprovalDetailsSet?sap-client=100 HTTP/1.1",
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

export const getODataFormatDate = (dateObj) => {
  if (dateObj) {
    const date = dateObj;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}T00:00:00`;
  } else {
    return dateObj;
  }
};

export const getODataFormatDateTime = (dateObj) => {
  if (dateObj) {
    const date = dateObj;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const seco = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${min}:${seco}`;
  } else {
    return dateObj;
  }
};

export const odataGetDateFormat = (dateString) => {
  // Extract timestamp from "/Date(1739232000000)/"
  const timestamp = parseInt(dateString.match(/\d+/)[0], 10);

  // Create a Date object
  const date = new Date(timestamp);

  // Format to yyyy-MM-ddT00:00:00
  const formattedDate = getODataFormatDateTime(date);

  return formattedDate;
};

export const weekTimesheetFormat = (yearWeek) => {
  let year = parseInt(yearWeek.toString().substring(0, 4), 10);
  let week = parseInt(yearWeek.toString().substring(4), 10);

  // Find the first day (Monday) of the given week
  let firstDayOfYear = new Date(year, 0, 1);
  let daysOffset = (week - 1) * 7;
  let startDate = new Date(firstDayOfYear.getTime() + daysOffset * 86400000);

  // Adjust to the first Monday of the week
  let dayOfWeek = startDate.getDay();
  if (dayOfWeek !== 1) {
    startDate.setDate(
      startDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
    );
  }

  // Calculate the last day (Sunday) of the same week
  let endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  // Helper function to format date correctly
  function formatDate(date) {
    let day = date.getDate().toString().padStart(2, "0"); // Ensure two-digit day
    let month = date.toLocaleDateString("en-US", { month: "short" }); // Short month name
    let year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  // Format the output
  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startDate.getDate()} - ${endDate.getDate()} ${startDate.toLocaleDateString("en-US", { month: "short" })} ${year}`;
  } else {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  }
};
