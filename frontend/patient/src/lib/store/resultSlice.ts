import { create } from 'zustand'

interface TestResult {
  id: string
  date: string
  type: string
  status: 'normal' | 'abnormal'
  content: string
  attachments?: string[]
}

export interface ResultState {
  results: TestResult[]
  selectedResult: TestResult | null
  setResults: (results: TestResult[]) => void
  setSelectedResult: (result: TestResult | null) => void
}

export const createResultSlice = (set: any) => ({
  results: [],
  selectedResult: null,
  setResults: (results: TestResult[]) => set({ results }),
  setSelectedResult: (result: TestResult | null) => set({ selectedResult: result }),
})

export const useResultStore = create<ResultState>()((set) => ({
  ...createResultSlice(set),
})) 