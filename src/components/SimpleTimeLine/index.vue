<template>
  <el-timeline class>
    <el-timeline-item
      v-for="itm in items"
      :key="itm.id"
      :timestamp="getFormatedDate(itm[startDateField]) + ' - ' + getFormatedDate(itm[endDateField])"
      placement="top"
    >{{itm[contentField]}}</el-timeline-item>
  </el-timeline>
</template>

<script>
export default {
  props: {
    items: Array,
    contentField: String,
    startDateField: String,
    endDateField: String
  },
  methods: {
    getFormatedDate(stringDate) {
      return stringDate.slice(0, 10);
    }
  }
};
</script>