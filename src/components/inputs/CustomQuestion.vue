<template>
  <div class="custom-question form-group p-3 rounded bg-light border border-muted mt-3">
    <label :for="`question-${index}`">Custom Question #{{index+1}}</label>
    <div class="row">
      <div class="col-11">
        <textarea-autosize
          class="form-control"
          type="text"
          placeholder="Your custom question"
          :id="`question-${index}`"
          v-model="question.content"
          :class="{filled : question.content}"
        />
        <div class="form-inline mt-2">
          <label
            class="font-italic mr-3"
            :for="`maxCharacters${index}`"
          >Enter this field to set a character limit:</label>
          <input
            type="number"
            class="form-control"
            placeholder="# of characters"
            :id="`maxCharacters${index}`"
            v-model="question.maxCharacters"
            :class="{filled : question.maxCharacters}"
          />
        </div>
        <div class="col-md-6"></div>
      </div>
      <div class="col-1 remove text-center">
        <span
          class="material-icons"
          data-toggle="modal"
          :data-target="'#delete-modal-question-'+index"
        >delete_forever</span>
      </div>
    </div>
    <DeleteModal :index="index" type="question" @on-confirm="$emit('on-remove', {index})" />
  </div>
</template>

<script>
import DeleteModal from "@/components/modals/DeleteModal";

export default {
  props: ["question", "index"],
  components: { DeleteModal },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
.custom-question {
  .remove {
    cursor: pointer;
  }
}
</style>