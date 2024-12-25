export const StatusColorFormatter = (status) => {
    if (status) {
        const sStatus = status.toLowerCase(); 
        switch (sStatus) {
            case "approved":
                return "#41AF6E";
            case "pending":
                return "#005AA6";
            case "in progress":
                return "#ED6A15";
            case "rejected":
                return "#E83D64";
            default:
                return "#005AA6"; 
        }
    } else {
        return "#000"; 
    }
};

export const formatDateToISO = (date) => {
    if (!date) return "";

    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); 
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};



export const formatDate = (dateString) => {

    if (!dateString) return null;
    if (dateString.includes('/')) return dateString;
    if (dateString.length !== 8) {
        return null;
    }

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    return `${year}/${month}/${day}`;
};