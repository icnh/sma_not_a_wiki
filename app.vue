<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');

html,
body {
  margin: 0;
  padding: 0;
}

html {
  font-family: "Space Grotesk", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  font-size: 17px;
  line-height: 24px;
}

h1 {
  font-size: 32px;
  font-weight: 600;
  margin: 1em 0 0.5em 0;
  line-height: 36px;
}

a {
  color: coral;
  font-weight: 600;
}

.btn {
  background-color: coral;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  border: none;
  line-height: 150%;
  text-align: center;
}

.btn.btn-secondary {
  background-color: transparent;
  color: coral;
  border: 1px solid coral;
}

:hover.btn {
  background-color: color-mix(in srgb, coral 90%, black);
}

:hover.btn.btn-secondary {
  background-color: color-mix(in srgb, coral 5%, white);
}

:active.btn {
  background-color: color-mix(in srgb, coral 80%, black);
  padding-top: 7px;
  padding-bottom: 5px;
}

:active.btn.btn-secondary {
  background-color: color-mix(in srgb, coral 15%, white);
}
</style>