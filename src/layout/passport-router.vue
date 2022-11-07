<template>
  <div :class="`passport ${$route.meta.css || 'fixed'}`">
    <router-view></router-view>
    <svg
      class="back-canvas"
      viewBox="0 0 3128 2086">
      <defs>
        <rect
          id="path-1"
          x="0"
          y="0"
          width="3127.29"
          height="2085.01"></rect>
        <linearGradient
          x1="49.2044464%"
          y1="44.0098334%"
          x2="34.2484072%"
          y2="-68.9059254%"
          id="linearGradient-3">
          <stop
            stop-color="#000000"
            offset="0%"></stop>
          <stop
            stop-color="#FFFFFF"
            offset="100%"></stop>
        </linearGradient>
        <linearGradient
          x1="38.9674414%"
          y1="61.4542202%"
          x2="119.921736%"
          y2="-22.596726%"
          id="linearGradient-4">
          <stop
            stop-color="#000000"
            offset="0%"></stop>
          <stop
            stop-color="#FFFFFF"
            offset="100%"></stop>
        </linearGradient>
        <linearGradient
          x1="42.1336239%"
          y1="13.5776334%"
          x2="68.516435%"
          y2="135.734588%"
          id="linearGradient-5">
          <stop
            stop-color="#FFFFFF"
            offset="0%"></stop>
          <stop
            stop-color="#000000"
            offset="100%"></stop>
        </linearGradient>
      </defs>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd">
        <g
          id="Oval-+-Oval-+-Oval-Mask"
          transform="translate(0.040000, 0.760000)">
          <mask
            id="mask-2"
            fill="white">
            <use xlink:href="#path-1"></use>
          </mask>
          <use
            id="Mask"
            fill="#89d757"
            fill-rule="nonzero"
            xlink:href="#path-1"></use>
          <circle
            id="Oval"
            fill="url(#linearGradient-3)"
            fill-rule="nonzero"
            style="mix-blend-mode: soft-light;"
            mask="url(#mask-2)"
            cx="3780.37"
            cy="2776.82"
            r="1688.77"></circle>
          <circle
            id="Oval"
            fill="url(#linearGradient-4)"
            fill-rule="nonzero"
            style="mix-blend-mode: soft-light;"
            mask="url(#mask-2)"
            cx="-510.25"
            cy="2145.02"
            r="1268.79"></circle>
          <circle
            id="Oval"
            fill="url(#linearGradient-5)"
            fill-rule="nonzero"
            style="mix-blend-mode: soft-light;"
            mask="url(#mask-2)"
            cx="-90.27"
            cy="-816.93"
            r="1688.77"></circle>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'passport-router',
  methods: {}
}
</script>
