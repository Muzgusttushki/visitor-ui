<template>
  <div class="operations index filter-container">
    <div class="wrapper">
      <h3>Фильтры</h3>
      <div class="filter">
        <el-checkbox
          label="Отображать посещения"
          v-model="localFilters.sheets"
          class="checkbox-operation"
        ></el-checkbox>
        <div class="title">Событие ({{filters.events.length}})</div>
        <div class="container">
          <el-select
            v-model="localFilters.events"
            multiple
            collapse-tags
            placeholder="Все события"
            class="el-select__event"
          >
            <el-option
              v-for="(label, labelID) in filters.events"
              :key="labelID"
              :value="label.name"
            >{{label.name}} ({{label.quantity}})</el-option>
          </el-select>
        </div>
      </div>
      <div class="filter">
        <div class="title">Город ({{filters.cities.length}})</div>
        <div class="container">
          <el-select
            v-model="localFilters.cities"
            multiple
            collapse-tags
            placeholder="Все события"
          >
            <el-option
              v-for="(label, labelID) in filters.cities"
              :key="labelID"
              :value="label.name"
            >{{label.name}} ({{label.quantity}})</el-option>
          </el-select>
        </div>
      </div>
      <div class="filter">
        <div class="title">Браузер ({{filters.browsers.length}})</div>
        <div class="container">
          <el-select
            v-model="localFilters.browsers"
            multiple
            collapse-tags
            placeholder="Все события"
          >
            <el-option
              v-for="(label, labelID) in filters.browsers"
              :key="labelID"
              :value="label.name"
            >{{label.name}} ({{label.quantity}})</el-option>
          </el-select>
        </div>
      </div>
      <div class="filter">
        <div class="title">Источник ({{filters.sources.length}})</div>
        <div class="container">
          <el-select
            v-model="localFilters.sources"
            multiple
            collapse-tags
            placeholder="Все события"
          >
            <el-option
              v-for="(label, labelID) in filters.sources"
              :key="labelID"
              :value="label.name"
            >{{label.name}} ({{label.quantity}})</el-option>
          </el-select>
        </div>
      </div>
      <div class="filter">
        <div class="title">Статус ({{filters.statuses.length}})</div>
        <div class="container">
          <el-select
            v-model="localFilters.statuses"
            multiple
            collapse-tags
            placeholder="Все события"
          >
            <el-option
              v-for="(label, labelID) in filters.statuses"
              :key="labelID"
              :value="label.name"
            >{{translate[label.name]}} ({{label.quantity}})</el-option>
          </el-select>
        </div>
      </div>
      <div class="filter">
        <div class="title">Операционная система ({{filters.oses.length}})</div>
        <div class="container">
          <el-select
            v-model="localFilters.oses"
            multiple
            collapse-tags
            placeholder="Все события"
          >
            <el-option
              v-for="(label, labelID) in filters.oses"
              :key="labelID"
              :value="label.name"
            >{{label.name}} ({{label.quantity}})</el-option>
          </el-select>
        </div>
      </div>
      <div class="filter">
        <div class="title"></div>
        <div class="container">
          <el-button @click="changeFilters">Применить</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['localFilters', 'serverFilters'],
  methods: {
    changeFilters() {
      this.$emit('update:change-filters', '');
    }
  }
}
</script>