<template>
    <v-app>
        <v-navigation-drawer v-if="user"
                width="250"
                class="blue-grey darken-4"
                dark
                persistent
                :mini-variant="miniVariant"
                v-model="drawer"
                fixed
                app
        >
            <v-toolbar flat class="transparent" dense>
                <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                    <v-list-tile>
                        <v-list-tile-content v-if="!miniVariant">
                            <v-list-tile-title>
                                <h2 v-text="appName"></h2>
                            </v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon @click.stop="miniVariant = !miniVariant">
                                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-divider></v-divider>

            <v-list subheader :class="{'list-border-bottom' : miniVariant}">
                <v-subheader>Destek Biletleri</v-subheader>
              <template v-if="user === 'musteri'">
                    <v-tooltip  right :disabled = "!miniVariant">
                        <v-list-tile 
                                :to="'/dashboard/alltickets'"
                                exact
                                slot="activator"
                        >
                           <v-list-tile-action>
                                <v-icon>lists</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Tüm Biletler</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <span>Tüm Biletler</span>
                    </v-tooltip>
                </template>
                <template v-if="user === 'admin'">
                    <v-tooltip  right :disabled = "!miniVariant">
                        <v-list-tile 
                                :to="'/dashboard/admin/alltickets'"
                                exact
                                slot="activator"
                        >
                           <v-list-tile-action>
                                <v-icon>lists</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Tüm Biletler</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <span>Tüm Biletler</span>
                    </v-tooltip>
                </template>
            </v-list>
            <v-divider></v-divider>

         
        </v-navigation-drawer>

        <v-toolbar
                app
                flat
                dense
                color="primary"
                dark
        >
           <v-toolbar-side-icon
                   @click.stop="drawer = !drawer"
                    class="hidden-lg-and-up"
                    :class="searching ? 'hidden-xs-only' : ''"
             />
            <v-spacer></v-spacer>



            <v-menu>
                <v-btn icon slot="activator">
                    <v-avatar class="white" size="32">
                        <v-icon color="primary">person</v-icon>
                    </v-avatar>
                </v-btn>
                <v-list class="pa-0" light>

                    <v-list-tile key="profile" @click="login('admin')">
                        <v-list-tile-action>
                            <v-icon>person</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Yonetici</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                     <v-list-tile key="profile" @click="login('musteri')">
                        <v-list-tile-action>
                            <v-icon>person</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Musteri</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>

        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
import { mapGetters } from "vuex";
    export default {
        name: 'VuebaseLayout',
        computed: {
          ...mapGetters({user:"user"})
        },
        data() {
            return {
                appName: process.env.VUE_APP_APP_NAME,
                drawer: true,
                fixed: false,
                miniVariant: false,
                right: true,
                rightDrawer: false,
                tabs: null,
            }
        },

        methods: {
            login(user){
                this.$store.dispatch('setUser', user);
                console.log(user)
            }
        }
    }
</script>

<style scoped lang="stylus">
    @import '../../node_modules/vuetify/src/stylus/settings/_variables.styl';

    .bottom-menu {
        position: absolute;
        width: 100%;
        bottom: 0;
    }

    .searching {
        overflow: hidden;
        width: 208px;
        padding-left: 8px;
        transition: $primary-transition;
    }

    .searching--closed {
        padding-left: 0;
        width: 0;
    }

    .searching > * {
        right: 8px;
    }

    .searching--closed > * {
        display: none;
    }

    .hidden-searching {
        @media $display-breakpoints.sm-and-down {
            display: none !important;
        }
    }

    .list-border-bottom {
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }
</style>
