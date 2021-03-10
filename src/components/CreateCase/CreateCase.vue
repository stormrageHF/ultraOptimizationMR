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
              <h2>病史</h2>
            </div>

            <!-- <el-form-item label="患者年龄" prop="PAge">
              <el-select v-model="submitCaseForm.PAge" placeholder="患者年龄" style="width:100%">
                <el-option label="成人" value="成人"></el-option>
                <el-option label="儿童" value="儿童"></el-option>
              </el-select>
            </el-form-item> -->

            <!-- 18-21；21-25；25以上；无信息 -->
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
            <el-form-item label="患者性别" prop="BSex">
              <el-radio v-model="submitCaseForm.BSex" label="0">男</el-radio>
              <el-radio v-model="submitCaseForm.BSex" label="1">女</el-radio>
            </el-form-item>
            <el-form-item label="扫描部位" prop="BSMBW" required>
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
                  v-model="submitCaseForm.JSMBW1"
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

              <!-- <el-select v-model="submitCaseForm.JSMBW" placeholder="扫描部位" style="width:100%">
            <el-option-group v-for="group in options" :key="group.label" :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-option-group>
              </el-select>-->
            </el-form-item>
            <el-form-item label="肾功能（肌酐，肾小球滤过率）">
              <el-input
                v-model="submitCaseForm.BSGN"
                type="textarea"
                rows="5"
                placeholder="肾功能（肌酐，肾小球滤过率）"
                resize="none"
              ></el-input>
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
            <el-form-item label="病史" prop="BS">
              <el-input
                v-model="submitCaseForm.BBS"
                type="textarea"
                rows="5"
                placeholder="病史"
                resize="none"
              ></el-input>
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
            <el-form-item label="本次检查关注问题" prop="BGZWT">
              <el-input
                v-model="submitCaseForm.BGZWT"
                type="textarea"
                rows="5"
                placeholder="本次检查关注问题"
                resize="none"
              ></el-input>
            </el-form-item>

            <!-- <el-form-item label="高危因素筛查" prop="PGWYS">
              <el-select
                v-model="submitCaseForm.PGWYS"
                placeholder="高危因素筛查"
                style="width: 100%"
              >
                <el-option label="低危" value="低危"></el-option>
                <el-option label="中危" value="中危"></el-option>
                <el-option label="高危" value="高危"></el-option>
                <el-option label="未知" value="未知"></el-option>
              </el-select>
            </el-form-item> -->

            <el-divider></el-divider>

            <div class="case_title">
              <h2>检查方案</h2>
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
            <el-form-item label="机型">
              <el-input
                v-model="submitCaseForm.JJX"
                type="text"
                placeholder="机型"
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
                v-model="submitCaseForm.JZSXT"
                type="text"
                placeholder="注射系统"
              ></el-input>
            </el-form-item>
            <el-form-item label="扫描方案及序列">
              <el-input
                v-model="submitCaseForm.JZQXLMC"
                type="text"
                placeholder="扫描方案及序列"
              ></el-input>
            </el-form-item>
            <el-form-item label="并行加速采集">
              <el-input
                v-model="submitCaseForm.JJSCJ"
                type="text"
                placeholder="并行加速采集"
              ></el-input>
            </el-form-item>
            <el-form-item label="脂肪抑制">
              <el-input
                v-model="submitCaseForm.JZFYZ"
                type="text"
                placeholder="脂肪抑制"
              ></el-input>
            </el-form-item>
            <el-form-item label="TR" prop="JTR">
              <el-input
                v-model.number="submitCaseForm.JTR"
                type="text"
                placeholder="TR"
              >
                <template slot="append">ms</template>
              </el-input>
            </el-form-item>
            <el-form-item label="TE" prop="JTE">
              <el-input
                v-model.number="submitCaseForm.JTE"
                type="text"
                placeholder="TE"
              >
                <template slot="append">ms</template>
              </el-input>
            </el-form-item>
            <el-form-item label="FA" prop="JFA">
              <el-input
                v-model.number="submitCaseForm.JFA"
                type="text"
                placeholder="FA"
              >
                <template slot="append">deg</template>
              </el-input>
            </el-form-item>
            <el-form-item label="FOV" prop="JFOV">
              <el-input
                v-model.number="submitCaseForm.JFOV"
                type="text"
                placeholder="FOV"
              >
                <template slot="append">mm</template>
              </el-input>
            </el-form-item>
            <el-form-item label="矩阵" prop="JJZ">
              <el-input
                v-model.number="submitCaseForm.JJZ"
                type="text"
                placeholder="矩阵"
              >
                <template slot="append">像素</template>
              </el-input>
            </el-form-item>
            <el-form-item label="层面定位">
              <el-input
                v-model="submitCaseForm.JCMDW"
                type="text"
                placeholder="层面定位"
              ></el-input>
            </el-form-item>
            <el-form-item label="层厚" prop="JCH">
              <el-input
                v-model="submitCaseForm.JCH"
                type="text"
                placeholder="层厚"
              >
                <template slot="append">mm</template>
              </el-input>
            </el-form-item>
            <el-form-item label="层距" prop="JCJ">
              <el-input
                v-model="submitCaseForm.JCJ"
                type="text"
                placeholder="层距"
              >
                <template slot="append">mm</template>
              </el-input>
            </el-form-item>
            <el-form-item label="层数">
              <el-input
                v-model="submitCaseForm.JCS"
                type="text"
                placeholder="层数"
              ></el-input>
            </el-form-item>
            <el-form-item label="采集时间" prop="JCJSJ">
              <el-input
                v-model="submitCaseForm.JCJSJ"
                type="text"
                placeholder="采集时间"
              >
                <template slot="append">sec</template>
              </el-input>
            </el-form-item>
            <el-form-item label="期相" prop="JQX">
              <el-input
                v-model="submitCaseForm.JQX"
                type="text"
                placeholder="期相"
              >
                <template slot="append">mm</template>
              </el-input>
            </el-form-item>
            <el-form-item label="扫描时间" prop="JSMSJ">
              <el-input
                v-model="submitCaseForm.JSMSJ"
                type="text"
                placeholder="扫描时间"
              >
                <template slot="append">mm</template>
              </el-input>
            </el-form-item>

            <el-divider></el-divider>

            <div class="case_title">
              <h2>对比剂注射方案</h2>
            </div>
            <el-form-item label="使用对比剂品牌" prop="DDBJPP">
              <el-select
                v-model="submitCaseForm.DDBJPP"
                placeholder="使用对比剂品牌"
                style="width: 100%"
              >
                <el-option label="马根维显" value="马根维显"></el-option>
                <el-option label="加乐显" value="加乐显"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="弛豫率" prop="DCYL">
              <el-input
                v-model="submitCaseForm.DCYL"
                type="text"
                placeholder="弛豫率"
              >
              </el-input>
            </el-form-item> -->
            <el-form-item label="注射剂量" prop="DZSJL">
              <el-input
                v-model="submitCaseForm.DZSJL"
                type="text"
                placeholder="注射剂量"
              >
                <template slot="append">mL/KG</template>
              </el-input>
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
            <el-form-item label="打药时机" prop="DDYSJ">
              <el-input
                v-model="submitCaseForm.DDYSJ"
                type="text"
                placeholder="打药时机"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="延迟时间" prop="DYCSJ">
              <el-input
                v-model="submitCaseForm.DYCSJ"
                type="text"
                placeholder="延迟时间"
              >
              </el-input>
            </el-form-item>

            <!-- <el-form-item label="碘流率 IDR" prop="IDR">
              <el-input
                v-model="IDR"
                type="text"
                placeholder="碘流率 IDR = (浓度*流速)/1000"
              >
                <template slot="append">gI/s</template>
              </el-input>
            </el-form-item>
            <el-form-item label="碘总量 TIL" prop="TIL">
              <el-input
                v-model="TIL"
                type="text"
                placeholder="碘总量 TIL = 浓度*注射剂量"
              >
                <template slot="append">mg</template>
              </el-input>
            </el-form-item> -->

            <el-divider></el-divider>

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

            <div v-if="!FormIsDisabled && submitCaseForm.Files.length === 0">
              <div class="case_title">
                <h2>上传案例</h2>
              </div>
              <el-form-item label="实际提交案例人" required="">
                <el-input v-model="submitCaseForm.acAccountName" type="text"></el-input>
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
          :scoreType="submitCaseForm.BSMBW"
          :disabled="scoreReadOnly"
        ></ScoreCase>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  POSITIVE_NUMBER_REG,
  INTEGER_NUMBER_REG,
} from "../../commen/js/commen";
import Vue from "vue";
import Upload from "../Upload/Upload";
import { DeleteFile } from "@/api/index.js";
import ScoreCase from "../ScoreCase/ScoreCase";

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
    // 选填正数
    var validateNumber1 = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else if (!POSITIVE_NUMBER_REG.test(value)) {
        callback(new Error("必须是大于0的数字"));
      } else {
        callback();
      }
    };
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

    // 选填正整数
    var validateNumber2 = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else if (!INTEGER_NUMBER_REG.test(value)) {
        callback(new Error("必须是大于0的整数"));
      } else {
        callback();
      }
    };
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
      caseForm: {
        //病史
        BBMI: "", //BMI
        BPatientName: "", //患者姓名
        BSMBW: "", //扫描部位
        BSGN: "", //肾功能（肌酐，肾小球滤过率）
        BBS: "", //病史
        BLCZD: "", //   临床诊断
        BZS: "", //主诉
        BGZWT: "", //本次检查关注问题
        //检查方案
        JJQPP: "", //磁共振机器品牌
        JJX: "", //机型
        JCQ: "", //场强（T）
        JXQ: "", //线圈
        JZSXT: "", //注射系统
        JZQXLMC: "", //扫描方案及序列
        JJSCJ: "", //并行加速采集
        JZFYZ: "", //脂肪抑制
        JTR: "", //TR(ms)
        JTE: "", //TE(ms)
        JFA: "", //FA(deg)
        JFOV: "", //FOV(mm)
        JJZ: "", //阵（像素）
        JCMDW: "", //层面定位
        JCH: "", //层厚（mm)
        JCJ: "", //层距（mm)
        JCS: "", //层数
        JCJSJ: "", //采集时间（sec)
        JQX: "", //期相
        JSMSJ: "", //扫描时间
        //对比剂注射方案
        DDBJPP: "", //使用对比剂品牌:
        // DCYL: "", //弛豫率：
        DZSJL: "", // 注射剂量（ml/KG)：
        DLS: "", //流速：
        DYSJL: "", //盐水剂量（ml）：
        DZSFS: "", //注射方式：
        DDYSJ: "", //打药时机：
        DYCSJ: "", //延迟时间：
        //影像表现及诊断思路
        YXBX: "", //影像表现及诊断思路
        acAccountName: "", // 实际案例人
        Files: [],
      },
      rules: {
        // PAge: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        BBMI: [
          { required: true, message: "请选择BMI", trigger: "blur" },
          // { validator: validateNumber1, trigger: "blur" },
        ],
        BZS: [{ required: false, message: "请输入主诉", trigger: "blur" }],
        PBSJC: [
          { required: false, message: "请输入病史及检查结果", trigger: "blur" },
        ],
        BGZWT: [
          {
            required: false,
            message: "请输入本次检查关注问题",
            trigger: "blur",
          },
        ],
        PGWYS: [
          { required: true, message: "请输入高危因素筛查", trigger: "blur" },
        ],
        BSMBW: [{ required: true, message: "请选择扫描部位", trigger: "blur" }],
        JJQPP: [{ required: true, message: "请选择机器品牌", trigger: "blur" }],
        JPS: [{ required: true, message: "请选择排数", trigger: "blur" }],
        JGDY: [
          { required: true, message: "请输入管电压", trigger: "blur" },
          { validator: validateNumber2, trigger: "blur" },
        ],
        JXZSJ: [
          { required: false, message: "请输入旋转时间", trigger: "blur" },
          { validator: validateNumber1, trigger: "blur" },
        ],
        JZZ: [
          { required: false, message: "请输入准直", trigger: "blur" },
          { validator: validateNumber2, trigger: "blur" },
        ],
        JLJ: [
          { required: false, message: "请输入螺距", trigger: "blur" },
          { validator: validateNumber1, trigger: "blur" },
        ],
        JCH: [
          { required: false, message: "请输入层厚", trigger: "blur" },
          { validator: validateNumber1, trigger: "blur" },
        ],
        DDBJPP: [
          { required: true, message: "请输入使用对比剂品牌", trigger: "blur" },
        ],
        DND: [
          { required: true, message: "请输入浓度", trigger: "blur" },
          { validator: validateNumber1, trigger: "blur" },
        ],
        DZSJL: [
          { required: true, message: "请输入注射剂量", trigger: "blur" },
          { validator: validateNumber1, trigger: "blur" },
        ],
        DLS: [
          { required: true, message: "请输入流速", trigger: "blur" },
          { validator: validateNumber1, trigger: "blur" },
        ],
        IDR: [{ required: true, message: "请输入碘流率", trigger: "blur" }],
        TIL: [{ required: true, message: "请输入碘总量", trigger: "blur" }],
        DZSFS: [{ required: true, message: "请输入注射方式", trigger: "blur" }],
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
              value: "脊髓",
              label: "脊髓",
            },
            {
              value: "头颈MRA",
              label: "头颈MRA",
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
              value: "男性盆腔",
              label: "男性盆腔",
            },
            {
              value: "女性盆腔",
              label: "女性盆腔",
            },
            {
              value: "胆胰脾",
              label: "胆胰脾",
            },
            {
              value: "双肾",
              label: "双肾",
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
              value: "其他MRA",
              label: "其他MRA",
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
  },
  created() {
    // window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
    //
  },
  updated() {
    // console.log(this.submitCaseForm);
  },
  mounted() {
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
</style>