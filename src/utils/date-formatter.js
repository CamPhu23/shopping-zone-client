import moment from "moment";

export const dateFomatter = (date) => {
  return moment(date).format("DD/MM/YYYY HH:mm");
}