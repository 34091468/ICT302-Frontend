<template>
  <div id='app'>
    <router-view/>
  </div>
</template>

<script>

</script>

<style lang='scss'>

// ==================================================
// FONTS(S)
// ==================================================

@font-face {
    font-family: "Poppins Medium";
    src: url("~@/assets/fonts/Poppins-Medium.ttf") format("truetype");
}

@font-face {
    font-family: "Alegreya Sans SC Medium";
    src: url("~@/assets/fonts/AlegreyaSansSC-Medium.ttf") format("truetype");
}

// ==================================================
// FONTS(S) - END
// ==================================================

html, body {
    background: $color-bg-primary;
    color: $font-color-primary;
    position: relative;
    font-family: $font-family-main !important;
    font-size: 15px !important;
    letter-spacing: 0.1rem;
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    border: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-user-select: none;  /* Chrome all / Safari all */
    -moz-user-select: none;     /* Firefox all */
    -ms-user-select: none;      /* IE 10+ */
    user-select: none;
}

body::-webkit-scrollbar {
    display: none;
}

#app {
    position: relative;
    display: block;
    width: 100%;
    min-height: 100vh;
    overflow: auto;
}

.base {
    position: relative;
    display: block;
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    border: 0;
    overflow: auto;
}

.header {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: $font-size-header;
    font-weight: 600;
    height: 35px;
}

.label {
    font-size: 0.8rem !important;
}

</style>
