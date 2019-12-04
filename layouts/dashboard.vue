<template>
  <el-container class="layouts dashboard">
    <!-- <div class="a-side left-menu background" /> -->
    <el-header class="main-header" height="80px">
      <div class="main-header__wrapper">
        <!-- -------------------------------LOGOTYPE------------------------------------------ -->
        <div class="logotype" />
        <!-- -------------------------------DATEPICKER----------------------------------------- -->
        <div :class="hideDatePicker()">
          <div class="change-source__format" style="display: none;">
            <span @click="editDateType('daterange')">Дни</span>
            <span @click="editDateType('monthrange')">Месяцы</span>
          </div>
          <el-date-picker
            v-if="dateType.show"
            v-model="globalTimeRange"
            :type="dateType.type"
            align="right"
            format="dd.MM.yyyy"
            range-separator="-"
            :unlink-panels="true"
            :default-value="defaultGlobalTimeRange"
            start-placeholder="Дата начала"
            end-placeholder="Дата окончания"
            :default-time="['00:00:00', '23:59:59']"
            @change="changeGlobalTimeRange"
          >
            <template slot="footer">123</template>
          </el-date-picker>
        </div>
        <!-- ---------------------------------------ПОИСК---------------------------------------- -->
        <div class="global-search">
          <el-input id="search-label"></el-input>
          <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
        </div>
        <!-- ---------------------------------------------УВЕДОМЛЕНИЯ---------------------------- -->
        <div class="user-notification">
          <el-dropdown>
            <span class="el-dropdown-link">
              <span class="new-notification"></span>
              <font-awesome-icon :icon="['fas', 'bell']" class="fa-2x notification" />
            </span>
            <el-dropdown-menu slot="dropdown" style="padding: 10px;">
              <el-dropdown-item style="padding: 5px; border-radius: 10px;">Новое действие +1</el-dropdown-item>
              <el-dropdown-item style="padding: 5px; border-radius: 10px;">Новое действие +2</el-dropdown-item>
              <el-dropdown-item style="padding: 5px; border-radius: 10px;">Новое действие +3</el-dropdown-item>
              <el-dropdown-item style="padding: 5px; border-radius: 10px;">Новое действие +4</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- ---------------------------------------------ПОЛЬЗОВАТЕЛЬ -->
        <div class="user-card">
          <el-dropdown>
            <div class="el-dropdown-link action">
              <div class="card-holder">
                <div class="icon">
                  <div v-if="false">
                    <img src alt width="50px" height="50px" />
                  </div>
                  <div v-else>
                    <font-awesome-icon :icon="['fas', 'user']" class="fa-2x" />
                  </div>
                </div>
                <div class="name" v-if="session.username">{{ session.username }}</div>
                <!-- {{ session.username }} -->
                <div class="name" v-else>N/A</div>
              </div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <nuxt-link to="/account/profile">
                <el-dropdown-item>Личный кабинет</el-dropdown-item>
              </nuxt-link>
              <el-dropdown-item>Настройки</el-dropdown-item>
              <el-dropdown-item>Мои компании</el-dropdown-item>
              <el-dropdown-item>Платежи</el-dropdown-item>
              <nuxt-link to="/account/logout">
                <el-dropdown-item>Выход</el-dropdown-item>
              </nuxt-link>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- --------------------------------------НАСТРОЙКИ--------------------------------------- -->
        <div class="settings-icon">
          <el-dropdown>
            <div>
              <font-awesome-icon :icon="['fas', 'cog']" class="fa-2x" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">Action 1</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus">Action 2</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus-outline">Action 3</el-dropdown-item>
              <el-dropdown-item icon="el-icon-check">Action 4</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check">Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-container class="main-container">
      <div class="left-menu-fixed"></div>
      <el-aside width="120" class="left-menu background">
        <ul class="navigation">
          <nuxt-link to="/dashboard/">
            <li>
              <font-awesome-icon :icon="['fas', 'th']" class="fa-2x" />
              <p>Дашборд</p>
            </li>
          </nuxt-link>
          <nuxt-link to="/payments">
            <li>
              <font-awesome-icon :icon="['fas', 'users']" class="fa-2x" />
              <p>Покупатели</p>
            </li>
          </nuxt-link>
          <nuxt-link to="/operations">
            <li>
              <font-awesome-icon :icon="['fas', 'credit-card']" class="fa-2x" />
              <p>Операции</p>
            </li>
          </nuxt-link>
          <nuxt-link to="/segments">
            <li>
              <font-awesome-icon :icon="['fas', 'draw-polygon']" class="fa-2x" />
              <p>Сегменты</p>
            </li>
          </nuxt-link>
        </ul>
      </el-aside>
      <el-container class="main-content-container">
        <nuxt />
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      dateType: { show: true, type: "daterange" },
      session: this.$store.getters["account/getSession"],
      globalTimeRange: Object.values(
        this.$store.getters["dashboard/globalFilters"].timeInterval
      ),
      defaultGlobalTimeRange: []
    };
  },
  computed: {
    getGlobalFilterTimeInterval() {
      return this.$store.getters["dashboard/globalFilters"].timeInterval;
    }
  },

  watch: {
    getGlobalFilterTimeInterval(source) {
      this.globalTimeRange = source ? Object.values(source) : [];
    }
  },

  methods: {
    editDateType(val) {
      this.dateType.type = val;
    },

    changeGlobalTimeRange(resolve) {
      console.log(resolve, "resolve");

      if (resolve == null || resolve.length !== 2) {
        const previewInstanceDate = new Date();
        previewInstanceDate.setDate(previewInstanceDate.getDate() - 64);

        resolve = [previewInstanceDate, new Date()];
      }

      this.$store.commit("dashboard/setGlobalFilters", {
        key: "timeInterval",
        value: {
          start: resolve[0],
          end: resolve[1]
        }
      });
    },
    hideDatePicker() {
      const path = this.$route.path;
      if (path.includes("segments")) {
        return "change-source hidden";
      }
      return "change-source";
    }
  }
};
</script>
<style scoped>
.hidden {
  transform: scale(0);
}
</style>