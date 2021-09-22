<template>
  <div class="content_box_cus">
    <div v-if="!CreateCaseVisible">
      <div class="filter_box">
        <div class="btn_box">
          <el-button type="primary" @click="submitCase">提交案例</el-button>
        </div>
      </div>

      <el-table :data="dataSource">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="扫描部位" prop="BSMBW"></el-table-column>
        <el-table-column label="机器品牌" prop="JJQPP"></el-table-column>
        <el-table-column label="对比剂品牌" prop="DDBJPP"></el-table-column>
        <el-table-column label="提交时间">
          <template slot-scope="scope">
            <!-- <i class="el-icon-date"></i> -->
            <span>{{ scope.row.CreateTime | formatTime }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="viewClick(scope.row)" type="text" size="medium"
              >查看</el-button
            >
            <el-button
              @click="updateClick(scope.row)"
              type="text"
              size="medium"
              v-show="accountGrade === 3 || accountGrade === 0"
              >编辑</el-button
            >
            <el-button
              @click="deleteClick(scope.row)"
              type="text"
              size="medium"
              v-show="accountGrade === 3 || accountGrade === 0"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination_box"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="total, prev, pager, next, jumper"
        :total="total"
        :hide-on-single-page="false"
      ></el-pagination>
    </div>

    <div v-else>
      <CreateCase
        :tablerow="tableRow"
        :title="title"
        @goBack="CreateCaseVisible = false"
        @submitForm="submitForm"
        @updateForm="updateForm"
        @cancel-submit="cancelSubmit"
      ></CreateCase>
    </div>
    <!-- <el-dialog class="dialog_box" title="提交案例" :visible.sync="dialogFormVisible">
    </el-dialog>-->
  </div>
</template>

<script>
import CreateCase from "../../components/CreateCase/CreateCase";
import Vue from "vue";
import { GetPaitentCaseForPatientByPage } from "@/api/index.js";
import { mapState } from "vuex";

export default {
  name: "Case",
  data() {
    return {
      CreateCaseVisible: false,
      dataSource: [],
      tableRow: {
        readOnly: false,
        caseForm: null,
      },
      currentPage: 1,
      total: 1,
    };
  },
  methods: {
    submitCase() {
      this.CreateCaseVisible = true;
      this.tableRow.readOnly = false;
      this.tableRow.caseForm = null;
      this.title = "提交案例";
    },
    submitForm(data) {
      this.CreateCaseVisible = false;
      this.dataSource.push(data);
    },
    updateForm(data) {
      this.CreateCaseVisible = false;
      for (let i in this.dataSource) {
        if (this.dataSource[i].ID === data.ID) {
          this.dataSource[i] = data;
        }
      }
    },
    cancelSubmit() {
      this.CreateCaseVisible = false;
    },
    // GetPaitentCase(func) {
    //   Vue.axios
    //     .get("/PatientCase/GetPaitentCase")
    //     .then(response => {
    //       if (typeof func == "function") {
    //         func(response);
    //       }
    //     })
    //     .catch(error => {
    //       if (typeof func == "function") {
    //         func(error);
    //       }
    //     });
    // },
    async GetPaitentCaseByPageAsync() {
      const r = await GetPaitentCaseForPatientByPage({
        PageIndex: this.currentPage,
      });
      if (r.code === 1) {
        // console.log(r.data);
        this.dataSource = r.data.DataList;
        this.total = r.data.totalNum;
        this.currentPage = r.data.CurrentPage;
      } else {
        this.$alertError(r.error);
      }
    },
    viewClick(row) {
      this.CreateCaseVisible = true;
      this.tableRow.readOnly = true;
      this.tableRow.caseForm = row;
      this.title = "查看案例";
    },
    updateClick(row) {
      this.CreateCaseVisible = true;
      this.tableRow.readOnly = false;
      this.tableRow.caseForm = row;
      this.title = "修改案例";
    },
    deleteClick(item) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.DeletePatientCase(item.ID, (res) => {
            if (res.status === 200 || res.status === 204) {
              for (let i in this.dataSource) {
                if (this.dataSource[i].ID === item.ID) {
                  this.dataSource.splice(i, 1);
                  break;
                }
              }
            } else {
              this.$message.error(res.response.data.Message);
            }
          });
        })
        .catch(() => {});
    },
    DeletePatientCase(Id, func) {
      // const t = this;
      Vue.axios
        .post("/PatientCase/DeleteMRPatientCase", {
          Id: Id,
        })
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
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetPaitentCaseByPageAsync();
    },
    searchClick() {
      this.GetPaitentCaseByPageAsync();
    },
  },
  components: {
    CreateCase: CreateCase,
  },
  computed: {
    ...mapState(["accountGrade"]),
  },
  filters: {
    formatTime(value) {
      return value.replace("T", " ").substr(0, 16);
    },
  },
  mounted() {
    window.scroll({ top: 0, left: 0, behavior: "auto" });
    // const that = this;
    // this.GetPaitentCase(res => {
    //   if (res.status === 200 || res.status === 204) {
    //     // console.log(this);
    //     that.dataSource = res.data;
    //   } else {
    //     that.$message.error(res.response.data.Message);
    //   }
    // });
    //
    this.GetPaitentCaseByPageAsync();
  },
};
</script>

<style scoped>
.content_box_cus {
  max-width: 1000px;
  background-color: #ffffff;
  padding: 20px;
  margin: 40px auto;
}
.dialog_box {
  max-height: 600px;
}
.filter_box {
  margin-bottom: 20px;
}
.btn_box {
  margin-bottom: 40px;
}
.pagination_box {
  margin-top: 20px;
}
</style>