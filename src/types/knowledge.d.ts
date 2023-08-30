import { KnowledgeType } from './consult'
export type Knowledge = {
  id: string
  title: string
  coverUrl: string[]
  topics: string[]
  collectionNumber: number
  commentNumber: number
  creatorName: string
  creatorAvatar: string
  creatorHospatalName: string
  likeFlag: 0 | 1
  content: string
  creatorDep: string
  creatorTitles: string
  creatorId: string
}

export type KnowledgeList = Knowledge[]

export type Knowledgepage = {
  pageTotal: number
  total: number
  rows: KnowledgeList
}

export type KnowledgeParams = {
  type: KnowledgeType
  current: number
  pageSize: number
}
