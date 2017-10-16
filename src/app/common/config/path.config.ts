export class PathConfig {

    public static BASE_URL_API:string  = 'http://www.evolutionbytes.com/projects/sh8ke/';
    public static GET_STATISTICS :string = PathConfig.BASE_URL_API + 'api/api.php?action=DashboardStatistics';

    public static GET_CURR_WEEK_REPORT :string  = PathConfig.BASE_URL_API + 'api/api.php?action=CurrentWeekReport';
    public static GET_MONTHLY_REPORT :string = PathConfig.BASE_URL_API + 'api/api.php?action=MonthlyReport';
    public static GET_SHAKES_LIST :string = PathConfig.BASE_URL_API + 'api/api.php?action=TrendingSh8kes';


}
