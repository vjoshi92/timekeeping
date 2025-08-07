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

export const formatDDMMMYYYYDateString = (dateValue) => {
  if (dateValue && dateValue !== "00000000") {
    return dayjs(dateValue).format("DD MMM YYYY");
  } else {
    if (dateValue === "00000000") {
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
  } else if (status == "30") {
    return "Approved";
  } else if (status == "40") {
    return "Rejected";
  } else if (status == "10") {
    return "Draft";
  } else {
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
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

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
  if (yearWeek) {
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
    // if (startDate.getMonth() === endDate.getMonth()) {
    //   return `${startDate.getDate()} - ${endDate.getDate()} ${startDate.toLocaleDateString("en-US", { month: "short" })} ${year}`;
    // } else {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    // }
  } else {
    return yearWeek;
  }
};

export const xmlToJson = (xml) => {
  // Create the return object
  let obj = {};

  if (xml.nodeType === 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (let j = 0; j < xml.attributes.length; j++) {
        const attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) {
    // text
    obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i);
      const nodeName = item.nodeName;
      if (typeof obj[nodeName] === "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push === "undefined") {
          const old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
};

export const readXmlData = (metaData) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(metaData, "application/xml");
  const xmljson = xmlToJson(xml);
  const entities = xmljson["edmx:Edmx"]["edmx:DataServices"].Schema.EntityType;
  return entities;
};

export const hasNonZeroEntry = (data) => {
  for (let i = 0; i <= 6; i++) {
    const dayKey = `day${i}`;
    if (parseFloat(data[dayKey]) > 0) {
      return true; // Found a non-zero value
    }
  }
  return false; // No non-zero value found
};

export const hasValidTimeEntry = (data) => {
  for (let i = 0; i <= 6; i++) {
    const dayKey = `day${i}`;
    if (parseFloat(data[dayKey]) > 23) {
      return false;
    }
  }
  return true;
};

export const checkStatusCondition = (objectsArray, status) => {
  // Loop through each object in the array
  for (let obj of objectsArray) {
    // Check each day0STATUS to day6STATUS key for the "40" value
    for (let i = 0; i <= 6; i++) {
      const statusKey = `day${i}STATUS`;
      if (obj[statusKey] === status) {
        return true; // Return true if the condition is met
      }
    }
  }
  return false; // Return false if no object meets the condition
};

export const roundToNearestQuarter = (value) => {
  return Math.round(value * 4) / 4;
};

export const sortDatewiseArray = (aItems) => {
  return aItems.sort((a, b) => {
    const dateA = new Date(
      a?.BEGDA.slice(0, 4),
      a?.BEGDA.slice(4, 6) - 1,
      a?.BEGDA.slice(6, 8)
    );
    const dateB = new Date(
      b?.BEGDA.slice(0, 4),
      b?.BEGDA.slice(4, 6) - 1,
      b?.BEGDA.slice(6, 8)
    );

    return dateB - dateA || a?.EName?.localeCompare(b?.EName); // Compare dates
  });
};

export const getCurrentEnvirnment = () => {
  const origin = window.location.origin;
  if (
    origin.includes("localhost") ||
    origin.includes(
      "ks6l-ft-2sbp6d06.launchpad.cfapps.us10.hana.ondemand.com"
    ) ||
    origin.includes("jmweccd1.jmawireless.com:8000")
  ) {
    return "DEV";
  } else if (
    origin.includes(
      "jma-fiori-44n6rxen.launchpad.cfapps.us10.hana.ondemand.com"
    ) ||
    origin.includes("jmweccq1.jmawireless.com")
  ) {
    return "QA";
  } else {
    return "PROD";
  }
};

export const checkStatusConditionForRow = (objectsArray, status, rowId) => {
  const filteredData = objectsArray.filter((x) => x.id === rowId);
  // Loop through each object in the array
  for (let obj of filteredData) {
    // Check each day0STATUS to day6STATUS key for the "40" value
    for (let i = 0; i <= 6; i++) {
      const statusKey = `day${i}STATUS`;
      if (obj[statusKey] === status) {
        return true; // Return true if the condition is met
      }
    }
  }
  return false; // Return false if no object meets the condition
};

export const WeekChecker = ({ weekRange }) => {
  if (weekRange) {
    // Example input: "19 May 2025 - 25 May 2025"
    const [startStr, endStr] = weekRange.split(" - ");

    // Convert to Date objects
    const startDate = new Date(startStr);
    const endDate = new Date(endStr);

    // Normalize current date (set to midnight)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Normalize start and end dates too
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    let status = "";
    if (today < startDate) {
      status = "F";
    } else if (today > endDate) {
      status = "P";
    } else {
      status = "C";
    }
    return status;
  }
};

export const isCurrentDateAfter = (datestring) => {
  if (datestring) {
    // Parse the string into a JavaScript Date
    const year = parseInt(datestring.substring(0, 4), 10);
    const month = parseInt(datestring.substring(4, 6), 10) - 1; // Month is 0-based
    const day = parseInt(datestring.substring(6, 8), 10);
    const inputDate = new Date(year, month, day);

    // Get today's date (set time to 00:00:00 to match date-only comparison)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return inputDate >= today;
  } else {
    return true;
  }
};

export const getFormattedDate = (dateRangeStr) => {
  if (!dateRangeStr || dateRangeStr.trim() === "") {
    // Return current date in yyyyMMdd
    const now = new Date();
    return now.toISOString().slice(0, 10).replace(/-/g, "");
  }

  // Extract first date
  const firstDateStr = dateRangeStr.split("-")[0].trim();

  // Parse the date
  const date = new Date(firstDateStr);

  // Check if the date is valid
  if (isNaN(date)) {
    // Fall back to current date
    const now = new Date();
    return now.toISOString().slice(0, 10).replace(/-/g, "");
  }

  return date.toISOString().slice(0, 10).replace(/-/g, "");
};

export const getStartAndEndDateFromWeekNumber = (weekStr) => {
  const year = parseInt(weekStr.slice(0, 4), 10);
  const week = parseInt(weekStr.slice(4), 10);

  // Step 1: Get date for Jan 4 of the given year (ensures we're in ISO week 1)
  const jan4 = new Date(year, 0, 4); // January 4th
  const jan4Day = jan4.getDay() || 7; // Make Sunday (0) = 7

  // Step 2: Get Monday of the first ISO week
  const firstMonday = new Date(jan4);
  firstMonday.setDate(jan4.getDate() - jan4Day + 1);

  // Step 3: Calculate Monday of the target week
  const startDate = new Date(firstMonday);
  startDate.setDate(startDate.getDate() + (week - 1) * 7);

  // Step 4: Calculate Sunday of that week
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  // Step 5: Format date as "DD MMM YYYY"
  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return {
    start: formatDate(startDate),
    end: formatDate(endDate),
  };
};
