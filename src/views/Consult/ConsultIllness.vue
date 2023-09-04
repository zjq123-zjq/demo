import CpIcon from '@/components/CpIcon.vue';
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/consult'
import type { ConsultIllness, Image } from '@/types/consult'
import { IllnessTime } from '@/enums'
import { uploadImage } from '@/services/consult'
import { showToast } from 'vant'
import type { UploaderAfterRead, UploaderFileListItem } from 'vant/lib/uploader/types'
import { showConfirmDialog } from 'vant'
const router = useRouter()
const store = useCounterStore()
const timeOptions = [
  { label: '一周内', value: IllnessTime.week },
  { label: '一月内', value: IllnessTime.Month },
  { label: '半年内', value: IllnessTime.HalfYear },
  { label: '大于半年', value: IllnessTime.More }
]
const flagOptions = [
  { label: '就诊过', value: 0 },
  { label: '没就诊过', value: 1 }
]
const form = ref<ConsultIllness>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})

const onAfterRead: UploaderAfterRead = async (item: any) => {
  if (!item.file) return
  item.state = 'uploading'
  item.message = '上传中...'
  try {
    const res = await uploadImage(item.file)
    form.value.pictures?.push(res.data)
    item.url = res.data.url
    item.state = 'done'
    item.message = ''
  } catch {
    item.state = 'failed'
    item.message = '上传失败'
  }
}
const OnDeleteImg = (item: UploaderFileListItem) => {
  form.value.pictures = form.value.pictures?.filter((pic) => pic.url !== item.url)
}

const disabled = computed(
  () =>
    !form.value.illnessDesc ||
    form.value.illnessTime === undefined ||
    form.value.consultFlag === undefined
)
const next = () => {
  if (!form.value.illnessDesc) return showToast('请输入病情描述')
  if (form.value.illnessTime === undefined) return showToast('请输入症状持续时间')
  if (form.value.consultFlag === undefined) return showToast('请输入是否已经就诊')
  store.setIllness(form.value)
  router.push('/user/patient?isChange=1')
}
const fileList = ref<Image[]>([])

onMounted(() => {
  if (store.consult.illnessDesc) {
    showConfirmDialog({
      title: '温馨提示',
      message: '是否恢复您之前填写的病情信息呢？',
      confirmButtonColor: 'var(--cp-primary)'
    })
      .then(() => {
        const { illnessDesc, illnessTime, consultFlag, pictures } = store.consult
        form.value = { illnessDesc, illnessTime, consultFlag, pictures }
        fileList.value = pictures || []
      })
      .catch(() => {
        // on cancel
      })
  }
})
</script>

<template>
  <div class="consult-illness-page">
    <CpNavBar title="图文问诊"></CpNavBar>
    <div class="illness-tip van-hairline--bottom">
      <img src="@/assets/avatar-doctor.svg" alt="" class="img" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">请描述你的疾病或症状、是否用药、就诊经历，需要我提供什么样的帮助</p>
        <p class="safe"><CpIcon name="consult-safe" class="icon" /><span>内容仅医生可见</span></p>
      </div>
    </div>
    <div class="illness-form">
      <van-field
        type="textarea"
        v-model="form.illnessDesc"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
      />
      <div class="item">
        <p>本次患病多久了？</p>
        <CpRadioBtn :options="timeOptions" v-model="form.illnessTime"></CpRadioBtn>
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <CpRadioBtn :options="flagOptions" v-model="form.consultFlag"></CpRadioBtn>
      </div>
    </div>
    <div class="illness-img">
      <van-uploader
        :after-read="onAfterRead"
        @delete="OnDeleteImg"
        v-model="fileList"
        max-count="9"
        :max-size="5 * 1024 * 1024"
        upload-icon="photo-o"
        upload-text="上传图片"
      />
      <p>上传内容仅医生可见，最多9张图，最大5MB</p>
    </div>
    <div class="btn">
      <van-button block round type="primary" @click="next" :class="{ disabled }">下一步</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-illness-page {
  padding-top: 46px;

  .illness-tip {
    display: flex;
    padding: 15px;

    .img {
      width: 52px;
      height: 52px;
      overflow: hidden;
      margin-top: 10px;
    }

    .info {
      font-size: 16px;
      flex: 1;
      padding-left: 12px;

      .tit {
        font-size: 16px;
        margin-bottom: 5px;
      }

      .tip {
        padding: 12px;
        background: var(--cp-bg);
        color: var(--cp-text3);
        font-size: 13px;
        margin-bottom: 10px;
      }

      .safe {
        font-size: 10px;
        color: var(--cp-text3);
        display: flex;
        align-items: center;

        .icon {
          font-size: 12px;
          margin-right: 2px;
        }
      }
    }
  }

  .illness-form {
    padding: 15px;

    .van-field {
      padding: 0;

      &::after {
        border-bottom: none;
      }
    }

    .item {
      > p {
        color: var(--cp-text3);
        padding: 15px 0;
      }
    }
  }

  .illness-img {
    padding-top: 16px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;

    .tip {
      font-size: 12px;
      color: var(--cp-tip);
    }

    ::v-deep() {
      .van-uploader {
        &__preview {
          &-delete {
            left: -6px;
            top: -6px;
            border-radius: 50%;
            background-color: var(--cp-primary);
            width: 20px;
            height: 20px;

            &-icon {
              transform: scale(0.9) translate(-22%, 22%);
            }
          }

          &-image {
            border-radius: 8px;
            overflow: hidden;
          }
        }

        &__upload {
          border-radius: 8px;
        }

        &__upload-icon {
          color: var(--cp-text3);
        }
      }
    }
  }

  .btn {
    padding: 0 15px;

    .van-button {
      font-size: 16px;
      margin-bottom: 30px;
      background-color: var(--cp-primary);

      &.disabled {
        opacity: 1;
        background: #fafafa;
        color: #d9dbde;
        border: #fafafa;
      }
    }
  }
}
</style>
