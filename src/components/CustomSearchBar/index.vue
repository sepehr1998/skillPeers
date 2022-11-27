<template>
  <div>
    <base-input group class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Recipient's username"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
      />
      <div class="input-group-append">
        <base-dropdown>
          <base-button
            slot="title-container"
            type="primary"
            class="dropdown-toggle"
          >
            By Location
          </base-button>
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Separated link</a>
        </base-dropdown>
      </div>
    </base-input>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped></style>
