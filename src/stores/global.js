import { defineStore } from 'pinia'
export const globalStore = defineStore('global', {
  state: () => {
    return {
      alert: {},
      loadingAction: false,
      isLogin: localStorage.getItem('isLogin') == 'true',
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  actions: {
    toggleLoadingAction() {
      this.loadingAction = !this.loadingAction

      document.body.classList.toggle('overflow-hidden')
    },
    myAlert(...params) {
      this.alert = {
        showing: params[0],
        status: params[1],
        judul: params[2],
        data: params[3]
      }
      setTimeout(() => {
        this.closeAlert()
      }, 3000)
    },
    closeAlert() {
      this.alert.showing = false
    },
    userLogin(data) {
      this.isLogin = true
      this.user = data
    },
    userLogout() {
      this.isLogin = false
      this.user = null
    }
  }
})
