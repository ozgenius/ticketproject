<template>
<div>
    <v-dialog v-model="openModal" max-width="570px">
      <v-layout row v-if="error">
      <v-flex>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
        <v-card>
<v-card-text>
       <h3>Yeni Mesaj</h3>
<v-form v-model="valid" ref="form" lazy-validation>
  <v-text-field
  textarea
      label="Mesajınız..."
      v-model="content"
      :rules="contentRules"
      :counter="250"
      required
    ></v-text-field>
    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
      @click="addMessage"
      :disabled="!valid"
    >
      Kaydet
    </v-btn>
    <v-btn @click.stop="openModal = !openModal">İptal</v-btn>
</v-card-actions>
  </v-form>
    </v-card-text>
        </v-card>
      </v-dialog>

  <v-footer fixed v-if="currentTicket.status != 2">
    <v-spacer></v-spacer>
    Mesaj yaz....
  <v-btn fab dark large color="cyan" @click.stop="openModalMessage">
      <v-icon dark>edit</v-icon>
    </v-btn>
  </v-footer>
  </div>
</template>

<script>
 import { VueEditor } from 'vue2-editor'
 import VueStringFilter from "vue-string-filter";
 import {mapGetters} from "vuex";
export default {
components: {
  VueEditor
},
computed: {
        ...mapGetters({currentTicket: "currentticket"}),
    },
methods: {
      openModalMessage() {
      this.openModal = true;
      this.content = "";
      this.$store.dispatch("clearError");
    },
    addMessage() {
      let ticketId = this.$store.getters.currentticket.id
      let data = {
        "message": this.content,
        "author": this.$store.getters.user,
      }
      let payload = {
        messageData: data,
        ticketId: ticketId

      }
      this.$store.dispatch('addNewMessage', payload).then(res=>{
        this.updateTicketStatus(ticketId);
        this.openModal = !this.openModal;
      });
    },
    updateTicketStatus(ticketId){
         let data = {
           "status": 1
          }
          let payload = {
              ticketData: data,
              ticketId: ticketId
              }
      this.$store.dispatch('updateTicket', payload);
    },
},
data () {
  return {
      valid: false,
      content: "",
      contentRules: [
        v => !!v || "Mesaj alanı gereklidir",
        v =>
          (v && v.length <= 250) ||
          "Mesajınız en fazla 250 karakter olabilir",
        v => (v && v.length >= 3) || "Kanal adı alanı en az 3 karakter olabilir"
      ],
      openModal: false,

  }
}

}
</script>

<style>
footer {
  height: 80px !important;
  z-index: 0 !important;
}
</style>
