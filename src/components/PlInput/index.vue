<template>
  <div class="form-group input-material">
    <input type="email" class="form-control" :id="id" />
    <label :for="id">{{ this.label }}</label>
  </div>

  <!-- <div class="m-2">
    <div class="inpt-field">
      <i v-if="icon" :class="icon" class="prefix"></i>
      <input type="inputType" :id="id" />
      <label :for="id">{{ this.label }}</label>
    </div>
  </div> -->
</template>
<script>
export default {
  name: "PlInput",
  props: {
    icon: {
      type: String,
    },
    inputType: {
      type: String,
      default: "text",
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.form-group.input-material {
  position: relative;
  margin-top: 50px;
  margin-bottom: 50px;
}
.form-group.input-material label {
  color: #b1bbc4;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 7px;
  transition: 0.1s ease all;
  -moz-transition: 0.1s ease all;
  -webkit-transition: 0.1s ease all;
}
.form-group.input-material .form-control {
  border: none;
  border-bottom: 2px solid #ced4da;
  border-radius: 0px;
  background: transparent;
  padding-left: 5px;
  box-shadow: none;
  /* active state */
  /* invalid state */
}
.form-group.input-material .form-control:focus,
.form-group.input-material .form-control[value]:not([value=""]) {
  border-bottom-color: #007bff;
  color: #000;
}
.form-group.input-material .form-control:focus ~ label,
.form-group.input-material .form-control[value]:not([value=""]) ~ label {
  top: -25px;
  font-size: 14px;
  color: #007bff;
  font-weight: 500;
}
.form-group.input-material .form-control:focus.invalid,
.form-group.input-material .form-control.invalid,
.form-group.input-material .form-control:focus.parsley-error,
.form-group.input-material .form-control[value]:not([value=""]).parsley-error {
  border-bottom-color: #dc3545;
}
.form-group.input-material .form-control:focus.invalid ~ label,
.form-group.input-material .form-control.invalid ~ label,
.form-group.input-material .form-control:focus.parsley-error ~ label,
.form-group.input-material
  .form-control[value]:not([value=""]).parsley-error
  ~ label {
  color: #dc3545;
}
.form-group.input-material .parsley-errors-list {
  color: #dc3545;
  list-style: none;
  font-size: 0.7em;
  padding-left: 5px;
}

/*# sourceMappingURL=input-material.css.map */
</style>
