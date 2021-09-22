

export default {
    regUserInfo: {}, //注册用户信息
    findPasswordAccount: {}, //找回密码账号信息
    accountGrade: parseInt( localStorage.getItem('ZBJAccountGrade') ? localStorage.getItem('ZBJAccountGrade') : -1 ) 
}