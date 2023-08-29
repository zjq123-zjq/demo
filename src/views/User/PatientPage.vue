<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import CpIcon from '@/components/CpIcon.vue'
import { getPatientList, addPatient, editPatient, delPatient } from '@/services/patient'
import type { Patient, PatientList } from '@/types/user.d'
import { showToast } from 'vant'
import Validator from 'id-validator'
import { showConfirmDialog } from 'vant'
const router = useRouter()

const defaultFlag = computed({
  get() {
    return patient.value.defaultFlag === 1 ? true : false
  },
  set(value) {
    patient.value.defaultFlag = value ? 1 : 0
  }
})
const initPatient: Patient = {
  name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0
}
const patient = ref<Patient>({ ...initPatient })
const list = ref<PatientList>([])
//请求接口数据
const getlist = async () => {
  let res = await getPatientList()
  list.value = res.data
}
getlist()
const showRight = ref(false)
//单选数据
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]
const gender = ref(1)
//打开弹框
const showPopup = (item?: Patient) => {
  if (item) {
    const { id, gender, name, idCard, defaultFlag } = item
    patient.value = { id, gender, name, idCard, defaultFlag }
  } else {
    patient.value = { ...initPatient }
  }

  showRight.value = true
}
//关闭弹框
const backPopup = () => {
  showRight.value = false
}
//保存患者
const submit = async () => {
  if (!patient.value.name) return showToast('请输入真实姓名')
  if (!patient.value.idCard) return showToast('请输入身份证号')
  const validator = new Validator()
  if (!validator.isValid(patient.value.idCard)) return showToast('身份证格式错误')
  const { sex } = validator.getInfo(patient.value.idCard)
  if (patient.value.gender !== sex) return showToast('性别和身份证不符')
  if (patient.value.id) {
    await editPatient(patient.value)
  } else {
    await addPatient(patient.value)
  }

  showRight.value = false
  getlist()
  showToast(patient.value.id ? '编辑成功' : '添加成功')
}
//删除
const remove = async () => {
  if (patient.value.id) {
    await showConfirmDialog({
      title: '温馨提示',
      message: `您确认要删除 ${patient.value.name} 患者信息吗？`
    })
    await delPatient(patient.value.id)
  }

  showRight.value = false
  getlist()
  showToast('删除成功')
}
</script>

<template>
  <div class="patien-page">
    <CpNavBar title="家庭档案"></CpNavBar>
    <div class="patien-page-list" v-for="(item, index) in list" :key="index">
      <div class="item">
        <div class="name">{{ item?.name }}</div>
        <div class="idCard">
          {{ item?.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2') }}
        </div>
        <div class="gender">{{ item?.genderValue }}</div>
        <div class="age">{{ item?.age }}</div>
      </div>
      <div class="tag" v-if="item?.defaultFlag === 1">默认</div>
      <div class="icon" @click="showPopup(item)">
        <CpIcon name="user-edit"></CpIcon>
      </div>
    </div>
    <div class="patien-page-add" v-if="list.length < 6" @click="showPopup()">
      <div class="icon">
        <CpIcon name="user-add"></CpIcon>
      </div>
      <p>添加患者</p>
    </div>
    <div class="patien-page-tip">最多可添加6人</div>
    <!-- 模态框 -->
    <van-popup v-model:show="showRight" position="right" :style="{ width: '100%', height: '100%' }">
      <CpNavBar
        :back="backPopup"
        :title="patient.id ? '编辑患者' : '添加患者'"
        rightText="保存"
        @click-right="submit"
      ></CpNavBar>
      <van-form autocomplete="off">
        <van-field v-model="patient.name" label="真实姓名" placeholder="请输入真实姓名" />
        <van-field v-model="patient.idCard" label="身份证号" placeholder="请输入身份证号" />
        <van-field label="性别">
          <template #input>
            <cp-radio-btn :options="options" v-model="patient.gender"></cp-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox round v-model="defaultFlag" />
          </template>
        </van-field>
      </van-form>
      <van-action-bar v-if="patient.id">
        <van-action-bar-button @click="remove"> 删除 </van-action-bar-button>
      </van-action-bar>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.patien-page {
  margin-top: 60px;
  padding: 0 15px;

  &-list {
    background-color: var(--cp-line);
    padding: 20px;
    border-radius: 5px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .item {
      width: 65%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .name {
        width: 30%;
        font-size: 16px;
        color: var(--cp-text1);
      }

      .idCard {
        width: 70%;
      }

      .gender {
        width: 30px;
        margin-top: 10px;
        color: var(--cp-dark);
      }

      .age {
        margin-top: 15px;
        color: var(--cp-dark);
      }
    }

    .tag {
      width: 30px;
      height: 20px;
      font-size: 11px;
      text-align: center;
      line-height: 20px;
      background-color: var(--cp-primary);
      color: white;
    }

    .icon {
      display: flex;
      align-items: center;
      font-size: 18px;
    }
  }

  &-add {
    background-color: var(--cp-line);
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .icon {
      width: 100%;
      text-align: center;
      color: var(--cp-primary);
      font-size: 25px;
    }

    p {
      width: 100%;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      color: var(--cp-primary);
    }
  }

  &-tip {
    margin-top: 20px;
    font-size: 15px;
  }
  ::v-deep() {
    .van-form {
      padding-top: 50px;
    }
    .van-action-bar {
      padding: 0 10px;
      margin-bottom: 10px;
      .van-button {
        color: var(--cp-price);
        background-color: var(--cp-bg);
      }
    }
  }
}
</style>
