<template>
  <v-card>
    <v-card-title >
      <v-switch
      v-model="switch1"
      :label="`Bilet durumu`"
      @change="change()"
    ></v-switch>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Ara..."
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="tickets"
      :search="search"
    >
  <template slot="items" scope="props">
        <td>{{ props.item.ticket }}</td>
        <td >{{ props.item.content }}</td>
        <td  v-if="props.item.status == '0'"> Aktif </td>
        <td v-else-if="props.item.status == '1'"> İnceleniyor </td>
        <td v-else> Kapalı </td>
        <td class="text-xs-right">
    <v-btn color="error" v-if="props.item.status != '2'" @click="closeTicket(props.item.id)">Kapat</v-btn>
           <v-btn small @click="detay(props.item)" >Detay</v-btn>
        </td>
      </template>
      <v-alert v-slot:no-results :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>



<script>
import {mapGetters, mapActions} from "vuex";
  export default {
    created() {
      this.fetchTickets();
      console.log(this.tickets);
    },
      computed: {
            ...mapGetters({tickets: "tickets"}),
      },
      methods: {    
           ...mapActions({ fetchTickets: "fetchTickets" }),  
           change(e){
             if(this.switch1 == false){
               this.search = '2';
             } else {
               this.search = '';
             }
           },
              detay(item){
                this.$router.push(`/dashboard/ticket/${item.id}`);
        this.$store.dispatch('changeticket', item);       
         },
          closeTicket(ticketId) {
          let data = {
           "status": 2
          }
          let payload = {
              ticketData: data,
              ticketId: ticketId
              }
      this.$store.dispatch('updateTicket', payload).then(res=>{
        console.log("başarılı");
        console.log(res);
       // this.tickets = this.$store.getters.tickets;
       this.tickets.forEach(ticket => {
          if(ticket.id == ticketId){
            ticket.status = 2
          }
       });
      });  
                
          }
      },
      mounted: {
           loadedMessage() {
        return 'Vue Component Loaded';
     }
      },
    data () {
      return {
        search: '',
        switch1: true, 
        headers: [
          {
            text: 'Bilet Konu',
           // align: 'left',
            sortable: false,
            value: 'ticket'
          },
          { text: 'Bilet İçerik', value: 'content', sortable: false },
          { text: 'Bilet Durum', value: 'status'},
          { text: 'işlemler', value: 'islemler' },
        ]
      }
    }
  }
</script>