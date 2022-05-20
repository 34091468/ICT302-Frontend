<template>
  <div>
    <router-view/>
  </div>
</template>

<style lang='scss'>

// ==================================================
// VARIABLE(S)
// ==================================================

@import '@/assets/styling/base.scss';

// ==================================================
// VARIABLE(S) - END
// ==================================================


// ==================================================
// FONTS(S)
// ==================================================

@font-face {
    font-family: "Poppins-Medium";
    src: url("~@/assets/fonts/Poppins-Medium.ttf") format("truetype");
}

// ==================================================
// FONTS(S) - END
// ==================================================

html, body {
    background: $bg-color-primary;
    color: $font-color-primary;
    position: relative;
    font-family: 'Poppins-Medium' !important;
    font-size: 15px !important;
    letter-spacing: 0.1rem;
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    border: 0;
    overflow-x: hidden !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-user-select: none;  /* Chrome all / Safari all */
    -moz-user-select: none;     /* Firefox all */
    -ms-user-select: none;      /* IE 10+ */
    user-select: none;
}

</style>
