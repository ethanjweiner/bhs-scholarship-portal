<template>
  <div class="document bg-light border border-muted rounded p-4">
    <h5>
      <span class="font-italic">Document #{{index+1}}:{{' '}}</span>
      <span class="font-weight-bold">{{ document.name }}</span>
    </h5>
    <a :href="documentSrc" target="_blank" class="font-italic text-primary">
      <span class="material-icons">get_app</span>
      Click here to download
    </a>
    <p
      class="font-italic mb-0 mt-1 text-danger"
      style="font-size: 13px;"
    >Certain document types might not show in the viewer, so you might have to download.</p>
    <iframe
      class="mt-3"
      :src="documentSrc"
      ref="iframe"
      allowfullscreen
      width="100%"
      height="800px"
    />
  </div>
</template>

<script>
import { storage } from "@/firebase/init";
export default {
  name: "Document",
  props: ["document", "index"],
  data() {
    return {
      documentSrc: null
    };
  },
  async created() {
    try {
      this.documentSrc = await storage.ref(this.document.path).getDownloadURL();
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss">
.document {
  a {
    &:hover {
      text-decoration: none;
    }
  }
}
</style>