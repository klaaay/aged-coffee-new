export type TraitKey = 'E' | 'N' | 'T' | 'J' | 'A'

export interface TraitScores {
  E: number
  N: number
  T: number
  J: number
  A: number
}

export interface MbtiRecord extends TraitScores {
  date: string
  label: string
}

export interface ResolvedMbtiType {
  type: string
  fourLetter: string
  identity: 'A' | 'T'
  typeName: string
}

const TYPE_NAMES: Record<string, string> = {
  INTJ: '建筑师',
  INTP: '逻辑学家',
  ENTJ: '指挥官',
  ENTP: '辩论家',
  INFJ: '提倡者',
  INFP: '调停者',
  ENFJ: '主人公',
  ENFP: '竞选者',
  ISTJ: '物流师',
  ISFJ: '守卫者',
  ESTJ: '总经理',
  ESFJ: '执行官',
  ISTP: '鉴赏家',
  ISFP: '探险家',
  ESTP: '企业家',
  ESFP: '表演者',
}

export const dimensionConfig = [
  {
    key: 'E' as const,
    positive: '外向',
    negative: '内向',
    color: '#4298b5',
  },
  {
    key: 'N' as const,
    positive: '直觉',
    negative: '实感',
    color: '#e4ae3a',
  },
  {
    key: 'T' as const,
    positive: '理性',
    negative: '情感',
    color: '#33a474',
  },
  {
    key: 'J' as const,
    positive: '计划',
    negative: '展望',
    color: '#88619a',
  },
  {
    key: 'A' as const,
    positive: '坚决',
    negative: '起伏',
    color: '#f25e62',
  },
]

function pickLetter(value: number, positive: string, negative: string): string {
  return value >= 50 ? positive : negative
}

export function resolveMbtiType(scores: TraitScores): ResolvedMbtiType {
  const fourLetter = [
    pickLetter(scores.E, 'E', 'I'),
    pickLetter(scores.N, 'N', 'S'),
    pickLetter(scores.T, 'T', 'F'),
    pickLetter(scores.J, 'J', 'P'),
  ].join('')

  const identity = pickLetter(scores.A, 'A', 'T') as 'A' | 'T'

  return {
    fourLetter,
    identity,
    type: `${fourLetter}-${identity}`,
    typeName: TYPE_NAMES[fourLetter] ?? fourLetter,
  }
}

export function resolveTraitDisplay(key: TraitKey, value: number) {
  const config = dimensionConfig.find((item) => item.key === key)
  if (!config) {
    return { label: key, value }
  }

  const isPositive = value >= 50
  return {
    label: isPositive ? config.positive : config.negative,
    value: isPositive ? value : 100 - value,
  }
}

export function enrichMbtiRecord(record: MbtiRecord) {
  const resolved = resolveMbtiType(record)
  return {
    ...record,
    ...resolved,
    traits: dimensionConfig.map(({ key }) => ({
      key,
      ...resolveTraitDisplay(key, record[key]),
    })),
  }
}
