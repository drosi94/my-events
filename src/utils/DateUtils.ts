export class DateUtils {
    public static extractOnlyDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    public static extractOnlyTime(date: Date): string {
        const parts: string[] = date.toISOString().split('T')[1].split(':');
        return `${parts[0]}:${parts[1]}`;
    }

    public static durationInHoursAndMinutes(fromDate: Date, toDate: Date): string {
        let diff =(toDate.getTime() - fromDate.getTime()) ;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);
        const minutes = Math.floor(diff / (1000 * 60));
        diff -= minutes * (1000 * 60);
        return `${hours}h ${minutes}m`;
    }
}