<template>
  <div class="landing" ref="landing"></div>
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
  created() {
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  mounted() {
    // initial
    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
      type = "canvas";
    }
    PIXI.utils.sayHello(type);

    // create pixi
    this.app = new PIXI.Application();
    this.app.renderer.autoResize = true;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);

    // render
    this.$refs.landing.appendChild(this.app.view);

    // graphics
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xff3300);
    graphics.moveTo(0, 0);
    graphics.lineTo(window.innerWidth, 0);
    graphics.lineTo(window.innerWidth, window.innerHeight / 2 + this.ratio);
    graphics.lineTo(0, window.innerHeight / 2 - this.ratio);
    graphics.endFill();

    this.app.stage.addChild(graphics);
  },
  methods: {
    resize() {
      // resize the app when window resize
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }
  }
};
</script>

<style lang="scss" scoped>
.landing {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: $z-landing;
}
</style>
