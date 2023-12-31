import { defineStore } from 'pinia'
export const useContactsStore = defineStore('contacts', {
  state: () => {
    return {
      contacts: null,
      currentContact: null
    }
  },
  actions: {
    setUserPageContacts(data) {
      this.contacts = data
    }
  },
  getters: {
    userPageContacts: (state) => state.contacts
  }
})
