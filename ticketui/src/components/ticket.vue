<template>
<v-card>
<v-container>
            <v-layout row>
                  <v-flex xs12>
            <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{currentTicket.ticket}}</div>
                  <span>{{currentTicket.content}}</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <span flat dark>{{currentUser}}</span>
              </v-card-actions>
            </v-card>
          </v-flex>
            </v-layout>
             <v-card color="blue-grey darken-2" class="white--text">
           <v-list three-line>
          <template v-for="(item, index) in messages">

            <v-list-tile
              :key="index"
            >

              <v-list-tile-content>
                <v-list-tile-title v-html="item.message"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.author"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
            </v-card>
        </v-container>
        <messageform></messageform>
      </v-card>
</template>
<script>
import {mapGetters} from "vuex";
import messageform from "@/components/messageform";
export default {
    components: {
        messageform,
    },
    data(){
        return {
             middleItems: [
        {
          icon: "dashboard",
          title: "Dashboard",
          link: "/dashboard"
        },
        {
          icon: "event",
          title: "Events",
          link: ""
        },
        {
          icon: "comment",
          title: "Notifications",
          link: ""
        }
      ]
        }
    },
    created() {
      this.loadMessages();
    },
    methods: {
      loadMessages(){
        let ticketId = this.$store.getters.currentticket.id
        this.$store.dispatch('fetchMessages', ticketId);
      }
    },
    computed: {
        ...mapGetters({currentTicket: "currentticket", currentUser: "user", messages: "messages" }),
    }
}
</script>


<style>

</style>
