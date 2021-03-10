

export default {
    regUserInfo: {}, //注册用户信息
    findPasswordAccount: {}, //找回密码账号信息
    accountGrade: parseInt( localStorage.getItem('DBJAccountGrade') ? localStorage.getItem('DBJAccountGrade') : -1 ) 
}