<template>
  <canvas ref="canvas" class="landing"></canvas>
</template>

<script>
// import { TweenLite, Power3 } from "gsap";

export default {
  name: 'BottomCanvas',
  props: ['textDistance'],
  data() {
    return {
      canvas: null,
      context: null,

      // assets
      image: null
    }
  },
  beforeMount() {
    // loading assets
    this.image = new Image()
    this.image.src = require('@/assets/landing-bottom.jpg')
    this.image.addEventListener('load', () => this.$emit('loaded'))
  },
  mounted() {
    // loading canvas
    this.canvas = this.$refs.canvas
    this.context = this.canvas.getContext('2d')

    // fixing canvas size
    this.fixSize()
  },
  methods: {
    draw() {
      console.log('[bottom] draw')

      this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.context.save()

      // draw container
      this.context.beginPath()
      this.context.moveTo(0, 0)
      this.context.lineTo(window.innerWidth, 0)
      this.context.lineTo(window.innerWidth, window.innerHeight)
      this.context.lineTo(0, window.innerHeight)

      // draw image
      this.drawImage(this.image)

      // draw text
      this.drawText()

      this.context.restore()
    },

    drawText() {
      this.context.font = `bold ${0.1 * window.innerWidth}px Arial`
      this.context.fillStyle = '#fff'
      this.context.textAlign = 'center'
      this.context.textBaseline = 'middle'
      this.context.fillText(
        'EXPLORE',
        window.innerWidth / 2 + this.textDistance,
        window.innerHeight / 2
      )
    },

    drawImage(image) {
      console.log('[bottom] draw image')

      // scale to fill
      const scale = Math.max(
        window.innerWidth / this.image.width,
        window.innerHeight / this.image.height
      )
      const x = window.innerWidth / 2 - (this.image.width / 2) * scale
      const y = window.innerHeight / 2 - (this.image.height / 2) * scale

      this.context.drawImage(
        image,
        x,
        y,
        this.image.width * scale,
        this.image.height * scale
      )
    },

    fixSize() {
      // let dpi = window.devicePixelRatio;

      const style_height = +getComputedStyle(this.canvas)
        .getPropertyValue('height')
        .slice(0, -2)

      const style_width = +getComputedStyle(this.canvas)
        .getPropertyValue('width')
        .slice(0, -2)

      this.canvas.setAttribute('height', style_height)
      this.canvas.setAttribute('width', style_width)
    },

    handleResize() {
      this.fixSize()
      this.draw()
    }
  }
}
</script>
