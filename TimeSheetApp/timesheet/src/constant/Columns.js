
import { Checkbox, Input, Link, Stack, TextField, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from "@mui/icons-material/Delete";
import { StatusColorFormatter } from "../utils/AppUtil";
import EditIcon from '@mui/icons-material/Edit';
import { CheckBox } from "@mui/icons-material";
import MuiInput from "../components/MuiInput";



export const AttachmentColumns = [
    {
        field: "name",
        headerName: "FILE NAME",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Link>
                {" "}
                <Typography sx={{ fontWeight: 700, color: "#009FE3" }}>
                    {params.value}
                </Typography>{" "}
            </Link>
        ),
    },
    {
        field: "FILE_NAME",
        headerName: "ACTIONS",
        flex: 0.2,
        minWidth: 180,
        renderCell: (params) => <DeleteIcon color="error" />,
    },
];



export const EstimateColumns = [
    {
        field: "name",
        headerName: "COSTED ELEMENT",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Input size="small" />
        ),
    },
    {
        field: "CapitalName",
        headerName: "CAPITAL",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Input size="small" />
        ),
    },
    {
        field: "ExpenseName",
        headerName: "EXPENSE",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Input size="small" />
        ),
    },
    {
        field: "Totaname",
        headerName: "TOTAL",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Input size="small" />
        ),
    },
    {
        field: "CommentsName",
        headerName: "COMMENTS",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Input size="small" />
        ),
    },
    {
        field: "ActionsName",
        headerName: "ACTIONS",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Input size="small" />
        ),
    },

];

export const RequestColumns = [
    {
        headerName: "PR ID", field: "Zaufnr", flex: 1, minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1">
                {params.value}
            </Typography>
        ),
    },
    {
        headerName: "APPROVER", field: "Ktext", flex: 1, minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1">
                {params.value}
            </Typography>
        ),
    },
    {
        headerName: "APPROVAL STATUS", field: "Zaufnrstat", flex: 1, minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1" textTransform={"uppercase"} sx={{ fontWeight: 600, color: StatusColorFormatter(params.value) }}>
                {params.value}
            </Typography>
        ),
    },
    {
        headerName: "DATE", field: "Zappr1date", flex: 1, minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1">
                {params.value}
            </Typography>
        ),
    },
    {
        headerName: "TIME", field: "Zappr1time", flex: 1, minWidth: 180, renderCell: (params) => (
            <Typography variant="body1">
                {params.value}
            </Typography>
        ),
    },
];

export const RequestDetailColumns = [
    {
        headerName: "Description",
        field: "Description",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1">
                {params.value}
            </Typography>
        ),
    },
    {
        headerName: "Quantity",
        field: "Quantity",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1">
                {params.value}
            </Typography>
        ),
    },
    {
        headerName: "Unit",
        field: "Unit",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1">
                {params.value}
            </Typography>
        ),
    },
    {
        headerName: "Value Price",
        field: "ValuePrice",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1">
                $ {params.value}
            </Typography>
        ),
    },
    {
        headerName: "Total Value",
        field: "TotalValue",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                $ {params.value}
            </Typography>
        ),
    },
    {
        field: "DUMMY",
        headerName: "ACTIONS",
        flex: 0.2,
        minWidth: 180,
        renderCell: (params) =>
            <Stack spacing={1} direction={"row"}>
                <VisibilityIcon sx={{ fontSize: "24px", cursor: "pointer" }} color="primary" />
                <EditIcon sx={{ fontSize: "24px", cursor: "pointer" }} color="primary" />
                <DeleteIcon sx={{ fontSize: "24px", cursor: "pointer" }} color="error" />
            </Stack>,
    },
];

export const ReviewOrderColumns = [
    {
        headerName: "Material",
        field: "Material",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1" fontWeight={400}>
                {params.value}
            </Typography>
        ),
    },
    {
        headerName: "VENDOR MATERIAL NUMBER",
        field: "VendorMaterial",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <TextField variant="standard" size="small" style={{ fontWeight: 400, }} value={params.value} />
        ),
    },
    {
        headerName: "ORDERED QTY",
        field: "OrderQty",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1" fontWeight={400}>
                {params.value}
            </Typography>
        ),
    },
    {
        headerName: "QTY REC.",
        field: "OrderRec",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1" fontWeight={400}>
                {params.value}
            </Typography>
        ),
    },
    {
        headerName: "QTY IN UNIT",
        field: "Qty",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <TextField variant="standard" size="small" style={{ fontWeight: 400, }} value={params.value} />
        ),
    },
    {
        headerName: "DEL. DATE",
        field: "DelDate",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1" fontWeight={400}>
                {params.value}
            </Typography>
        ),
    },
    {
        headerName: "Unloading Pt",
        field: "UnloadingPoint",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <TextField variant="standard" size="small" style={{ fontWeight: 400, }} value={params.value} />
        ),
    },

    {
        headerName: "Del. Compl.",
        field: "DelComp",
        flex: 1,
        minWidth: 100,
        renderCell: (params) => (
            <Checkbox sx={{ paddingTop: "0px" }} size="small" />

        ),
    },
    {
        headerName: "Items Ok",
        field: "ItemOk",
        flex: 1,
        minWidth: 100,
        renderCell: (params) => (
            <Checkbox checked={true} sx={{ paddingTop: "0px" }} onChange={(evnt) => console.log("selected value", evnt.target.checked)} size="small" />

        ),
    },
];

export const getCurrentWeekDays = () => {
    const today = new Date();
    const dayOfWeek = today?.getDay();
    const days = [];

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today?.getDate() - dayOfWeek);

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + i);
        days.push({
            day: currentDate?.toLocaleString('en-us', { weekday: 'short' }),
            date: currentDate?.getDate(),
        });
    }

    const todayIndex = days?.findIndex((d) => d.day === today.toLocaleString('en-us', { weekday: 'short' }));
    const rearrangedDays = [
        ...days?.slice(todayIndex),
        ...days?.slice(0, todayIndex),
    ];

    return rearrangedDays;
};

const handleInputChange = (field, value) => {

};


export const PRColumns = [
    {
        field: 'Data',
        headerName: '',
        width: 200,
    },
    ...getCurrentWeekDays().map((dayObj, index) => ({
        field: `day${index + 1}`,
        headerName: `${dayObj.day} ${dayObj.date}`,
        width: 140,
        renderCell: (params) => (
            <MuiInput variant="standard" size="small" style={{ fontWeight: 400, }} value={params.value} onChange={(value) => handleInputChange("Comments", value)} />
        ),
    })),
    {
        field: 'Actions',
        headerName: '',
        width: 160,
    },
];

export const POColumns = [
    {
        headerName: "PR ID",
        field: "Zaufnr",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1">
                {params.value}
            </Typography>
        ),
    },
    {
        headerName: "Stage",
        field: "PoStage1",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1">

            </Typography>
        ),
    },
    {
        headerName: "Approver",
        field: "Appr1Name",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {params.value}
            </Typography>
        ),
    },
    {
        headerName: "Approval Status",
        field: "PoStatus",
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1" textTransform={"uppercase"} sx={{ fontWeight: 600, color: StatusColorFormatter(params.value) }}>
                {params.value}
            </Typography>
        ),
    },
    {
        headerName: "DATE", field: "PoApprovaldate1", flex: 1, minWidth: 180,
        renderCell: (params) => (
            <Typography variant="body1">
                {params.value}
            </Typography>
        ),
    },
    {
        headerName: "TIME", field: "PoApprovaltime1", flex: 1, minWidth: 180, renderCell: (params) => (
            <Typography variant="body1">
                {params.value}
            </Typography>
        ),
    },
];