<template>
  <canvas class="landing" ref="landing"></canvas>
</template>

<script>
// import { TweenLite, Power3 } from "gsap";
import * as PIXI from "pixi.js";

export default {
  name: "Landing",
  data() {
    return {
      app: null,

      ratio: 60
    };
  },
  mounted() {
    var canvas = this.$refs.landing;
    var context = canvas.getContext("2d");

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(window.innerWidth, 0);
    context.lineTo(window.innerWidth, window.innerHeight / 2 + 70);
    context.lineTo(0, window.innerHeight / 2 - 70);
    context.lineTo(0, 0);
    context.fillStyle = "red";
    // context.fill();
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
