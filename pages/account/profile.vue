<template>
  <el-container class="account profile">
    <nav>
      <el-tabs>
        <!-- ------------------------------------ОСНОВНОЕ----------------------------------------------- -->
        <el-tab-pane label="Основное">
          <el-main class="components-container">
            <el-col :span="7">
              <div class="component main-info">
                <div class="component__title"><h2>Основная информация</h2></div>
                <div class="component__main main-info__company">
                  <img v-if="false" src=" " alt="" width="52px" height="52px" class="image">
                  <div v-else class="image"></div>
                  <el-row>
                    <div class="text-grey">Компания: </div>
                    <div>TOPconcerts.ru</div>
                  </el-row>
                </div>
                <el-row class="contacts"><span class="text-grey">Телефон: </span> +7 916 123 45 67</el-row>
                <el-row class="contacts"><span class="text-grey">Email: </span>test@gmail.com</el-row>
                <el-row class="contacts"><span class="text-grey">Статус: </span> активен</el-row>
              </div>
              <div class="component payment-info">
                <div class="component__title"><h2>Платежная информация</h2></div>
                <el-row class="info"><span class="text-grey">Подписка действует до: </span>12.11.2019</el-row>
                <el-row class="info"><span class="text-grey">Последний платеж: </span>12.10.2019</el-row>
                <el-row class="info"><span class="text-grey">Следующий платеж: </span>12.11.2019</el-row>
              </div>
            </el-col>
            <el-col :span="17">
              <div class="component projects">
                <div class="component__title"><h2>Мои проекты</h2></div>
                <el-table
                  :data="projects.data"
                >
                  <el-table-column
                    prop="source"
                    label="Источник"
                    min-width="300"
                  />
                  <el-table-column
                    prop="status"
                    label="Статус"
                    min-width=70
                  >
                    <template slot-scope="scope">
                      <div v-if="scope.row.status === 'true'">
                        <span class="indicator active"></span>
                        <span>{{ 'активен' }}</span>
                      </div>
                      <div v-else>
                        <span class="indicator disable"></span>
                        <span>{{ 'неактивен' }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="limit"
                    label="Активен до:"
                    min-width=70
                  />
                </el-table>
              </div>
            </el-col>
          </el-main>
        </el-tab-pane>
        <!-- ------------------------------------НАСТРОЙКИ--------------------------------------------- -->
        <el-tab-pane label="Настройки"></el-tab-pane>
        <!-- ------------------------------------УПРАВЛЕНИЕ-------------------------------------------- -->
        <el-tab-pane label="Управление" class="components-container">
          <div class="search-field">
            <div class="search">
              <el-input v-model="inputSearch"></el-input>
              <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
            </div>
            <el-button type="info" @click="dialogVisible = true">Добавить пользователя</el-button>
          </div>
          <el-main class="company-list">
            <div class="component-title"><h2>Список кампаний</h2></div>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                v-for="(item, key) in tableLabels"
                :key="key"
                :prop="item.source"
                :label="item.label"
                :min-width="item.width"
                >
                <template slot-scope="scope">
                  <div v-if="item.source === 'manage'" class="button-group">
                    <font-awesome-icon :icon="['fas', 'cog']" @click="handleEdit(scope.$index, scope.row)" class="fa-lg cog" />
                    <font-awesome-icon :icon="['fas', 'trash-alt']" @click="handleDelete(scope.$index, scope.row)" class="fa-lg trash" />
                  </div>
                  <span v-else style="margin-left: 10px">{{ scope.row[item.source] }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-tab-pane>
      </el-tabs>
    </nav>
    <el-dialog
      title="Добавление пользователя"
      :visible.sync="dialogVisible">
      <el-form>
        <div class="input-container">
          <div class="label">Компания</div>
          <el-input validate-event v-model="inputCompany"></el-input>
        </div>
        <div class="input-container">
          <div class="label">Email</div>
          <el-input v-model="inputEmail"></el-input>
        </div>
      </el-form>
      <div class="access-level">
        <div class="level-title">Уровень доступа</div>
        <el-steps :active="2" align-center process-status="wait">
          <el-step></el-step>
          <el-step></el-step>
          <el-step></el-step>
          <el-step></el-step>
          <el-step></el-step>
          <el-step></el-step>
          <el-step></el-step>
        </el-steps>
        <div class="access-level__info">
          <div class="indicator"></div>
          <div class="title">Просмотр и редактирование</div>
        </div>
      </div>
      <div class="add-source">
        <span class="title">Источник</span>
        <el-button>Добавить+</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" class="cancel">Отмена</el-button>
        <el-button type="primary" @click="dialogVisible = false" class="save">Сохранить</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  layout: 'dashboard',

  data() {
    return {
      inputSearch: '',
      inputCompany: '',
      inputEmail: '',
      dialogVisible: false,
      tableLabels: [
        {label: 'Кампания', source: 'company', width: 200},
        {label: 'Email', source: 'email', width: 100},
        {label: 'Роль', source: 'role', width: 30},
        {label: 'Проекты', source: 'projects', width: 100},
        {label: 'Управление', source: 'manage', width: 50}
      ],
      tableData: [{
        company: 'Театр Пушкина. Спектакль “Апельсины и лимоны”',
        email: 'topconcerts@yandex.ru',
        role: '9',
        projects: 'https://topconcerts.ru/',
        manage: ''
      },{
        company: 'Театр Пушкина. Спектакль “Апельсины и лимоны”',
        email: 'topconcerts@yandex.ru',
        role: '9',
        projects: 'https://topconcerts.ru/',
        manage: ''
      },{
        company: 'Театр Пушкина. Спектакль “Апельсины и лимоны”',
        email: 'topconcerts@yandex.ru',
        role: '9',
        projects: 'https://topconcerts.ru/',
        manage: ''
      },{
        company: 'Театр Пушкина. Спектакль “Апельсины и лимоны”',
        email: 'topconcerts@yandex.ru',
        role: '9',
        projects: 'https://topconcerts.ru/',
        manage: ''
      },{
        company: 'Театр Пушкина. Спектакль “Апельсины и лимоны”',
        email: 'topconcerts@yandex.ru',
        role: '9',
        projects: 'https://topconcerts.ru/',
        manage: ''
      }],
      projects: {
        data:
          [{
            source: 'topconcert.ru',
            status: 'true',
            limit: '12.12.2020'
          },
          {
            source: 'topconcert.ru',
            status: 'true',
            limit: '12.12.2020'
          },
          {
            source: 'topconcert.ru',
            status: 'true',
            limit: '12.12.2020'
          },
          {
            source: 'topconcert.ru',
            status: 'false',
            limit: '12.12.2020'
          },
          {
            source: 'topconcert.ru',
            status: 'true',
            limit: '12.12.2020'
          },
          {
            source: 'topconcert.ru',
            status: 'true',
            limit: '12.12.2020'
          },
          {
            source: 'topconcert.ru',
            status: 'true',
            limit: '12.12.2020'
          }]
      }
    }
  },

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1)
    }
  }
}
</script>