export class DateUtil {

  /**
   * Calculate the number of day between two dates
   * @param startDate
   * @param endDate
   * @return the number of day in difference
   */
  public static calculateDaysBetween(startDate: Date, endDate: Date): number {
    const dayInMillisecond = 1000 * 60 * 60 * 24;
    const day = (endDate.getTime() - startDate.getTime()) / dayInMillisecond;
    return Math.round(day);
  }

  /**
   * Add 24 hours to date
   * For example:
   * before add : date = "2020-01-01"
   * after add : date = "2020-01-01 23:59:59:999"
   * @param date
   */
  public static addTwentyFourHours(date: Date): Date {
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    date.setMilliseconds(999);
    return date;
  }

  public static clearTime(date: Date): Date {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  public static getFirstDayOfCurrentMonth(): Date {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  }

  public static getLastDayOfCurrentMonth(): Date {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  }

  /**
   * Get first day of given date
   * @param date 
   * @returns 
   */
  public static getFirstDayOfDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  /**
   * Get last day of given date
   * @param date
   * @returns 
   */
  public static getLastDayOfDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

}
