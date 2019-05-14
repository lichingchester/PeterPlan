<template>
  <div class="trailer">
    Explore
  </div>
</template>

<script>
export default {
  name: "Trailer"
};
</script>

<style lang="scss" scoped>
.trailer {
  position: absolute;
  top: 49%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 150px;
  font-weight: 900;
  z-index: $z-trailer;
  color: black;
}
</style>
