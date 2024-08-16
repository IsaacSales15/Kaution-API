export const getUTCTime = (DateString: string) => {
    const datetime = new Date(DateString);
    const datetimeNumber = datetime.getTime();
    const datetimeOffset = datetime.getTimezoneOffset() * 60000;
    const datetimeUTC = new Date();
    datetimeUTC.setTime(datetimeNumber - datetimeOffset);
    
    return datetimeUTC;
}
