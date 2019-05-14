<template>
  <canvas class="landing" ref="landing"></canvas>
</template>

<script>
export default {
  name: "Landing",
  data() {
    return {
      canvas: null,
      context: null,

      ratio: 60
    };
  },
  mounted() {
    let self = this;

    this.canvas = this.$refs.landing;
    this.context = this.canvas.getContext("2d");

    this.fixSize();

    this.context.beginPath();
    // this.context.fillStyle = "red";
    this.context.moveTo(0, 0);
    this.context.lineTo(window.innerWidth, 0);
    this.context.lineTo(window.innerWidth, window.innerHeight / 2 + 70);
    this.context.lineTo(0, window.innerHeight / 2 - 70);
    // this.context.fill();

    this.context.clip();

    let image = new Image();
    image.src = require("@/assets/image.jpg");
    image.addEventListener(
      "load",
      function() {
        self.context.drawImage(
          image,
          0,
          0,
          window.innerWidth,
          window.innerHeight
        );
      },
      false
    );
  },
  methods: {
    drawTopLayer() {},
    drawBottomLayer() {},
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
