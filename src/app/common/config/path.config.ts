export class PathConfig {

    public static BASE_URL_API:string  = 'http://www.evolutionbytes.com/projects/sh8ke/';

    public static LOGIN_AUTH:string = PathConfig.BASE_URL_API + 'api/api.php?action=Login';

    public static GET_STATISTICS :string = PathConfig.BASE_URL_API + 'api/api.php?action=DashboardStatistics';

    public static GET_CURR_WEEK_REPORT :string  = PathConfig.BASE_URL_API + 'api/api.php?action=CurrentWeekReport';
    public static GET_MONTHLY_REPORT :string = PathConfig.BASE_URL_API + 'api/api.php?action=MonthlyReport';

    public static GET_SHAKES_LIST :string = PathConfig.BASE_URL_API + 'api/api.php?action=TrendingSh8kes';

    public static GET_GENERAL_USER :string = PathConfig.BASE_URL_API + 'api/api.php?action=GeneralUsers';
    public static GET_ADMIN_USER :string = PathConfig.BASE_URL_API + 'api/api.php?action=AdminUsers';
    public static GET_CATEGORY :string = PathConfig.BASE_URL_API + 'api/api.php?action=Category';
    public static GET_NEWS :string = PathConfig.BASE_URL_API + 'api/api.php?action=News';
    
    public static GET_EXAMPLE_SH8KE :string = PathConfig.BASE_URL_API + 'api/api.php?action=ExampleSh8kes';
    public static GET_EXAMPLE_ANSWER_LST:string = PathConfig.BASE_URL_API + 'api/api.php?action=ExampleSh8keAnswer&id=';

    public static GET_GENERAL_SH8KE_ANSWER :string = PathConfig.BASE_URL_API + 'api/api.php?action=GeneralSh8keAnswer&id=';

    public static GET_GENERAL_SH8KE_CREATOR :string = PathConfig.BASE_URL_API + 'api/api.php?action=UsersSh8ke&path=sh&id=';

    public static GET_GLOBAL_SH8KE_ANSWER :string = PathConfig.BASE_URL_API + 'api/api.php?action=GlobalSh8keAnswer&id=';

    public static GET_GLOBAL_SH8KE_CREATOR :string = PathConfig.BASE_URL_API + 'api/api.php?action=AdminUserShk8e&userid=';
    public static GET_GENERAL_SH8KE_STATICS :string = PathConfig.BASE_URL_API + 'api/api.php?action=GeneralShk8eStats&id=';
    public static GET_GLOBAL_SH8KE_STATICS :string = PathConfig.BASE_URL_API + 'api/api.php?action=GlobalShk8eStats&id=';

    public static DELETE_GENERAL_SH8KE :string = PathConfig.BASE_URL_API + 'api/api.php?action=DeleteSh8keGeneral';
    public static DELETE_GLOBAL_SH8KE :string = PathConfig.BASE_URL_API + 'api/api.php?action=DeleteSh8keGlobal';

    public static GET_GENERAL_SH8KE_EDITABLE_DATA :string = PathConfig.BASE_URL_API + 'api/api.php?action=EditSh8keGeneral&id=';
    public static POST_GENERAL_SH8KE_EDITABLE_DATA :string = PathConfig.BASE_URL_API + 'api/api.php?action=UpdateSh8keGeneral';

    public static GET_GLOBAL_SH8KE_EDITABLE_DATA :string = PathConfig.BASE_URL_API + 'api/api.php?action=EditSh8keGlobal&id=';

    public static POST_GLOBAL_SH8KE_EDITABLE_DATA :string = PathConfig.BASE_URL_API + 'api/api.php?action=UpdateSh8keGlobal';    

    public static ADD_NEW_CATEGORY:string = PathConfig.BASE_URL_API +'api/api.php?action=AddCategory';
    public static ADD_NEW_CATEGORY_UPLOADED_ITEM:string = PathConfig.BASE_URL_API +'api/api.php?action=AddCategoryWithImage';
    public static UPDATE_CATEGORY_UPLOADED_ITEM:string = PathConfig.BASE_URL_API +'api/api.php?action=UpdateCategoryWithImage';
    public static UPDATE_CATEGORY:string = PathConfig.BASE_URL_API +'api/api.php?action=UpdateCategory';
    public static EDIT_CATEGORY:string = PathConfig.BASE_URL_API +'api/api.php?action=EditCategory&id=';
    
    
    public static ADD_NEW_GENERAL_USER:string = PathConfig.BASE_URL_API +'api/api.php?action=AddShk8eGeneral';
    
    public static ADD_NEW_GENERAL_SH8KE:string = PathConfig.BASE_URL_API +'api/api.php?action=AddShk8eGeneral';
    public static ADD_NEW_GLOBAL_SH8KE:string = PathConfig.BASE_URL_API +'api/api.php?action=AddShk8eGlobal';
    
    public static ADD_NEWS:string = PathConfig.BASE_URL_API +'api/api.php?action=AddNews';
    public static ADD_NEWS_WITH_IMAGE:string = PathConfig.BASE_URL_API+ "api/api.php?action=AddNewsWithImage" ;
    
    public static ADD_NEW_EXAMPLE_SH8KE:string = PathConfig.BASE_URL_API +'api/api.php?action=AddShk8eExample';

    public static ADD_GENERAL_USER:string = PathConfig.BASE_URL_API + "api/api.php?action=AddUser";

    public static GET_ADMIN_USER_EDITABLE_DATA = PathConfig.BASE_URL_API + "api/api.php?action=EditAdmin&id=";
    public static UPDATE_ADMIN_USER_ADMIN = PathConfig.BASE_URL_API + "api/api.php?action=UpdateAdmin";
    public static UPDATE_ADMIN_USER_WITH_IMAGE = PathConfig.BASE_URL_API + "api/api.php?action=UpdateAdminUserWithImage";
    
    public static DELETE_ADMIN_USER:string = PathConfig.BASE_URL_API +"api/api.php?action=DeleteAdmin&id=";

    public static DELETE_GENERAL_USER:string = PathConfig.BASE_URL_API +"api/api.php?action=DeleteUser&id=";
    public static GET_GENERAL_USER_EDITABLE_DATA = PathConfig.BASE_URL_API + "api/api.php?action=EditUser&id=";

    public static DLETE_EXAMPLE_SH8KE:string = PathConfig.BASE_URL_API + "api/api.php?action=DeleteExampleSh8ke&id=";

    public static DELETE_GENERAL_ANSWER:string = PathConfig.BASE_URL_API + "api/api.php?action=DeleteGeneralAnswerSh8ke&id="
    public static DELETE_GLOBAL_ANSWER:string = PathConfig.BASE_URL_API + "api/api.php?action=DeleteGlobalAnswerSh8ke&id="
    
    public static GET_GLOBAL_ANSWERS_LIST:string = PathConfig.BASE_URL_API+"api/api.php?action=GetData";

    public static ADD_GLOBAL_SH8KE_ANSWER:string = PathConfig.BASE_URL_API+"api/api.php?action=AddSh8keGlobalAnswer";
    public static UPDATE_SH8KE_GLOBAL_ANSWER_UPLOADED_ITEM:string = PathConfig.BASE_URL_API+"api/api.php?action=EditSh8keGlobalAnswer";
    public static UPDATE_SH8KE_GLOBAL_ANSWER_TEXT:string = PathConfig.BASE_URL_API + "api/api.php?action=EditSh8keGlobalAnswerOnlyText";

    public static ADD_GLOBAL_ANSWER_UPLOADED_DATA:string = PathConfig.BASE_URL_API+"api/api.php?action=AddSh8keGlobalAnswerImage";

    public static GET_EDITABLE_GLOBAL_ANSWER:string = PathConfig.BASE_URL_API + "api/api.php?action=EditSh8keGlobalAnswerData&ans_id=";

    public static ADD_GENERAL_SH8KE_ANSWER:string = PathConfig.BASE_URL_API+ "api/api.php?action=AddSh8keGeneralAnswer";
    public static ADD_GENERAL_SH8KE_ANSWER_UPLOADED_ITEM:string = PathConfig.BASE_URL_API+ "api/api.php?action=AddSh8keGeneralAnswerWithImage";

    public static GET_EDITABLE_GENERAL_ANSWER:string = PathConfig.BASE_URL_API + "api/api.php?action=EditSh8keGeneralAnswerData&ans_id=";
    public static UPDATE_SH8KE_GENERAL_ANSWER_UPLOADED_ITEM:string = PathConfig.BASE_URL_API+"api/api.php?action=UpdateSh8keGeneralAnswerWithImage";
    public static UPDATE_SH8KE_GENERAL_ANSWER:string = PathConfig.BASE_URL_API+"api/api.php?action=UpdateSh8keGeneralAnswer";


    public static DELETE_CATEGORY:string = PathConfig.BASE_URL_API+"api/api.php?action=DeleteCategory&id=";
    
    public static ADD_EXAMPLE_SH8KE_ANSWER:string = PathConfig.BASE_URL_API+ "api/api.php?action=AddSh8keExampleAnswer";
    public static ADD_EXAMPLE_SH8KE_ANSWER_UPLOADED_ITEM:string = PathConfig.BASE_URL_API+ "api/api.php?action=AddSh8keExampleAnswerWithImage";

    public static DELETE_EXAMPLE_ANSWER:string = PathConfig.BASE_URL_API+"api/api.php?action=DeleteExampleAnswerSh8ke&id="

    public static GET_EDITABLE_EXAMPLE_ANSWER:string = PathConfig.BASE_URL_API + "api/api.php?action=EditSh8keExampleAnswerData&ans_id=";
    public static UPDATE_SH8KE_EXAMPLE_ANSWER_UPLOADED_ITEM:string = PathConfig.BASE_URL_API+"api/api.php?action=UpdateSh8keExampleAnswerWithImage";UpdateSh8keExample
    public static UPDATE_SH8KE_EXAMPLE_ANSWER:string = PathConfig.BASE_URL_API+"api/api.php?action=UpdateSh8keExampleAnswer";
    public static UPDATE_SH8KE_EXAMPLE:string = PathConfig.BASE_URL_API+"api/api.php?action=UpdateSh8keExample";
    
    public static DELETE_NEWS:string = PathConfig.BASE_URL_API+"api/api.php?action=DeleteNews&id=";
    public static GET_EDITABLE_NEWS:string = PathConfig.BASE_URL_API+"api/api.php?action=EditNews&id=";
    public static NEWS_CHANGE_STATUS:string = PathConfig.BASE_URL_API + "api/api.php?action=NewsStatus";
    public static UPDATE_NEWS_ANSWER_UPLOADED_ITEM:string = PathConfig.BASE_URL_API + "api/api.php?action=UpdateNewsWithImage";
    public static UPDATE_NEWS_ANSWER:string = PathConfig.BASE_URL_API + "api/api.php?action=UpdateNews";
    public static EDIT_EXAMPLE_SH8KE:string = PathConfig.BASE_URL_API +"api/api.php?action=EditExampleSh8ke&id=";
    public static UPDATE_ADMIN_USER_ISACTIVE:string = PathConfig.BASE_URL_API +"api/api.php?action=AdminStatus";
    public static UPDATE_GENERAL_USER_ISACTIVE:string = PathConfig.BASE_URL_API +"api/api.php?action=GeneralUserStatus";
 
    public static ADD_GENERAL_USER_IMAGE:string = PathConfig.BASE_URL_API + "api/api.php?action=AddUserWithImage"
    public static UPDATE_GENERAL_USER:string = PathConfig.BASE_URL_API + "api/api.php?action=updateUser";
    public static UPDATE_GENERAL_USER_WITH_IMAGE:string = PathConfig.BASE_URL_API + "api/api.php?action=UpdateUserWithImage"
    public static ADD_ADMIN_USER:string = PathConfig.BASE_URL_API + "api/api.php?action=AddAdminUser";
    public static ADD_ADMIN_USER_WITH_IMAGE:string = PathConfig.BASE_URL_API+"api/api.php?action=AddAdminUserWithImage";

    public static CHANGE_PUBLISH_STATUS_GLOBAL_SH8KE:string = PathConfig.BASE_URL_API +"api/api.php?action=GlobalSh8kePublish";
}
