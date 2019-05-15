<template>
  <canvas class="landing" ref="landing" @click="onClick"></canvas>
</template>

<script>
import { TweenLite, Power3 } from "gsap";

export default {
  name: "Landing",
  data() {
    return {
      canvas: null,
      context: null,

      position: {
        y1: window.innerHeight / 2 + 70,
        y2: window.innerHeight / 2 - 70
      },
      requestId: undefined,

      // assets
      image: null,
      loaded: false
    };
  },
  watch: {
    loaded(state) {
      if (state) {
        this.drawTopLayer();
      }
    }
  },
  mounted() {
    // loading assets
    this.image = new Image();
    this.image.src = require("@/assets/image.jpg");
    this.image.addEventListener("load", () => (this.loaded = true));

    this.canvas = this.$refs.landing;
    this.context = this.canvas.getContext("2d");

    this.fixSize();
  },
  methods: {
    loop() {
      if (this.position.y1 <= 0 && this.position.y2 <= 0) {
        window.cancelAnimationFrame(this.requestId);
        this.requestId = undefined;
        console.log("end request");
      } else {
        this.drawTopLayer();
        this.requestId = window.requestAnimationFrame(this.loop);
        // console.log("start request");
      }
    },

    onClick() {
      console.log("on click");
      if (this.loaded) {
        console.log("start request");
        this.loop();

        // animate value
        TweenLite.to(this.position, 1.2, {
          y1: 0,
          y2: 0,
          ease: Power3.easeInOut
        });
      }
    },

    drawTopLayer() {
      console.log(this.position.y1, this.position.y2);

      this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.context.save();
      this.context.beginPath();
      this.context.moveTo(0, 0);
      this.context.lineTo(window.innerWidth, 0);
      this.context.lineTo(window.innerWidth, this.position.y1);
      this.context.lineTo(0, this.position.y2);
      this.context.clip();

      this.drawImage(this.image);
      this.context.restore();
    },
    drawBottomLayer() {},

    drawImage(image) {
      console.log("draw image");
      this.context.drawImage(
        image,
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );
    },

    fixSize() {
      let dpi = window.devicePixelRatio;

      let style_height = +getComputedStyle(this.canvas)
        .getPropertyValue("height")
        .slice(0, -2);
      console.log(style_height, dpi);

      let style_width = +getComputedStyle(this.canvas)
        .getPropertyValue("width")
        .slice(0, -2);

      this.canvas.setAttribute("height", style_height);
      this.canvas.setAttribute("width", style_width);
      // this.canvas.setAttribute("height", style_height * dpi);
      // this.canvas.setAttribute("width", style_width * dpi);
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
