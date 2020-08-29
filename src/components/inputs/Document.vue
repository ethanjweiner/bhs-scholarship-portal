<template>
  <div class="document form-group">
    <label for="question">Document #{{index+1}}</label>
    <div class="row">
      <div class="col-11">
        <input
          class="form-control"
          type="text"
          placeholder="Name of document (be specific)"
          id="document"
          v-model="document.name"
          :class="{filled : document.name}"
        />
      </div>
      <div class="col-1 remove text-center">
        <span
          class="material-icons"
          data-toggle="modal"
          :data-target="'#delete-modal-document-'+index"
        >delete_forever</span>
      </div>
    </div>
    <DeleteModal :index="index" type="document" @on-confirm="$emit('on-remove', {index})" />
  </div>
</template>

<script>
import DeleteModal from "@/components/modals/DeleteModal";

export default {
  name: "Document",
  props: ["document", "index"],
  components: { DeleteModal }
};
</script>

<style lang="scss">
.document {
  .remove {
    cursor: pointer;
  }
}
</style>