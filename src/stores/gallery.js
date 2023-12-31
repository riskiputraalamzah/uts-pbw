import { defineStore } from 'pinia'

export const useGalleryStore = defineStore('gallery', {
  state: () => {
    return {
      gallaries: null,
      currentGallaries: null
    }
  },
  actions: {
    setUserPageGallaries(data) {
      this.gallaries = data
    }
  },
  getters: {
    userPageGallaries: (state) => state.gallaries
  }
})
