import { defineStore } from 'pinia'

let dispatchIsReady: (value: boolean) => void
const unresolvedPromise = new Promise<boolean>((resolve) => {
  dispatchIsReady = resolve
})

export const useNewCourierStore = defineStore('courier-store', () => {
  async function some() {
    await unresolvedPromise
    console.log('hello')
  }

  function resolvePromise() {
    dispatchIsReady(true)
  }

  return { some, resolvePromise }
})
