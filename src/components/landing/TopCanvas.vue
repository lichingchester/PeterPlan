<template>
  <canvas class="landing" ref="canvas" @click="onClick"></canvas>
</template>

<script>
import { TweenLite, Power3 } from "gsap";

export default {
  name: "TopCanvas",
  props: ["textDistance"],
  data() {
    return {
      canvas: null,
      context: null,

      position: {
        y1: window.innerHeight / 2 + 60,
        y2: window.innerHeight / 2 - 60
      },

      // assets
      image: null
    };
  },
  beforeMount() {
    // loading assets
    this.image = new Image();
    this.image.src = require("@/assets/landing-top.jpg");
    this.image.addEventListener("load", () => this.$emit("loaded"));
  },
  mounted() {
    // loading canvas
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext("2d");

    // fixing canvas size
    this.fixSize();
  },
  methods: {
    onClick() {
      console.log("[top] on click");
      if (this.loaded) {
        console.log("[top] start request");
        this.loop();

        // animate value
        TweenLite.to(this.position, 1.2, {
          y1: 0,
          y2: 0,
          ease: Power3.easeInOut
        });
      }
    },

    draw() {
      console.log("[top] draw", this.position.y1, this.position.y2);

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
      this.drawText();

      this.context.restore();
    },

    drawText() {
      this.context.font = `bold ${0.1 * window.innerWidth}px Arial`;
      this.context.fillStyle = "red";
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.fillText(
        "EXPLORE",
        window.innerWidth / 2 - this.textDistance,
        window.innerHeight / 2
      );
    },

    drawImage(image) {
      console.log("[top] draw image");

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
      // let dpi = window.devicePixelRatio;

      let style_height = +getComputedStyle(this.canvas)
        .getPropertyValue("height")
        .slice(0, -2);

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
      this.draw();
    }
  }
};
</script>
