import React from 'react';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { setDateRange } from '../store/slice/HomeSlice';

const WeekTogglePicker = () => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = React.useState('current');

  const handleWeekToggle = (weekType) => {
    setActiveButton(weekType);
    const currentDate = dayjs();
    
    let startDate, endDate;
    
    if (weekType === 'current') {
      startDate = currentDate.startOf('week').add(1, 'day');
      endDate = currentDate.endOf('week').add(1, 'day');
    } else {
      startDate = currentDate.subtract(1, 'week').startOf('week').add(1, 'day');
      endDate = currentDate.subtract(1, 'week').endOf('week').add(1, 'day');
    }

    const formattedDateRange = `${startDate.format('DD MMM YYYY')} - ${endDate.format('DD MMM YYYY')}`;
    dispatch(setDateRange(formattedDateRange));
  };

  return (
    <div className="flex gap-2">
      <Button
        variant={activeButton === 'current' ? 'default' : 'outline'}
        onClick={() => handleWeekToggle('current')}
      >
        Current Week
      </Button>
      <Button
        variant={activeButton === 'previous' ? 'default' : 'outline'}
        onClick={() => handleWeekToggle('previous')}
      >
        Previous Week
      </Button>
    </div>
  );
};

export default WeekTogglePicker;