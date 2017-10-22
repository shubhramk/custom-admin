export class PathConfig {

    public static BASE_URL_API:string  = 'http://www.evolutionbytes.com/projects/sh8ke/';
    public static GET_STATISTICS :string = PathConfig.BASE_URL_API + 'api/api.php?action=DashboardStatistics';

    public static GET_CURR_WEEK_REPORT :string  = PathConfig.BASE_URL_API + 'api/api.php?action=CurrentWeekReport';
    public static GET_MONTHLY_REPORT :string = PathConfig.BASE_URL_API + 'api/api.php?action=MonthlyReport';
    
    public static GET_SHAKES_LIST :string = PathConfig.BASE_URL_API + 'api/api.php?action=TrendingSh8kes';

    public static GET_GENERAL_USER :string = PathConfig.BASE_URL_API + 'api/api.php?action=GeneralUsers';
    public static GET_ADMIN_USER :string = PathConfig.BASE_URL_API + 'api/api.php?action=AdminUsers';
    public static GET_CATEGORY :string = PathConfig.BASE_URL_API + 'api/api.php?action=Category';
    public static GET_NEWS :string = PathConfig.BASE_URL_API + 'api/api.php?action=News';
    public static GET_EXAMPLE_SH8KE :string = PathConfig.BASE_URL_API + 'api/api.php?action=ExampleSh8kes';

    public static GET_GENERAL_SH8KE_ANSWER :string = PathConfig.BASE_URL_API + 'api/api.php?action=GeneralSh8keAnswer&id=';
    
    public static GET_GENERAL_SH8KE_CREATOR :string = PathConfig.BASE_URL_API + 'api/api.php?action=UsersSh8ke&path=sh&id=';

    public static GET_GLOBAL_SH8KE_ANSWER :string = PathConfig.BASE_URL_API + 'api/api.php?action=GlobalSh8keAnswer&id=';

}