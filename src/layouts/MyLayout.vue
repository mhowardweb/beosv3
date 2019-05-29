<template>
  <q-layout
    view="hHh lpR fFf"
    class="shadow-2 rounded-borders"
  >
    <q-header
      elevated
      class="bg-primary"
    >
      <q-toolbar>
        <q-toolbar-title>
          BEOS Dashboard
        </q-toolbar-title>

        <div>v1.1.0 alpha</div>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="(nav, index) in navs"
          :key="index"
          :icon="nav.icon"
          :label="nav.label"
          :to="nav.to"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      :breakpoint="747"
      :width="200"
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item
          v-for="(nav, index) in navs"
          :key="index"
          clickable
          class="text-grey-4"
          :to="nav.to"
          exact
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
          <q-separator />
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      navs: [
        { icon: 'ion-rainy', label: 'Summary', to: '/' },
        { icon: 'ion-wallet', label: 'My Account', to: 'myaccount' },
        { icon: 'history', label: 'History', to: 'history' },
        { icon: 'ion-reverse-camera', label: 'Snapshots', to: 'snapshots' },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}

.q-drawer {
  .q-router-link--exact-active {
    color: white !important;
    background-color: #2a5375;
  }
}
</style>
