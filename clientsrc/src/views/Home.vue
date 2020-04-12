<template>
  <div>
    <div class="container-fluid">
      <h1>Kanban</h1>
      <h2>Where Ideas Start.</h2>
    </div>
    <div style="display:flex;justify-content:center;align-items:flex-end;">
      <img class="one" src="/images/kanban.jpg" alt="kanban" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {}
};
</script>

<style lang="scss" scoped>
h1 {
  color: #111;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 275px;
  font-weight: bold;
  letter-spacing: -1px;
  line-height: 1;
  text-align: center;
}

h2 {
  color: #111;
  font-family: "Open Sans", sans-serif;
  font-size: 30px;
  font-weight: 300;
  line-height: 32px;
  margin: 0 0 72px;
  text-align: center;
}

img.one {
  width: 1000px;
}
</style>