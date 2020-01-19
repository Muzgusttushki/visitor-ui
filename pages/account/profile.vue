<template>
  <el-container class="account profile">
    <nav>
      <el-tabs v-model="activeTab">
        <!-- ОСНОВНОЕ-- -->
        <el-tab-pane label="Основное" name='main'>
          <el-main class="components-container" v-if="activeTab === 'main'">
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
                <el-row class="contacts"><span class="text-grey">Телефон:</span>+7 916 123 45 67</el-row>
                <el-row class="contacts"><span class="text-grey">Email:</span>test@gmail.com</el-row>
                <el-row class="contacts"><span class="text-grey">Статус:</span> активен</el-row>
              </div>
              <div class="component payment-info">
                <div class="component__title"><h2>Платежная информация</h2></div>
                <el-row class="info">
                  <span class="text-grey">Подписка действует до:</span>
                  <span class="date">12.11.2019</span>
                </el-row>
                <el-row class="info">
                  <span class="text-grey">Последний платеж:</span>
                  <span class="date">12.10.2019</span>
                </el-row>
                <el-row class="info">
                  <span class="text-grey">Следующий платеж:</span>
                  <span class="date">12.11.2019</span>
                </el-row>
              </div>
            </el-col>
            <el-col :span="17">
              <div class="component projects">
                <div class="component__title"><h2>Мои проекты</h2></div>
                <visitor-table 
                  :data="filteredProjects"
                  :monolite="true"
                  :labels="[{
                    prop: 'source',
                    label: 'Источник',
                    width: 300
                  },{
                    prop: 'status',
                    label: 'Статус',
                    width: 70
                  },{
                    prop: 'limit',
                    label: 'Активен до:',
                    width: 70
                  }]"> 
                  <template v-slot:default="{ cell }">
                    <span v-if="cell.key === 'status'">
                      <span v-if="cell.prop === true">
                        <span class="indicator active"></span>
                        <span>активен</span>
                      </span>
                      <span v-else>
                        <span class="indicator disable"></span>
                        <span>неактивен</span>
                      </span>
                    </span>
                    <span v-else>{{ cell.prop }}</span>
                  </template>
                </visitor-table>
              </div>
            </el-col>
          </el-main>
        </el-tab-pane>
        <!-- НАСТРОЙКИ -->
        <el-tab-pane label="Настройки" name="settings"></el-tab-pane>
        <!-- УПРАВЛЕНИЕ -->
        <el-tab-pane label="Управление" class="components-container" name="manage">
          <div class="search-field">
            <div class="search">
              <el-input v-model="inputSearch"></el-input>
              <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
            </div>
            <el-button type="info" @click="dialogVisible = true">Добавить пользователя</el-button>
          </div>
          <el-main class="company-list" v-if="activeTab === 'manage'">
            <div class="component-title"><h2>Список кампаний</h2></div>
            <visitor-table
              :data="tableData"
              :labels="tableLabels"
            >
              <template v-slot:default="{ cell }">
                <span v-if="cell.key === 'manage'">
                  <font-awesome-icon :icon="['fas', 'cog']" @click="handleEdit(cell.rowID)" class="fa-lg cog" />
                  <font-awesome-icon :icon="['fas', 'trash-alt']" @click="handleDelete(cell.rowID)" class="fa-lg trash" />
                </span>
                <span v-else>{{ cell.prop }}</span>
              </template>
            </visitor-table>
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
import VisitorTable from '@/components/visitor-components/visitor-table.vue';

export default {
  components: { VisitorTable },

  data() {
    return {
      activeTab: 'main',
      inputSearch: '',
      inputCompany: '',
      inputEmail: '',
      dialogVisible: false,
      tableLabels: [
        {label: 'Кампания', prop: 'company', width: 200},
        {label: 'Email', prop: 'email', width: 100},
        {label: 'Роль', prop: 'role', width: 30},
        {label: 'Проекты', prop: 'projects', width: 100},
        {label: 'Управление', prop: 'manage', width: 50}
      ],
      tableData: new Array(10).fill({
        company: 'Театр Пушкина. Спектакль “Апельсины и лимоны”',
        email: 'topconcerts@yandex.ru',
        role: '9',
        projects: 'https://topconcerts.ru/',
        manage: ''
      }),
      projects: {
        data: new Array(10).fill({
          source: 'topconcert.ru',
          status: true,
          limit: '12.12.2020'
        })
      }
    }
  },

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index) {
      console.log(index, 'index')
      this.tableData.splice(index, 1)
    }
  },

  computed: {
    filteredProjects() {
      return this.projects.data.map(item => {
        const { source, limit, status } = item;
        return { status, limit, source };
      })
    }
  }
}
</script>