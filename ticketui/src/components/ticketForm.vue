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
       <h3>Yeni Ticket</h3>
<v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
      label="Ticket Konu"
      v-model="new_ticket"
      :rules="new_ticketRules"
      :counter="100"
      required
    ></v-text-field>
  <v-text-field
  textarea
      label="Ticket İçerik..."
      v-model="content"
      :rules="contentRules"
      :counter="500"
      required
    ></v-text-field>
        <input type="file" @change="onFileChange">
    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
      @click="addTicket()"
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
         <v-footer fixed>
    <v-spacer></v-spacer>
    Yeni Destek Bileti
  <v-btn fab dark large color="cyan" @click.stop="openModalTicket">
      <v-icon dark>edit</v-icon>
    </v-btn>
  </v-footer>
  </div>
</template>

<script>
 import { VueEditor } from 'vue2-editor'
 import VueStringFilter from "vue-string-filter";
export default {
components: {
  VueEditor
},

methods: {
    onFileChange(e){
      this.file=e.target.files[0];
    },

      openModalTicket() {
      this.openModal = true;
      this.content = "";
      this.$store.dispatch("clearError");
    },
    addTicket() {
        let formData = new FormData();
        formData.append('ticket', this.new_ticket);
        formData.append('content', this.content);
        formData.append('file', this.file);
        formData.append('status', 0);
        console.log(formData);
      this.$store.dispatch('addticket',formData).then(res=>{
        console.log("yeni ticket başarılı");
        this.openModal = !this.openModal;
      });
    },
},
data () {
  return {
      valid: false,
      file: {},
      content: "",
        new_ticket: "",
        new_TicketRules: [
        t => !!t || "Ticket konu alanı gereklidir",
        t =>
          (t && t.length <= 100) ||
          "Konu lanı en fazla 100 karakter olabilir",
        t => (t && t.length >= 3) || "Konu alanı en az 3 karakter olabilir"
      ],
      contentRules: [
        v => !!v || "Ticket içerik alanı gereklidir",
        v =>
          (v && v.length <= 500) ||
          "Ticket içerik alanı en fazla 500 karakter olabilir",
        v => (v && v.length >= 3) || "Ticket içerik alanı en az 3 karakter olabilir"
      ],
      openModal: false,

  }
  }}
  
</script>

<style>
footer {
  height: 80px !important;
  z-index: 0 !important;
}
</style>
