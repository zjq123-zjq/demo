import { ref } from 'vue'
import type { FollowType, ConsultOrderItem } from '@/types/consult'
import { followDotor, cancelOrder, getPrescriptionPic, deleteOrder } from '@/services/consult'
import { OrderType } from '@/enums'

import { ImagePreview, showToast, showImagePreview } from 'vant'
import type { OrderDetailResponseType } from '@/types/order'
import { getMedicalOrderDetail } from '@/services/order'
export const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false)
  const follow = async (obj: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followDotor(obj.id, type)
      obj.likeFlag = obj.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return { loading, follow }
}

//取消订单
export const useCancelOrder = () => {
  const loading = ref(false)
  const cancelConsultOrder = (item: ConsultOrderItem) => {
    loading.value = true
    cancelOrder(item.id)
      .then(() => {
        item.status = OrderType.ConsultCancel
        item.statusValue = '已取消'
        showToast('取消成功')
      })
      .catch(() => {
        showToast('取消失败')
      })
      .finally(() => {
        loading.value = false
      })
  }
  return { loading, cancelConsultOrder }
}
//删除订单
export const useDeleteOrder = (cb: (id: string | number) => void) => {
  const deleteLoading = ref(false)
  const deleteConsultOrder = async (item: ConsultOrderItem) => {
    deleteLoading.value = true
    try {
      await deleteOrder(item.id)
      showToast('删除成功')
    } catch {
      showToast('删除失败')
    } finally {
      deleteLoading.value = false
    }
  }
  return { deleteLoading, deleteConsultOrder }
}
//药品订单详情
export function useMedicineOrderDetail(id: string) {
  const item = ref<OrderDetailResponseType>()
  const initMedicineOrderDetail = async () => {
    const res = await getMedicalOrderDetail(id)
    item.value = res.data
  }
  initMedicineOrderDetail()
  return { item, initMedicineOrderDetail }
}
