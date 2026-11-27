
import { Text } from 'react-native';
import { useHolidays } from '../hooks/useHolidays';

type HolidayNoteProps = {
  date: string;
};

export default function HolidayNote({ date }: HolidayNoteProps) {
  const year = Number(date.slice(0, 4));

  const { data: holidays, isPending, isError } = useHolidays(year);

  if (isPending) {
    return <Text>Checking holidays while pending</Text>;
  }

  if (isError) {
    return <Text>Holidays unavailable on an error</Text>;
  }

  const holiday = holidays?.find((item) => item.date === date);

  if (holiday) {
    return <Text>Public holiday: {holiday.name}</Text>;
  }

  return <Text>Not a public holiday</Text>;
}
