import { DateTime } from 'luxon';
import parseDates from '../../../src/scripts/utils/parse-dates';

describe('Parse Dates For Movie Runs', () => {
  it('should parse MON-THURS dates', () => {
    // UTC-4 times, should be saved in UTC
    const movieTimeArr = ['7:30 AM', '2:00 PM', '8:45 PM'];
    const dates = { 'MON-THURS': movieTimeArr };
    const parsedDates = parseDates(dates);

    const now = DateTime.utc().setZone('America/Puerto_Rico');
    const mondayThisWeek = now.startOf('week');
    const tuesdayThisWeek = mondayThisWeek.plus({ days: 1 });
    const wednesdayThisWeek = tuesdayThisWeek.plus({ days: 1 });
    const thursdayThisWeek = wednesdayThisWeek.plus({ days: 1 });

    const expectedDates = movieTimeArr.reduce(
      (accum: Date[], movieTimeString) => {
        let movieTime = DateTime.fromFormat(movieTimeString, 'h:mm a', {
          zone: 'America/Puerto_Rico',
        });

        let mondayDate = mondayThisWeek
          .plus({
            hours: movieTime.hour,
            minutes: movieTime.minute,
          })
          .toUTC()
          .toJSDate();

        let tuesdayDate = tuesdayThisWeek
          .plus({
            hours: movieTime.hour,
            minutes: movieTime.minute,
          })
          .toUTC()
          .toJSDate();

        let wednesdayDate = wednesdayThisWeek
          .plus({
            hours: movieTime.hour,
            minutes: movieTime.minute,
          })
          .toUTC()
          .toJSDate();

        let thursdayDate = thursdayThisWeek
          .plus({
            hours: movieTime.hour,
            minutes: movieTime.minute,
          })
          .toUTC()
          .toJSDate();

        accum = [
          ...accum,
          mondayDate,
          tuesdayDate,
          wednesdayDate,
          thursdayDate,
        ];
        return accum;
      },
      []
    );

    expect(parsedDates).toEqual(expectedDates);
  });

  it('should parse FRIDAY dates', () => {
    const movieTimeArr = ['7:30 AM', '2:00 PM', '8:45 PM'];
    const dates = { FRIDAY: movieTimeArr };
    const parsedDates = parseDates(dates);

    const now = DateTime.utc().setZone('America/Puerto_Rico');
    const mondayThisWeek = now.startOf('week');
    const fridayThisWeek = mondayThisWeek.plus({ days: 4 });

    const expectedDates = movieTimeArr.reduce(
      (accum: Date[], movieTimeString) => {
        let movieTime = DateTime.fromFormat(movieTimeString, 'h:mm a', {
          zone: 'America/Puerto_Rico',
        });

        let fridayDate = fridayThisWeek
          .plus({
            hours: movieTime.hour,
            minutes: movieTime.minute,
          })
          .toUTC()
          .toJSDate();

        accum = [...accum, fridayDate];
        return accum;
      },
      []
    );

    expect(parsedDates).toEqual(expectedDates);
  });

  it('should parse SATURDAY dates', () => {
    const movieTimeArr = ['7:30 AM', '2:00 PM', '8:45 PM'];
    const dates = { SATURDAY: movieTimeArr };
    const parsedDates = parseDates(dates);

    const now = DateTime.utc().setZone('America/Puerto_Rico');
    const mondayThisWeek = now.startOf('week');
    const saturdayThisWeek = mondayThisWeek.plus({ days: 5 });

    const expectedDates = movieTimeArr.reduce(
      (accum: Date[], movieTimeString) => {
        let movieTime = DateTime.fromFormat(movieTimeString, 'h:mm a', {
          zone: 'America/Puerto_Rico',
        });

        let saturdayDate = saturdayThisWeek
          .plus({
            hours: movieTime.hour,
            minutes: movieTime.minute,
          })
          .toUTC()
          .toJSDate();

        accum = [...accum, saturdayDate];
        return accum;
      },
      []
    );

    expect(parsedDates).toEqual(expectedDates);
  });

  it('should parse SUNDAY dates', () => {
    const movieTimeArr = ['7:30 AM', '2:00 PM', '8:45 PM'];
    const dates = { SUNDAY: movieTimeArr };
    const parsedDates = parseDates(dates);

    const now = DateTime.utc().setZone('America/Puerto_Rico');
    const mondayThisWeek = now.startOf('week');
    const sundayThisWeek = mondayThisWeek.plus({ days: 6 });

    const expectedDates = movieTimeArr.reduce(
      (accum: Date[], movieTimeString) => {
        let movieTime = DateTime.fromFormat(movieTimeString, 'h:mm a', {
          zone: 'America/Puerto_Rico',
        });

        let sundayDate = sundayThisWeek
          .plus({
            hours: movieTime.hour,
            minutes: movieTime.minute,
          })
          .toUTC()
          .toJSDate();

        accum = [...accum, sundayDate];
        return accum;
      },
      []
    );

    expect(parsedDates).toEqual(expectedDates);
  });
});
