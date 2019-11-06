import { DateTime } from 'luxon';
import { flatten } from 'lodash';
import { IMovieRunDate } from '../../interfaces';

function getDates({
  hours,
  weekDays,
}: {
  hours: string[];
  weekDays: DateTime[];
}): DateTime[] {
  const results = hours.map((hour) => {
    return weekDays.map((weekDay) => {
      const weekDayString = weekDay.toISODate();

      const movieTime = DateTime.fromFormat(hour, 'h:mm a', {
        zone: 'America/Puerto_Rico',
      });

      let movieHour = movieTime.hour.toString();
      let movieMinute = movieTime.minute.toString();

      // Pad hour if necessary
      if (movieHour.length === 1) {
        movieHour = `0${movieHour}`;
      }

      // Pad minute if necessary
      if (movieMinute.length === 1) {
        movieMinute = `0${movieMinute}`;
      }

      return DateTime.fromISO(
        `${weekDayString}T${movieHour}:${movieMinute}:00`,
        { zone: 'America/Puerto_Rico' }
      ).toUTC();
    });
  });

  return flatten(results);
}

export function getMondayToThursdayDays(): DateTime[] {
  // Luxon assumes Monday is the first day of the week...
  const mondayThisWeek = DateTime.utc().startOf('week');
  const tuesdayThisWeek = mondayThisWeek.plus({ days: 1 });
  const wednesdayThisWeek = tuesdayThisWeek.plus({ days: 1 });
  const thursdayThisWeek = wednesdayThisWeek.plus({ days: 1 });

  return [mondayThisWeek, tuesdayThisWeek, wednesdayThisWeek, thursdayThisWeek];
}

export function getFridayDays(): DateTime[] {
  const mondayThisWeek = DateTime.utc().startOf('week');
  const fridayThisWeek = mondayThisWeek.plus({ days: 4 });

  return [fridayThisWeek];
}

export function getMondayToFridayDays(): DateTime[] {
  return [...getMondayToThursdayDays(), ...getFridayDays()];
}

export function getSaturdayDays(): DateTime[] {
  const mondayThisWeek = DateTime.utc().startOf('week');
  const saturdayThisWeek = mondayThisWeek.plus({ days: 5 });

  return [saturdayThisWeek];
}

export function getSundayDays(): DateTime[] {
  const mondayThisWeek = DateTime.utc().startOf('week');
  const sundayThisWeek = mondayThisWeek.plus({ days: 6 });

  return [sundayThisWeek];
}

export default (dates: IMovieRunDate) => {
  let results: DateTime[] = [];

  for (const [days, hours] of Object.entries(dates)) {
    let weekDays;

    if (days === 'MON-THURS') {
      weekDays = getMondayToThursdayDays();
    } else if (days === 'MON-FRI') {
      weekDays = getMondayToFridayDays();
    } else if (days === 'FRIDAY') {
      weekDays = getFridayDays();
    } else if (days === 'SATURDAY') {
      weekDays = getSaturdayDays();
    } else if (days === 'SUNDAY') {
      weekDays = getSundayDays();
    } else {
      return [];
    }

    const dateResults = getDates({ hours, weekDays });
    results = [...results, ...dateResults];
  }

  return results.map((datetime) => datetime.toUTC().toJSDate());
};
