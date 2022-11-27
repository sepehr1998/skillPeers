<template>
  <div class="card">
    <div class="card-header">
      <h5 class="h3 mb-0">Skills</h5>
    </div>

    <div class="card-body">
      <ul class="list-group list-group-flush list my--3">
        <li class="list-group-item px-0 py-1" v-for="itm in skills" :key="itm.skillId">
          <div class="row align-items-center">
            <div class="col">
              <div class="w-100 text-center">
                <span class="m-0 h5">
                  {{ itm.name }}
                  <small>({{itm.percent}}  years)</small>
                </span>
              </div>

              <base-progress
                :type="progressTypes[itm.skillId % progressTypes.length]"
                :maxValue="30"
                class="pt-0"
                :show-percentage="false"
                :value="itm.percent"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "SkillCard",
  props: {
    skills: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      progressTypes: ["warning", "success", "danger", "info"]
    };
  }
};
</script>
<style></style>
