
// import ajax from './ajax'

// // const BASE_URL = '/api'
// const BASE_URL = 'http://101.200.177.46:8076'


// // 设置注册信息
// export const reqRegister = 
// ({ Phone, WorkCode, CaptchCode, Mail, Password }) => 
// ajax(BASE_URL + '/Login/Register', { Phone, WorkCode, CaptchCode, Mail, Password }, 'POST')

import ajaxReq from './ajaxReq'

// 获取注册医生列表
export const GetDoctorInfos = () => {
    return ajaxReq('/PatientCase/GetDoctorInfos')
}
// 分页获取注册医生列表
export const GetDoctorInfosByPage = (data) => {
    return ajaxReq('/PatientCase/GetDoctorInfosByPage', data, 'POST')
}

// 获取评委医生列表
export const GetDoctorManagerInfos = () => {
    return ajaxReq('/PatientCase/GetDoctorManagerInfos')
}

// 分页获取评委医生列表
export const GetDoctorManagerInfosByPage = (data) => {
    return ajaxReq('/PatientCase/GetDoctorManagerInfosByPage', data, 'POST')
}

// 新建评委
export const AddManagerAccount = (data) => {
    return ajaxReq('/Login/AddManagerAccount', data, 'POST')
}

// 修改密码
export const ResetPassword = (data) => {
    return ajaxReq('/Login/ResetPassword', data, 'POST')
}

// 绑定邮箱 ResetMail
export const ResetMail = (data) => {
    return ajaxReq('/Login/ResetMail', data, 'POST')
}

// 修改密码第一步，验证手机号
export const ValidPhoneCodeForAccount = (data) => {
    return ajaxReq('/Login/ValidPhoneCodeForAccount', data, 'POST')
}

// 添加案例到服务器
export const AddFileForPatientCase = (data) => {
    return ajaxReq('/PatientCase/AddFileForPatientCase', data, 'POST')
}

// 删除案例 DeleteFile
export const DeleteFile = (data) => {
    return ajaxReq('/PatientCase/DeleteFile', data, 'POST')
}

// 更新管理医生信息
export const UpdateDoctorInfo = (data) => {
    return ajaxReq('PatientCase/UpdateDoctorInfo', data, 'POST')
}

// 删除用户
export const DeleteUser = (data) => {
    return ajaxReq('Login/DeleteUser', data, 'POST')
}

// 管理员查询案例
export const GetPaitentCaseByPage = (data) => {
    return ajaxReq('PatientCase/GetPaitentCaseByPage', data, 'POST')
}

// 提交医生 获取案例列表
export const GetPaitentCaseForPatientByPage = (data) => {
    return ajaxReq('PatientCase/GetMRPaitentCaseForPatientByPage', data, 'GET')
}

// 导出案例
export const ExportCase = (data) => {
    return ajaxReq('PatientCase/ExportCase', data, 'GET')
}

// 导出注册用户
export const ExportAccount = (data) => {
    return ajaxReq('PatientCase/ExportAccount', data, 'GET')
}

// 获取评分案例
export const GetPaitentCaseForScore = () => {
    return ajaxReq('PatientCase/GetPaitentCaseForScore')
}

// 提交打分
export const SocrePatientCase = (data) => {
    return ajaxReq('PatientCase/SocrePatientCase', data, 'POST')
}

// 获取某个评分内容
export const GetScore = (data) => {
    return ajaxReq('PatientCase/GetScore', data, 'GET')
}


