import * as React from 'react';
import Button from '@mui/material/Button';
import useForkRef from '@mui/utils/useForkRef';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Use DatePicker instead
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useDispatch } from 'react-redux';
import { setDateRange } from '../store/slice/HomeSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import styled from '@emotion/styled';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ED6A15',
        },
    },
    components: {
        MuiDayCalendar: {
            styleOverrides: {
                header: {
                    color: '#ED6A15',
                },
                weekDayLabel: {
                    color: '#ED6A15',
                },
                root: {
                    '& .Mui-selected': {
                        backgroundColor: '#ED6A15', 
                        '&:hover': {
                            backgroundColor: '#ED6A15'
                        }
                        
                    },
                },
            },
        },
    },
});

const StyledButton = styled(Button)(({ theme }) => ({
    border: "1px solid #BDBDBD",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
    transition: "box-shadow 0.3s ease-in-out", 
    "&:hover": {
      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)", 
    },
}));


const DateButtonField = React.forwardRef((props, ref) => {
    const {
        setOpen,
        label,
        id,
        disabled,
        InputProps: { ref: containerRef } = {},
        inputProps: { 'aria-label': ariaLabel } = {},
    } = props;

    const handleRef = useForkRef(ref, containerRef);

    return (
        <StyledButton
            variant="outlined"
            fullWidth="34px"
            id={id}
            disabled={disabled}
            ref={handleRef}
            aria-label={ariaLabel}
            onClick={() => setOpen?.((prev) => !prev)}
        >
            <CalendarTodayIcon sx={{ color: "#121212DE" }} />
        </StyledButton>
    );
});

DateButtonField.fieldType = 'single-input';

const ButtonDatePicker = React.forwardRef((props, ref) => {
    const [open, setOpen] = React.useState(false);

    return (
        <ThemeProvider theme={theme}>
            <DatePicker
                slots={{ field: DateButtonField, ...props.slots }}
                slotProps={{ field: { setOpen } }}
                ref={ref}
                {...props}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            />
        </ThemeProvider>
    );
});


// MuiButtonBase-root MuiPickersDay-root Mui-selected MuiPickersDay-dayWithMargin css-11z9gu-MuiButtonBase-root-MuiPickersDay-root
export default function DatePickerWithButtonField() {
    const [value, setValue] = React.useState(null);
    const dispatch = useDispatch();

    const handleDateChange = (newValue) => {
        setValue(newValue);

        if (newValue && newValue.isValid()) {
            const startOfWeek = dayjs(newValue).startOf('week').add(1, 'day'); 
            const endOfWeek = dayjs(newValue).endOf('week').add(1,"day");
            const formattedDateRange = `${startOfWeek.format('DD MMM YY')} - ${endOfWeek.format('DD MMM YY')}`;
            dispatch(setDateRange(formattedDateRange));
        } else {
            console.log('Invalid date selected');
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ButtonDatePicker
                label={value ? `Week: ${dayjs(value).startOf('week').add(1, 'day').format('DD MMM YY')} - ${dayjs(value).endOf('week').format('DD MMM YY')}` : null}
                value={value}
                onChange={handleDateChange}
            />
        </LocalizationProvider>
    );
}
