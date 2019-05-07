<template>
  <div class="landing">
    <!-- mouse over point -->
    <div
      class="top-point"
      @mouseenter="active = 'top'"
      @mouseleave="active = null"
    ></div>
    <div
      class="bottom-point"
      @mouseenter="active = 'bottom'"
      @mouseleave="active = null"
    ></div>
    <!-- mouse over point -->

    <div class="top-landing" ref="toplanding"></div>
    <div class="bottom-landing" ref="bottomlanding"></div>
  </div>
</template>

<script>
import { TweenLite, Power3 } from "gsap";

export default {
  name: "Landing",
  data() {
    return {
      active: null
    };
  },
  watch: {
    active(state) {
      let height = null;

      switch (state) {
        case "top":
          height = "100%";
          break;
        case "bottom":
          height = 0;
          break;
        default:
          height = "50%";
          break;
      }

      TweenLite.to(this.$refs.toplanding, 1, {
        height: height,
        ease: Power3.easeOut
      });
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

.top-landing {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 50%;
  background: red;
  z-index: 1;
}

.bottom-landing {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: blue;
}

.top-point {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 50%;
  z-index: 2;
}

.bottom-point {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50%;
  z-index: 2;
}
</style>
