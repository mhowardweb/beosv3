<template>
  <q-layout
    view="hHh Lpr lff"
    class="shadow-2 rounded-borders"
  >
    <q-header
      elevated
      class="bg-black"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
        />

        <q-toolbar-title>
          BEOS Rainfall Summary
        </q-toolbar-title>

        <div>v1.0.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      :width="200"
      :breakpoint="500"
      show-if-above
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list
          v-for="(menuItem, index) in menuList"
          :key="index"
        >
          <q-item
            clickable
            :to="menuItem.link"
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{menuItem.label}}
            </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';

export default {
  name: 'MyLayout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      menuList: [
        { icon: 'ion-rainy', label: 'Summary', link: '/' },
        { icon: 'history', label: 'History', link: 'history' },
        { icon: 'ion-reverse-camera', label: 'Snapshots', link: 'snapshots' },
      ],
    };
  },
  methods: {
    openURL,
  },
  created() {
    this.$store.dispatch('beosStore/loadDataAction');
  },
};
</script>

<style>
</style>
