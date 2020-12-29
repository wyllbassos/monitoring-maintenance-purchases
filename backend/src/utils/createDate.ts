export default function createDate(dateString: string): Date | null {
  if (dateString) {
    const [date, month, year] = dateString.split('/');
    return new Date(`${month}/${date}/${year}`);
  }
  return null;
}
