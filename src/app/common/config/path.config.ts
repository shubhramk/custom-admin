export class PathConfig {

    public static BASE_URL_API:string  = 'http://www.evolutionbytes.com/projects/sh8ke/';
    public static GET_STATISTICS :string = PathConfig.BASE_URL_API + 'api/api.php?action=DashboardStatistics';
    
    public static GET_CURR_WEEK_REPORT :string = 'assets/json/lineChart.json';    
    public static GET_GENERAL_SHAKES :string = PathConfig.BASE_URL_API + 'api/api.php?action=TrendingSh8kes';//'assets/json/list-general-shakes.json';

}