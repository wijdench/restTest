import dayjs from 'dayjs';

const nthSuffix = (d : number) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }

const DateFormatter = (date: string) : string => {
     const day = dayjs(date);
     const monthDate = day.get('date');
     const daySuffix = nthSuffix(monthDate);
     const formattedDate = day.format('MMM D, YYYY');

     const positionSuffix = formattedDate.length - 6; 
     const output = [formattedDate.slice(0, positionSuffix), daySuffix, formattedDate.slice(positionSuffix)].join('');
    
    return output;
}

export default DateFormatter;