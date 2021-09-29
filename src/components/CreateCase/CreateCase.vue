<template>
  <div>
    <el-page-header @back="goBack" :content="title"></el-page-header>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="isScoring ? 12 : 24">
        <div class="submit_case_box" :class="isScoring ? 'boxScroll' : ''">
          <el-form
            :model="submitCaseForm"
            ref="submitCaseForm"
            :rules="rules"
            label-width="160px"
            :disabled="FormIsDisabled"
          >
            <div class="case_title">
              <h2>受检者基本信息</h2>
            </div>

            <el-form-item label="患者性别" prop="BSex" required="">
              <el-radio v-model="submitCaseForm.BSex" label="0">男</el-radio>
              <el-radio v-model="submitCaseForm.BSex" label="1">女</el-radio>
            </el-form-item>

            <el-form-item label="患者年龄" prop="PAge">
              <el-input
                v-model="submitCaseForm.PAge"
                placeholder="请输入年龄"
              ></el-input>
            </el-form-item>

            <el-form-item label="身高" required>
              <el-input
                v-model="submitCaseForm.pHeight"
                placeholder="身高"
              >
                <template slot="append">cm</template>
              </el-input>
            </el-form-item>

            <el-form-item label="体重" required>
              <el-input
                v-model="submitCaseForm.pWeight"
                type="text"
                placeholder="体重"
              >
                <template slot="append">kg</template>
              </el-input>
            </el-form-item>

            <el-form-item label="BMI" prop="BBMI">
              <el-select
                v-model="submitCaseForm.BBMI"
                placeholder="BMI"
                style="width: 100%"
              >
                <el-option label="18-21" value="18-21"></el-option>
                <el-option label="21-25" value="21-25"></el-option>
                <el-option label="25以上" value="25以上"></el-option>
                <el-option label="无信息" value="无信息"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="主诉" prop="BZS">
              <el-input
                v-model="submitCaseForm.BZS"
                type="textarea"
                rows="5"
                placeholder="主诉"
                resize="none"
              ></el-input>
            </el-form-item>

            <el-form-item label="相关简要病史及体格检查" prop="BBS">
              <el-input
                v-model="submitCaseForm.BBS"
                type="textarea"
                rows="5"
                placeholder="相关简要病史及体格检查"
                resize="none"
              ></el-input>
            </el-form-item>

            <el-form-item label="肌酐" required>
              <el-input
                v-model="submitCaseForm.BSGN_JG"
                type="text"
                placeholder="肌酐"
              >
                <template slot="append">umol/L</template>
              </el-input>
            </el-form-item>

            <el-form-item label="肾小球滤过率">
              <el-input
                v-model="submitCaseForm.BSGN_JXQ"
                type="text"
                placeholder="肾小球滤过率"
              >
                <template slot="append">mL/min/1.73m2</template>
              </el-input>
            </el-form-item>

            <el-form-item label="临床诊断" prop="BLCZD">
              <el-input
                v-model="submitCaseForm.BLCZD"
                type="textarea"
                rows="5"
                placeholder="临床诊断"
                resize="none"
              ></el-input>
            </el-form-item>

            <el-form-item label="扫描部位" prop="BSMBW" required>
              <!-- <el-input
                v-model="submitCaseForm.BSMBW"
                type="text"
                placeholder="扫描部位"
              ></el-input> -->

              <el-col :span="11">
                <el-select
                  filterable
                  placeholder="部位"
                  v-model="submitCaseForm.BSMBW"
                  @change="selected"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in options"
                    :label="item.label"
                    :key="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-col>

              <el-col class="line" :span="2">-</el-col>

              <el-col :span="11">
                <el-select
                  filterable
                  placeholder="二级部位"
                  v-model="submitCaseForm.BSMBW1"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in options2"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-form-item>

            <el-form-item label="本次检查关注问题" prop="BGZWT">
              <el-input
                v-model="submitCaseForm.BGZWT"
                type="textarea"
                rows="5"
                placeholder="本次检查关注问题"
                resize="none"
              ></el-input>
            </el-form-item>

            <el-divider></el-divider>
            <!-- ******************************************************************************** -->

            <div class="case_title">
              <h2>检查设备信息</h2>
            </div>

            <el-form-item label="磁共振机器品牌" prop="JJQPP">
              <el-select
                v-model="submitCaseForm.JJQPP"
                placeholder="磁共振机器品牌"
                style="width: 100%"
              >
                <el-option label="西门子" value="西门子"></el-option>
                <el-option label="GE" value="GE"></el-option>
                <el-option label="飞利浦" value="飞利浦"></el-option>
                <el-option label="东软" value="东软"></el-option>
                <el-option label="联影" value="联影"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="磁共振设备具体型号">
              <el-input
                v-model="submitCaseForm.JJX"
                type="text"
                placeholder="磁共振设备具体型号"
              ></el-input>
            </el-form-item>

            <el-form-item label="场强（T）" required>
              <el-select
                v-model="submitCaseForm.JCQ"
                placeholder="场强（T）"
                style="width: 100%"
              >
                <el-option label="1.5T以下" value="1.5T以下"></el-option>
                <el-option label="1.5T" value="1.5T"></el-option>
                <el-option label="3.0T" value="3.0T"></el-option>
                <el-option label="3.0T以上" value="3.0T以上"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="线圈">
              <el-input
                v-model="submitCaseForm.JXQ"
                type="text"
                placeholder="线圈"
              ></el-input>
            </el-form-item>

            <el-form-item label="注射系统">
              <el-input
                v-model="submitCaseForm.ZSXT"
                type="text"
                placeholder="注射系统"
              ></el-input>
            </el-form-item>

            <!-- <el-form-item label="扫描方案及序列">
              <el-input
                v-model="submitCaseForm.JZQXLMC"
                type="text"
                placeholder="扫描方案及序列"
              ></el-input>
            </el-form-item> -->

            <!-- <el-form-item label="并行加速采集">
              <el-input
                v-model="submitCaseForm.JJSCJ"
                type="text"
                placeholder="并行加速采集"
              ></el-input>
            </el-form-item> -->

            <!-- <el-form-item label="脂肪抑制">
              <el-input
                v-model="submitCaseForm.JZFYZ"
                type="text"
                placeholder="脂肪抑制"
              ></el-input>
            </el-form-item> -->

            <!-- <el-form-item label="高压注射器品牌">
              <el-input
                v-model="submitCaseForm.GYZSQ_PP"
                type="text"
                placeholder="高压注射器品牌"
              ></el-input>
            </el-form-item>

            <el-form-item label="高压注射器具体型号">
              <el-input
                v-model="submitCaseForm.GYZSQ_XH"
                type="text"
                placeholder="高压注射器具体型号"
              ></el-input>
            </el-form-item> -->

            <el-divider></el-divider>
            <!-- ******************************************************************************** -->
            <!-- 扫描方案-平扫 -->
            <div class="case_title">
              <span>扫描方案 - 平扫</span>
            </div>

            <!-- <el-form-item label="扫描范围">
              <el-input
                v-model="submitCaseForm.PSFW"
                type="text"
                placeholder="扫描范围"
              ></el-input>
            </el-form-item> -->

            <!-- <el-form-item label="扫描序列" :required="required">
              <el-input
                v-model="submitCaseForm.PSXL"
                type="text"
                placeholder="扫描序列"
              ></el-input>
            </el-form-item>

            <el-form-item label="扫描方向" :required="required">
              <el-input
                v-model="submitCaseForm.PSFX"
                type="text"
                placeholder="扫描方向"
              ></el-input>
            </el-form-item> -->

            <!-- <el-form-item label="是否压脂" prop="PSSFYZ">
              <el-radio v-model="submitCaseForm.PSSFYZ" label="0">是</el-radio>
              <el-radio v-model="submitCaseForm.PSSFYZ" label="1">否</el-radio>
            </el-form-item>

            <el-form-item label="扫描时间">
              <el-input
                v-model="submitCaseForm.PSSJ"
                type="text"
                placeholder="扫描时间"
              ></el-input>
            </el-form-item> -->

            <div>
              <div v-for="(item, i) in submitCaseForm.PSXLS" :key="'PSXL' + i">
                <el-form-item :label="'平扫序列' + (i + 1)">
                  <el-input
                    v-model="item.text"
                    type="textarea"
                    rows="5"
                    :placeholder="'平扫序列' + (i + 1)"
                    resize="none"
                  ></el-input>
                </el-form-item>
              </div>

              <el-form-item>
                <el-button @click="addPSXL()">添加平扫序列项</el-button>
                <el-button @click="removePSXL()">删除平扫序列项</el-button>
              </el-form-item>
            </div>

            <el-divider></el-divider>
            <!-- ******************************************************************************** -->

            <div class="case_title">
              <h2>扫描方案 - 增强</h2>
            </div>

            <div class="">
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item
                  :title="'增强扫描序列 ' + (i + 1)"
                  :name="i + 1"
                  v-for="(source, i) in submitCaseForm.ZQXLS"
                  :key="'ZQXLForm' + i"
                >
                  <ZQXLForm :source="source" :seq="i + 1" :FormIsDisabled="FormIsDisabled"></ZQXLForm>
                </el-collapse-item>
              </el-collapse>
            </div>

            <div class="ZQBtns">
              <el-button @click="addZQXLForm()">增加</el-button>
              <el-button @click="deleteZQXLForm()">删除</el-button>
            </div>

            <el-divider></el-divider>
            <!-- ******************************************************************************** -->

            <div class="case_title">
              <h2>对比剂注射情况</h2>
            </div>

            <el-form-item label="对比剂品牌" prop="DDBJPP">
              <div v-if="DBJPPOTHER === true">
                <el-input
                  type="text"
                  v-model="submitCaseForm.DDBJPP"
                  placeholder="输入对比剂品牌"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-back"
                    @click="backSelect"
                    >返回</el-button
                  >
                </el-input>
              </div>

              <el-select
                v-else
                v-model="submitCaseForm.DDBJPP"
                placeholder="对比剂品牌"
                style="width: 100%"
                @change="DDBJPPChange"
              >
                <el-option label="马根维显" value="马根维显"></el-option>
                <el-option label="加乐显" value="加乐显"></el-option>
                <el-option label="欧乃影" value="欧乃影"></el-option>
                <el-option label="莫迪司" value="莫迪司"></el-option>
                <el-option label="多它灵" value="多它灵"></el-option>
                <el-option label="普海司" value="普海司"></el-option>
                <el-option label="佳迪显" value="佳迪显"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="对比剂浓度" prop="DND">
              <el-input
                v-model="submitCaseForm.DND"
                type="text"
                placeholder="对比剂浓度"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="注射剂量" prop="DZSJL">
              <el-input
                v-model="submitCaseForm.DZSJL"
                type="text"
                placeholder="注射剂量"
              >
                <template slot="append">mL/KG</template>
              </el-input>
            </el-form-item>

            <el-form-item label="注射方式" prop="DZSFS">
              <el-select
                v-model="submitCaseForm.DZSFS"
                placeholder="注射方式"
                style="width: 100%"
              >
                <el-option label="高压注射器" value="高压注射器"></el-option>
                <el-option label="手推" value="手推"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="流速" prop="DLS">
              <el-input
                v-model="submitCaseForm.DLS"
                type="text"
                placeholder="流速"
              >
                <!-- <template slot="append">mL/s</template> -->
              </el-input>
            </el-form-item>

            <el-form-item label="盐水剂量" prop="DYSJL">
              <el-input
                v-model="submitCaseForm.DYSJL"
                type="text"
                placeholder="盐水剂量"
              >
                <template slot="append">mL</template>
              </el-input>
            </el-form-item>

            <!-- <el-form-item label="盐水流速" prop="DYSLS">
              <el-input
                v-model="submitCaseForm.DYSLS"
                type="text"
                placeholder="盐水流速"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="打药时机" prop="DDYSJ">
              <el-input
                v-model="submitCaseForm.DDYSJ"
                type="text"
                placeholder="打药时机"
              >
              </el-input>
            </el-form-item> -->

            <el-form-item label="延迟时间" prop="DYCSJ">
              <el-input
                v-model="submitCaseForm.DYCSJ"
                type="text"
                placeholder="延迟时间"
              >
              </el-input>
            </el-form-item>

            <el-divider></el-divider>
            <!-- ******************************************************************************** -->

            <div class="case_title">
              <h2>影像表现及诊断思路</h2>
            </div>
            <el-form-item prop="YXBX" label="影像表现及诊断思路">
              <el-input
                v-model="submitCaseForm.YXBX"
                type="textarea"
                minlength="50"
                show-word-limit
                placeholder="50字以上，可提供原扫描方案，优化前扫描时间进行对比"
                rows="5"
                resize="none"
              ></el-input>
            </el-form-item>

            <el-divider></el-divider>
            <!-- ******************************************************************************** -->

            <div v-if="!FormIsDisabled && submitCaseForm.Files.length === 0">
              <div class="case_title">
                <h2>上传案例</h2>
              </div>
              <el-form-item label="实际提交案例人" required="">
                <el-input
                  v-model="submitCaseForm.acAccountName"
                  type="text"
                ></el-input>
              </el-form-item>
              <el-form-item prop="Files" label="上传案例" required>
                <Upload @upload-success="uploadSuccess"></Upload>
              </el-form-item>
            </div>

            <div v-else>
              <div class="case_title">
                <h2>下载案例</h2>
              </div>
              <el-form-item>
                <p v-if="submitCaseForm.Files.length === 0">暂无案例</p>
                <div v-else class="download_box">
                  <div
                    v-for="(item, index) in submitCaseForm.Files"
                    :key="index"
                  >
                    <el-link type="success" :href="item.Link" target="_blank">
                      <span class="green_text">{{ item.Name }}</span>
                    </el-link>
                    <div>文件大小：{{ item.FileSize | formatSize }}</div>
                  </div>
                  <div>
                    <el-button
                      size="small"
                      type="warning"
                      round
                      @click="uploadAgain"
                      v-show="!FormIsDisabled"
                    >
                      重新上传
                      <i class="el-icon-upload el-icon--right"></i>
                    </el-button>
                  </div>
                </div>
              </el-form-item>
            </div>

            <el-form-item class="btn_box" v-show="!FormIsDisabled">
              <el-button style="width: 100px" @click="cancelForm"
                >取消</el-button
              >
              <el-button
                style="width: 100px"
                type="primary"
                @click="submitForm('submitCaseForm')"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="isScoring ? 12 : 0">
        <ScoreCase
          v-if="isScoring"
          :patientCaseId="submitCaseForm.ID"
          :scoreType="submitCaseForm.MRScoreType"
          :disabled="scoreReadOnly"
          :links = "submitCaseForm.Files"
        ></ScoreCase>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import {
//   POSITIVE_NUMBER_REG,
//   INTEGER_NUMBER_REG,
// } from "../../commen/js/commen";
import Vue from "vue";
import Upload from "../Upload/Upload";
import { DeleteFile } from "@/api/index.js";
import ScoreCase from "../ScoreCase/ScoreCase";
// import PSXLForm from "../PSXLForm/PSXLForm";
import ZQXLForm from "../ZQXLForm/ZQXLForm";

export default {
  name: "CreateCase",
  props: {
    tablerow: Object,
    title: String,
    // 开启评分
    isScoring: {
      type: Boolean,
      default: false,
    },
    scoreReadOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    // // 选填正数
    // var validateNumber1 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback();
    //   } else if (!POSITIVE_NUMBER_REG.test(value)) {
    //     callback(new Error("必须是大于0的数字"));
    //   } else {
    //     callback();
    //   }
    // };

    // // 必须填正数
    // var validateNumber11 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback();
    //   } else if (!POSITIVE_NUMBER_REG.test(value)) {
    //     callback(new Error("必须是大于0的数字"));
    //   } else {
    //     callback();
    //   }
    // };

    // // 选填正整数
    // var validateNumber2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback();
    //   } else if (!INTEGER_NUMBER_REG.test(value)) {
    //     callback(new Error("必须是大于0的整数"));
    //   } else {
    //     callback();
    //   }
    // };

    // // 必填正整数
    // var validateNumber22 = (rule, value, callback) => {
    //   if (!INTEGER_NUMBER_REG.test(value)) {
    //     callback(new Error("必须是大于0的整数"));
    //   } else {
    //     callback();
    //   }
    // };
    // 大于50字
    var validateNumber50 = (rule, value, callback) => {
      if (value.length < 50) {
        callback(new Error("字数不够50"));
      } else {
        callback();
      }
    };
    var validateFiles = (rule, value, callback) => {
      console.log("验证上传文件");
      console.log(value);

      if (value.length === 0) {
        callback("必须上传文件");
      } else {
        callback();
      }
    };
    return {
      DBJPPOTHER: false,
      PSXLNum: 1,
      activeName: 1,
      zqnum: 1,
      caseForm: {
        //患者信息
        BSex: "0", //患者性别
        PAge: "", //年龄---
        pHeight: "", //身高--
        pWeight: "", //体重--
        BBMI: "", //BMI
        BZS: "", //主诉
        BBS: "", //相关简要病史及体格检查
        BSGN_JG: "", // 肾功能 肌酐
        BSGN_JXQ: "", // 肾功能 肾小球滤过率
        BLCZD: "", //   临床诊断
        BSMBW: "", //扫描部位
        BGZWT: "", //本次检查关注问题
        // BPatientName: "", //患者姓名

        // 检查设备
        JJQPP: "", //磁共振机器品牌
        JJX: "", //机型
        JCQ: "", //场强（T）
        JXQ: "", //线圈
        ZSXT: "", //注射系统
        // GYZSQ_PP: "", //高压注射器品牌
        // GYZSQ_XH: "", //高压注射器型号
        // JZQXLMC: "", //扫描方案及序列
        // JJSCJ: "", //并行加速采集
        // JZFYZ: "", //脂肪抑制
        // JTR: "", //TR(ms)
        // JTE: "", //TE(ms)
        // JFA: "", //FA(deg)
        // JFOV: "", //FOV(mm)
        // JJZ: "", //阵（像素）
        // JCMDW: "", //层面定位
        // JCH: "", //层厚（mm)
        // JCJ: "", //层距（mm)
        // JCS: "", //层数
        // JCJSJ: "", //采集时间（sec)
        // JQX: "", //期相
        // JSMSJ: "", //扫描时间

        // 扫描方案
        // 平扫
        // PSFW: "", //平扫范围
        PSXLS: [
          {
            text: "",
          },
        ], //平扫序列
        // PSFX: "", //平扫方向
        // PSSFYZ: "0", //平扫 是否压脂
        // PSSFTJ: "", //参考是否添加
        // PSSJ: "", //平扫 扫描时间

        // 增强
        ZQXLS: [
          {
            JSCJ: "", //并行加速采集
            ZFYZ: "", //脂肪抑制
            TR: "", //TR(ms)
            TE: "", //TE(ms)
            FA: "", //FA(deg)
            FOV: "", //FOV(mm)
            JZ: "", //阵（像素）
            CMDW: "", //层面定位
            CH: "", //层厚（mm)
            CJ: "", //层距（mm)
            CS: "", //层数
            CJSJ: "", //采集时间（sec)
            QX: "", //期相
            SMSJ: "", //扫描时间
          },
        ],
        // ZQYCSJ: "", //增强序列 延迟时间
        // ZQFW: "", //增强 扫描范围（手动填写）
        // ZQXL: "", //增强 扫描序列（选项或手动填写）
        // ZQFX: "", //增强 扫描方向
        // ZQSJ: "", //增强 扫描时间
        // ZQSFTJ: "", //增强 是否添加

        //对比剂注射方案
        DDBJPP: "", //使用对比剂品牌:
        DND: "", //对比剂浓度
        DZSJL: "", // 注射剂量（ml/KG)：
        DZSFS: "", //注射方式
        DLS: "", //流速：
        DYSJL: "", //盐水剂量（ml）：
        // DYSLS: "", //盐水流速
        // DDYSJ: "", //打药时机：
        DYCSJ: "", //延迟时间：

        //影像表现及诊断思路
        YXBX: "", //影像表现及诊断思路
        acAccountName: "", // 实际案例人
        Files: [],
      },
      rules: {
        BSex: [{ require: true }], // 性别
        PAge: [{ required: true, message: "请输入年龄", trigger: "blur" }], // 年龄
        pHeight: [{ required: true, message: "请输入身高", trigger: "blur" }], //身高--
        pWeight: [{ required: true, message: "请输入体重", trigger: "blur" }], //体重--
        // PAge: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        BBMI: [
          // { required: true, message: "请选择BMI", trigger: "blur" },
          // { validator: validateNumber1, trigger: "blur" },
        ],
        BZS: [{ required: false, message: "请输入主诉", trigger: "blur" }],
        PBSJC: [
          { required: false, message: "请输入病史及检查结果", trigger: "blur" },
        ],
        BSGN_JG: [{ required: true, message: "请输入肌酐", trigger: "blur" }], // 肾功能 肌酐
        BSGN_JXQ: [
          { required: false, message: "请输入肾小球滤过率", trigger: "blur" },
        ], // 肾功能 肾小球滤过率
        BGZWT: [
          {
            required: false,
            message: "请输入本次检查关注问题",
            trigger: "blur",
          },
        ],
        // PGWYS: [
        //   { required: true, message: "请输入高危因素筛查", trigger: "blur" },
        // ],
        BSMBW: [{ required: true, message: "请输入扫描部位", trigger: "blur" }],
        JJQPP: [{ required: true, message: "请选择机器品牌", trigger: "blur" }],
        // JPS: [{ required: true, message: "请选择排数", trigger: "blur" }],
        JGDY: [
          { required: true, message: "请输入管电压", trigger: "blur" },
          // { validator: validateNumber2, trigger: "blur" },
        ],
        // JXZSJ: [
        //   { required: false, message: "请输入旋转时间", trigger: "blur" },
        //   { validator: validateNumber1, trigger: "blur" },
        // ],
        // JZZ: [
        //   { required: false, message: "请输入准直", trigger: "blur" },
        //   { validator: validateNumber2, trigger: "blur" },
        // ],
        // JLJ: [
        //   { required: false, message: "请输入螺距", trigger: "blur" },
        //   { validator: validateNumber1, trigger: "blur" },
        // ],
        // JCH: [
        //   { required: false, message: "请输入层厚", trigger: "blur" },
        //   { validator: validateNumber1, trigger: "blur" },
        // ],
        ZQYCSJ: [
          {
            required: true,
            message: "请输入注射对比剂后的延迟时间",
            trigger: "blur",
          },
        ], //增强序列 延迟时间
        ZQFW: [{ required: true, message: "请输入扫描范围", trigger: "blur" }], //增强 扫描范围
        ZQXL: [{ required: true, message: "请输入扫描序列", trigger: "blur" }], //增强 扫描序列
        ZQFX: [{ required: true, message: "请输入扫描方向", trigger: "blur" }], //增强 扫描方向
        ZQSJ: [{ required: true, message: "请输入扫描时间", trigger: "blur" }], //增强 扫描时间
        DDBJPP: [
          { required: true, message: "请输入使用对比剂品牌", trigger: "blur" },
        ],
        DND: [
          { required: false, message: "请输入浓度", trigger: "blur" },
          // { validator: validateNumber1, trigger: "blur" },
        ],
        DZSJL: [
          { required: true, message: "请输入注射剂量", trigger: "blur" },
          // { validator: validateNumber1, trigger: "blur" },
        ],
        DLS: [
          { required: true, message: "请输入流速", trigger: "blur" },
          // { validator: validateNumber1, trigger: "blur" },
        ],
        // IDR: [{ required: true, message: "请输入碘流率", trigger: "blur" }],
        // TIL: [{ required: true, message: "请输入碘总量", trigger: "blur" }],
        DZSFS: [
          { required: false, message: "请输入注射方式", trigger: "blur" },
        ],
        DYSLS: [
          { required: false, message: "请输入盐水流速", trigger: "blur" },
        ], //盐水流速
        DDYSJ: [
          { required: false, message: "请输入打药时机", trigger: "blur" },
        ], //打药时机
        DYCSJ: [
          { required: false, message: "请输入延迟时间", trigger: "blur" },
        ], //延迟时间
        YXBX: [
          {
            required: true,
            message: "影像表现及诊断思路",
            trigger: "blur",
          },
          {
            validator: validateNumber50,
            trigger: "blur",
          },
        ],
        Files: [{ validator: validateFiles }],
      },
      options: [
        {
          label: "神经",
          options: [
            {
              value: "颅脑",
              label: "颅脑",
            },
            {
              value: "颈部",
              label: "颈部",
            },
            {
              value: "头颈MRA",
              label: "头颈MRA",
            },
            {
              value: "内耳",
              label: "内耳",
            },
          ],
        },
        {
          label: "心胸",
          options: [
            {
              value: "心脏",
              label: "心脏",
            },
            {
              value: "心血管MRA",
              label: "心血管MRA",
            },
          ],
        },
        {
          label: "腹部",
          options: [
            {
              value: "盆腔",
              label: "盆腔",
            },
            {
              value: "肝脏",
              label: "肝脏",
            },
            {
              value: "肾脏",
              label: "肾脏",
            },
            {
              value: "胃肠",
              label: "胃肠",
            },
            {
              value: "胆胰脾",
              label: "胆胰脾",
            },
          ],
        },
        {
          label: "磁共振",
          options: [
            {
              value: "乳腺",
              label: "乳腺",
            },
            {
              value: "全身MRA",
              label: "全身MRA",
            },
            {
              value: "骨肌",
              label: "骨肌",
            },
            {
              value: "骨关节",
              label: "骨关节",
            },
          ],
        },
      ],
      options2: [],
      FormIsDisabled: this.tablerow.readOnly,
    };
  },
  methods: {
    DDBJPPChange(val) {
      if (val === "其他") {
        this.DBJPPOTHER = true;
        this.submitCaseForm.DDBJPP = "";
      } else {
        this.DBJPPOTHER = false;
      }
    },
    backSelect() {
      this.DBJPPOTHER = false;
      this.submitCaseForm.DDBJPP = "";
    },
    addZQXLForm() {
      if (this.submitCaseForm.ZQXLS.length >= 3) {
        this.$message({
          message: "最多只有三个增强序列",
          type: "warning",
        });
        return;
      }
      const obj = {
        JSCJ: "", //并行加速采集
        ZFYZ: "", //脂肪抑制
        TR: "", //TR(ms)
        TE: "", //TE(ms)
        FA: "", //FA(deg)
        FOV: "", //FOV(mm)
        JZ: "", //阵（像素）
        CMDW: "", //层面定位
        CH: "", //层厚（mm)
        CJ: "", //层距（mm)
        CS: "", //层数
        CJSJ: "", //采集时间（sec)
        QX: "", //期相
        SMSJ: "", //扫描时间
      };
      this.submitCaseForm.ZQXLS.push(obj);
    },
    deleteZQXLForm() {
      if (this.submitCaseForm.ZQXLS.length <= 1) {
        this.$message({
          type: "warning",
          message: "最少必须有一个增强序列",
        });
        return;
      }
      this.submitCaseForm.ZQXLS.pop();
    },
    addPSXL() {
      if (this.submitCaseForm.PSXLS.length === 5) {
        this.$message({
          type: "warning",
          message: "平扫序列最多添加 5 个",
        });
        return;
      }
      const textobj = {
        text: "",
      };
      this.submitCaseForm.PSXLS.push(textobj);
    },
    removePSXL() {
      if (this.submitCaseForm.PSXLS.length === 1) {
        this.$message({
          type: "warning",
          message: "平扫序列至少有 1 个",
        });
        return;
      }
      this.submitCaseForm.PSXLS.pop();
    },
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate((value) => {
        if (value) {
          if (that.submitCaseForm.Files.length === 0) {
            that.$message.error("必须上传案例");
            return;
          }
          if (that.tablerow.caseForm) {
            // 修改
            that.UpdatePatientCase((res) => {
              if (res.status == 204 || res.status == 200) {
                that.$message.success("修改成功");
                const form1 = res.data;
                that.$emit("updateForm", form1);
              } else {
                that.$message.error(res.response.data.Message);
              }
            });
          } else {
            // 提交
            that.SavePatientCase((res) => {
              if (res.status == 204 || res.status == 200) {
                that.$message.success("提交成功");
                const form1 = res.data;
                that.$emit("submitForm", form1);
              } else {
                that.$message.error(res.response.data.Message);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    SavePatientCase(func) {
      this.stringToNumber();

      const t = this;
      Vue.axios
        .post("/PatientCase/SaveMRPatientCase", t.submitCaseForm)
        .then((response) => {
          if (typeof func == "function") {
            func(response);
          }
        })
        .catch((error) => {
          if (typeof func == "function") {
            func(error);
          }
        });
    },
    UpdatePatientCase(func) {
      this.stringToNumber();

      const t = this;
      Vue.axios
        .post("/PatientCase/UpdateMRPatientCase", t.submitCaseForm)
        .then((response) => {
          if (typeof func == "function") {
            func(response);
          }
        })
        .catch((error) => {
          if (typeof func == "function") {
            func(error);
          }
        });
    },
    stringToNumber() {
      /*
     
  "JGDY": 12,
  "JXZSJ": 13.0,
  "JZZ": 14,
  "JLJ": 15.0,
  "JCH": 16.0,
  
  "DND": 18.0,
  "DZSJL": 19.0,
  "DLS": 20.0,
 
      */
      // this.submitCaseForm.JGDY = parseFloat(this.submitCaseForm.JGDY);
      // this.submitCaseForm.DND = parseFloat(this.submitCaseForm.DND);
      // this.submitCaseForm.DZSJL = parseFloat(this.submitCaseForm.DZSJL);
      // this.submitCaseForm.DLS = parseFloat(this.submitCaseForm.DLS);
      // this.submitCaseForm.IDR = parseFloat(this.submitCaseForm.IDR);
      // this.submitCaseForm.TIL = parseFloat(this.submitCaseForm.TIL);
    },
    cancelForm() {
      window.removeEventListener("beforeunload", (e) =>
        this.beforeunloadHandler(e)
      );
      this.$emit("cancel-submit");
    },
    goBack() {
      // console.log('go back');
      window.removeEventListener("beforeunload", (e) =>
        this.beforeunloadHandler(e)
      );
      this.$emit("goBack");
    },
    beforeunloadHandler(e) {
      e = e | window.event;
      if (e) {
        e.returnValue = "有内容未保存";
      }
      return "有内容未保存";
    },
    selected(item) {
      // console.log(item);
      this.options2 = this.options.filter((cur) => {
        return cur.label === item;
      })[0].options;
    },
    keyUp(value) {
      console.log(value);
    },
    uploadSuccess(res) {
      this.submitCaseForm.Files.push({
        Id: res.UploadUniqueSN,
        Link: res.UrlLink,
        Name: res.FileName,
        FileSize: res.FileSize,
      });
    },
    uploadAgain() {
      this.$confirm("此操作将永久删除原案例, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.DeleteFileAsync();
        })
        .catch(() => {});
    },
    async DeleteFileAsync() {
      const result = await DeleteFile({
        fileId: this.submitCaseForm.Files[0].Id,
        patientCaseId: this.submitCaseForm.ID,
      });
      if (result.code === 1) {
        this.submitCaseForm.Files = [];
      } else {
        this.$alertError(result.error);
      }
    },
  },
  computed: {
    submitCaseForm: function () {
      if (this.tablerow.caseForm) {
        return this.tablerow.caseForm;
      }
      return this.caseForm;
    },
    IDR: function () {
      if (this.submitCaseForm.DND && this.submitCaseForm.DLS) {
        let dnd = this.submitCaseForm.DND;
        let dls = this.submitCaseForm.DLS;
        return ((dnd * dls) / 1000).toFixed(2);
      }
      return "";
    },
    TIL: function () {
      if (this.submitCaseForm.DND && this.submitCaseForm.DZSJL) {
        let dnd = this.submitCaseForm.DND;
        let dzsjl = this.submitCaseForm.DZSJL;
        return (dnd * dzsjl).toFixed(2);
      }
      return "";
    },
  },
  watch: {
    IDR: function (val) {
      this.submitCaseForm.IDR = val;
    },
    TIL: function (val) {
      this.submitCaseForm.TIL = val;
    },
  },
  filters: {
    formatSize: function (value) {
      // console.log(value / 1024);
      let v = value / 1024;
      if (v < 1024) {
        return Math.floor(v) + "K";
      }
      return Math.floor(v / 1024) + "M";
    },
  },
  components: {
    // PositiveNumberInput
    Upload,
    ScoreCase,
    // PSXLForm,
    ZQXLForm,
  },
  created() {
    // window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
    //
    // setInterval(()=>{
    //   console.log(this.source.ZQYCSJ);
    // }, 2000)
  },
  updated() {
    // console.log(this.submitCaseForm);
  },
  mounted() {
    console.log(this.submitCaseForm);
    // window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
    // if (!this.FormIsDisabled) {
    //   window.onbeforeunload = function(e) {
    //     e = e || window.event;
    //     // 兼容IE8和Firefox 4之前的版本
    //     if (e) {
    //       e.returnValue = "有内容未保存";
    //     }
    //     // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    //     return "有内容未保存";
    //   };
    // }
  },
  destroyed() {
    // window.removeEventListener("beforeunload", e =>
    //   this.beforeunloadHandler(e)
    // );
  },
  beforeRouteLeave(to, form, next) {
    const answer = window.confirm("有内容未保存");
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
};
</script>

<style scoped>
.submit_case_box {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
.boxScroll {
  max-height: 600px;
  overflow-y: auto;
}
.case_title {
  margin-top: 40px;
  margin-bottom: 20px;
}
.btn_box {
  margin-top: 60px;
}
.line {
  text-align: center;
}
.download_box {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.green_text {
}
.ZQBtns {
  margin-top: 20px;
}
.el-collapse >>> .el-collapse-item__header {
  font-size: 15px;
}
.el-form-item >>> .el-textarea.is-disabled .el-textarea__inner {
  color: #606266
}
.el-form-item >>> .el-input.is-disabled .el-input__inner {
  color: #606266
}
.el-form-item >>> .el-form-item__label {
  font-size: 16px;
}
.el-radio >>> .el-radio__input.is-disabled+span.el-radio__label {
  color: #606266
}
.el-input .el-textarea .el-radio {
  font-size: 16px;
}
</style>