/** returns GMT format such as +00:00, +02:00 or -02:30 */
export function getClientTimezone(){
  const NOW = new Date();
  const TZ_OFFSET = NOW.getTimezoneOffset();
  const GMT_SIGN = TZ_OFFSET > 0 ? '-' : '+';

  const TZ_HOURS = Math.abs(Math.floor(TZ_OFFSET / 60));
  const TZ_MINUTES = Math.abs(TZ_OFFSET % 60);
  
  const TIMEZONE = `${GMT_SIGN}${
    TZ_HOURS.toString().padStart(2, '0')
  }:${
    TZ_MINUTES.toString().padStart(2, '0')
  }`;

  return TIMEZONE;
}



export function evalDueDate(due_date, due_time) {
  if(!due_date && due_time) {
    const TODAY = new Date();
    const TODAY_DATE = TODAY.toISOString().split("T")[0];

    return `${TODAY_DATE} ${due_time}:00`;
  }

  else if(due_date && !due_time) 
    return `${due_date} 23:59:00`;
  

  else if(!due_date && !due_time)
    return null;


  else 
    return `${due_date}T${due_time}:00`;
}



/** accepts only ISO dates with potential format: YYYY-MM-DDThh-mm-ss.milZ+tz */
export function extractDate(datetime){
  if(!datetime) return "";

  const datePart = datetime?.split("T")[0];
  return datePart;
}



/** accepts only ISO dates with potential format: YYYY-MM-DDThh-mm-ss.milZ+tz */
export function extractTime(datetime){
  if(!datetime) return "";
  
  const timePart = datetime?.split("T")[1];
  const timeWithoutSecPlus = timePart?.replace(/:[0-9]{2}\.[0-9]{3}Z/, "");

  const TZ_OFFSET = getClientTimezone();
  const TZ_ARR = TZ_OFFSET.split(':');

  // Convert the timezone offset to minutes should be added twice 
  // to avoid that the ISOString will get it back to GMT+00
  const offsetMinutes = (parseInt(TZ_ARR[0]) * 60 + parseInt(TZ_ARR[1])) * 2;


  // Create a date object with the extracted time
  let date = new Date(`1970-01-01T${timeWithoutSecPlus}:00`);


  // Add the timezone offset to the date object
  date.setMinutes(date.getMinutes() + offsetMinutes);


  // Format the date object to hh:mm
  const adjustedTime = date.toISOString().split('T')[1].substring(0, 5);
  return adjustedTime;
}