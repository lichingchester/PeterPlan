<template>
  <div class="canvas-container">
    <BottomCanvas
      ref="bottom"
      :text-distance="textDistance"
      @loaded="onLoaded"
    />
    <TopCanvas ref="top" :text-distance="textDistance" @loaded="onLoaded" />
  </div>
</template>

<script>
import TopCanvas from './TopCanvas.vue'
import BottomCanvas from './BottomCanvas.vue'

export default {
  name: 'Landing',
  components: {
    TopCanvas,
    BottomCanvas
  },
  data() {
    return {
      requestId: undefined,
      canLoop: false,
      textDistance: 6,

      // assets
      isLoaded: 0
    }
  },
  watch: {
    isLoaded(state) {
      if (state === 2) {
        // all images loaded
        this.$refs.top.draw()
        this.$refs.bottom.draw()
      }
    }
  },
  created() {
    // start animation loop
    this.canLoop = true

    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    // end animation loop
    this.canLoop = false

    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    loop() {
      if (this.canLoop) {
        this.drawTopLayer()
        this.requestId = window.requestAnimationFrame(this.loop)
      } else {
        window.cancelAnimationFrame(this.requestId)
        this.requestId = undefined
        console.log('end request')
      }
    },

    onLoaded() {
      this.isLoaded++
    },

    handleResize() {
      this.$refs.top.handleResize()
      this.$refs.bottom.handleResize()
    }
  }
}
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
