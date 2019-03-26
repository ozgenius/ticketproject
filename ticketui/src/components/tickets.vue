<template>
<v-card>
<v-container>
            <v-layout row>
                <v-flex xs12>
                    <v-card>
                        <v-list three-line>
           <template v-for="(item) in dtickets">
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-avatar>
               <img src="@/assets/indir.png" @click="fileDownload(item.file)"/>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.ticket"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.content"></v-list-tile-sub-title>
              </v-list-tile-content>
              <br>
               <v-list-tile-action>
              <v-btn small @click="detay(item)" :to="`ticket/${item.id}`">Detay</v-btn>
            </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
        </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <ticketForm></ticketForm>
      </v-card>
</template>
<script>

import { mapActions, mapGetters} from "vuex";
import ticketForm from "@/components/ticketForm";
export default {
    props: ["status"],
    data() {
       return {
           dtickets: [],
           allTickets: [],
           activeTickets: [],
           contTickets: [],
           passiveTickets: [],
              }
    },
    components: {
      ticketForm,
    },
    created() {
    this.fetchTickets();
    this.tickets.forEach(ticket => {
         if(this.status == "all"){
                this.allTickets.push(ticket);
        } 
        else if(this.status == "active" & ticket.status == 0){
                this.activeTickets.push(ticket);
        } else if(this.status == "cont" & ticket.status == 1) {
                this.contTickets.push(ticket);
        }else if(this.status == "passive" & ticket.status == 2) {
                this.passiveTickets.push(ticket);
        }
    });
   // this.dtickets=this.activeTickets;
    console.log(this.allTickets);
    console.log(this.status);
    if(this.status == "all"){
      this.dtickets = this.allTickets;
    } else if(this.status == "active"){
       this.dtickets = this.activeTickets;
    }
    else if(this.status == "cont"){
       this.dtickets = this.contTickets;
    }
    else if(this.status == "passive"){
       this.dtickets = this.passiveTickets;
    }
     
  },
  methods: {
      ...mapActions({ fetchTickets: "fetchTickets" }),
      fileDownload(filename){
         this.$store.dispatch('downloadFile', filename);
           console.log(filename);
      },
      detay(item){
        this.$store.dispatch('changeticket', item);
        
      }
  },
   computed: {
    ...mapGetters({ tickets: "tickets"}),
    error() {
      return this.$store.getters.error;
    }
  }
};
</script>

<style>

</style>
