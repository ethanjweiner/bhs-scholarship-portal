<template>
  <div
    id="overlay"
    :class="{'d-flex': display}"
    class="text-center d-none flex-column justify-content-center"
  >
    <div class="p-5 spinner-border text-danger mx-auto" role="status" aria-hidden="true">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading-Screen",
  props: ["display"]
};
</script>

<style>
#overlay {
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
}
</style>