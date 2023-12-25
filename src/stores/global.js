import { defineStore } from 'pinia'
export const globalStore = defineStore('global', {
  state: () => {
    return {
      alert: {},
      loadingAction: false
    }
  },
  actions: {
    toggleLoadingAction() {
      this.loadingAction = !this.loadingAction
    },
    myAlert(result) {
      this.alert = result
      setTimeout(() => {
        this.closeAlert()
      }, 3000)
    },
    closeAlert() {
      this.alert.showing = false
    }
  }
})
