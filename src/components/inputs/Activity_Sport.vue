<template>
  <div class="activity-sport">
    <h6 class="font-italic">Activity/Sport #{{index+1}}:</h6>
    <div class="form-row">
      <div class="form-group col-12 col-lg-3">
        <textarea-autosize
          v-model="activity.name"
          :class="{filled : activity.name && !donorView}"
          :disabled="donorView"
          type="text"
          class="form-control"
          placeholder="Activity/sport"
          :max-height="100"
        />
      </div>
      <div class="form-group col-12 col-lg-3">
        <textarea-autosize
          type="text"
          class="form-control"
          placeholder="Honors/prizes"
          :disabled="donorView"
          v-model="activity.honors"
          :class="{filled : activity.honors && !donorView}"
          :max-height="150"
        />
      </div>
      <div class="form-group col-12 col-lg-3">
        <textarea-autosize
          v-model="activity.leadership"
          type="text"
          class="form-control"
          :disabled="donorView"
          placeholder="Leadership"
          :class="{filled : activity.leadership && !donorView}"
          :max-height="150"
        />
      </div>
      <div class="form-group col-12 col-lg-2">
        <textarea-autosize
          :class="{filled : activity.grades && !donorView}"
          v-model="activity.grades"
          type="text"
          class="form-control"
          :disabled="donorView"
          placeholder="Grade(s)"
          :max-height="75"
        />
      </div>
      <div class="form-group col-12 col-lg-1 text-center remove">
        <span
          v-if="!donorView"
          class="material-icons"
          data-toggle="modal"
          :data-target="'#delete-modal-activity-'+index"
        >delete_forever</span>
      </div>
    </div>
    <DeleteModal :index="index" type="activity" @on-confirm="$emit('on-remove', {index})" />
  </div>
</template>

<script>
import DeleteModal from "@/components/modals/DeleteModal";
export default {
  name: "Activity_Sport",
  props: ["activity", "index", "donorView"],
  components: { DeleteModal }
};
</script>

<style lang="scss">
.activity-sport {
  .remove {
    cursor: pointer;
  }
}
</style>