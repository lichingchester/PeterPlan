<template>
  <div class="canvas-container">
    <canvas class="landing" ref="landingTop" @click="onClick"></canvas>
    <canvas class="landing" ref="landingBottom" @click="onClick"></canvas>
  </div>
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
        y1: window.innerHeight / 2 + 60,
        y2: window.innerHeight / 2 - 60
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
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    // loading assets
    this.image = new Image();
    this.image.src = require("@/assets/image.jpg");
    this.image.addEventListener("load", () => (this.loaded = true));

    this.canvas = this.$refs.landingTop;
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

      // draw container
      this.context.beginPath();
      this.context.moveTo(0, 0);
      this.context.lineTo(window.innerWidth, 0);
      this.context.lineTo(window.innerWidth, this.position.y1);
      this.context.lineTo(0, this.position.y2);

      this.context.clip();

      // draw image
      this.drawImage(this.image);

      // draw text
      this.context.font = `bold ${0.1 * window.innerWidth}px Arial`;
      this.context.fillStyle = "red";
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.fillText(
        "EXPLORE",
        window.innerWidth / 2,
        window.innerHeight / 2
      );

      this.context.restore();
    },

    drawImage(image) {
      console.log("draw image");

      // scale to fill
      let scale = Math.max(
        window.innerWidth / this.image.width,
        window.innerHeight / this.image.height
      );
      let x = window.innerWidth / 2 - (this.image.width / 2) * scale;
      let y = window.innerHeight / 2 - (this.image.height / 2) * scale;

      this.context.drawImage(
        image,
        x,
        y,
        this.image.width * scale,
        this.image.height * scale
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
    },

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
