<template>
  <div class="canvas-container">
    <canvas class="landing" ref="landingTop" @click="onClick"></canvas>
    <canvas class="landing" ref="landingBottom" @click="onClick"></canvas>
  </div>
</template>

<script>
import drawTop from "./drawTop";

export default {
  name: "Landing",
  mixins: [drawTop],
  data() {
    return {
      requestId: undefined,

      // assets
      images: [],
      loaded: 0
    };
  },
  watch: {
    loaded(state) {
      if (state === this.images.length) {
        // all images loaded
        this.drawTopLayer();
      }
    }
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.position.y1 = window.innerHeight / 2 + 60;
      this.position.y2 = window.innerHeight / 2 - 60;
      this.fixSize();
      this.drawTopLayer();
    }
  }
};
</script>

<style lang="scss" scoped>
.landing {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: $z-landing;
}
</style>
