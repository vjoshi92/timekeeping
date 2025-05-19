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

export const targetPOSIDsForFuturedate = ["NON-NOF.0002.002", "NON-NOF.0002.001"];