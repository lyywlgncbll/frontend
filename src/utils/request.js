
export const QIANFAN_ASKONCE = `/api/qianfan/askonce`
export const QIANFAN_ASK = `/api/qianfan/ask`
export const USERSEARCH_API = `/user/search`;
export const USERFIELDS_API = `/user/search/fields`
export const USERAVATOR_API = `/user/avator/get`
export const ARTICLE_API = `/api/academic/getPublicationById`
export const REFERENCE_API = `/api/academic/getReferenceById`

//登录注册页
export const LOGIN_API = `/user/auth/login`;
export const SEND_EMAIL_API = `/user/reg/verify`;
export const REGISTER_API = `/user/reg/create`;

//主页
export const GET_ALL_HISTORY_API='/api/history/getAllHistory';
export const DELETE_HISTORY_API='/api/history/deleteHistory';
export const GET_TOP_K_API='/topics/topk';
export const GET_READ_CNT_API='/counter/get';


//搜索
export const SEARCH_API='/api/academic/searchPublications';


//管理员
export const USERCOUNT_API='/user/total';
export const SCHOLARSCOUNT_API='/portal/count/claimed';
export const ARTICLECOUNT_API='/api/academic/count/publication';
export const AUTHORCOUNT_API='/api/academic/count/author'

export const GETCLAIMALL_API='/portal/claim/getAll';
export const UPDATECLIAM_API='/portal/op/claim/close';
export const GETUSER_API='/user/get'