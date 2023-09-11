import { getPrescriptionPic } from '@/services/consult'
import { showImagePreview } from 'vant'
//查看处方
export const useShowPrescription = () => {
  const showPrescription = async (id?: string) => {
    if (id) {
      const res = await getPrescriptionPic(id)
      showImagePreview([res.data.url])
    }
  }
  return { showPrescription }
}
