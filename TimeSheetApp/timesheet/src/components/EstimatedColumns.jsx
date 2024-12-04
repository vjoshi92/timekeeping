import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiInput from './MuiInput';

export const EstimateColumns = ({ handleInputChange, handleDelete, isEdit }) => {
    return [
        {
            field: "Zkstar",
            headerName: "COSTED ELEMENT",
            flex: 1,
            minWidth: 180,
            renderCell: (params) => (
                <MuiInput
                    disabled={isEdit || false}
                    onChange={(value) => {
                        handleInputChange('Zkstar', value, params?.row?.id)
                    }}
                    value={params?.row?.Zkstar}
                />
            ),
        },
        {
            field: "Capital",
            headerName: "CAPITAL",
            flex: 1,
            minWidth: 180,
            renderCell: (params) => (
                <MuiInput
                    onChange={(value) => {
                        handleInputChange('Capital', value, params?.row?.id)
                    }}
                    value={params?.value || ''}
                />
            ),
        },
        {
            field: "Expense",
            headerName: "EXPENSE",
            flex: 1,
            minWidth: 180,
            renderCell: (params) => (
                <MuiInput
                    onChange={(value) => handleInputChange('Expense', value, params?.row?.id)}
                    value={params?.value || ''}
                />
            ),
        },
        {
            field: "Netvalue",
            headerName: "TOTAL",
            flex: 1,
            minWidth: 180,
            renderCell: (params) => (
                <MuiInput type={'number'}
                    onChange={(value) => handleInputChange('Netvalue', value, params?.row?.id)}
                    value={params?.value}
                />
            ),
        },
        {
            field: "Zcomment",
            headerName: "COMMENTS",
            flex: 1,
            minWidth: 180,
            renderCell: (params) => (
                <MuiInput
                    onChange={(value) => handleInputChange('Zcomment', value, params?.row?.id)}
                    value={params?.value || ''}
                />
            ),
        },
        {
            field: "Actions",
            headerName: "ACTIONS",
            flex: 0.5,
            minWidth: 80,
            renderCell: (params) => (
                <IconButton
                    size="small"
                    sx={{ marginBottom: "10px" }}
                    color="secondary"
                    onClick={() => handleDelete(params?.row?.id)}
                >
                    <DeleteIcon />
                </IconButton>

            ),
        },
    ];

};

