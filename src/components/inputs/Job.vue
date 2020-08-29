<template>
  <div class="job">
    <h6 class="font-italic">Job #{{index+1}}:</h6>
    <div class="form-row">
      <div class="form-group col-12 col-lg-3">
        <textarea-autosize
          :disabled="donorView"
          :max-height="100"
          :class="{filled : job.employer && !donorView }"
          v-model="job.employer"
          type="text"
          class="form-control"
          placeholder="Employer"
        />
      </div>
      <div class="form-group col-12 col-lg-3">
        <textarea-autosize
          :disabled="donorView"
          :max-height="150"
          :class="{filled : job.position && !donorView }"
          type="text"
          class="form-control"
          placeholder="Position"
          v-model="job.position"
        />
      </div>
      <div class="form-group col-12 col-lg-3">
        <textarea-autosize
          :disabled="donorView"
          :max-height="150"
          :class="{filled : job.leadership && !donorView }"
          v-model="job.leadership"
          type="text"
          class="form-control"
          placeholder="Leadership"
        />
      </div>
      <div class="form-group col-12 col-lg-2">
        <textarea-autosize
          :disabled="donorView"
          :max-height="100"
          :class="{filled : job.dates && !donorView }"
          v-model="job.dates"
          type="text"
          class="form-control"
          placeholder="From-to"
        />
      </div>
      <div class="form-group col-12 col-lg-1 text-center remove">
        <span
          v-if="!donorView"
          class="material-icons"
          data-toggle="modal"
          :data-target="'#delete-modal-job-'+index"
        >delete_forever</span>
      </div>
    </div>
    <DeleteModal :index="index" type="job" @on-confirm="$emit('on-remove', {index})" />
  </div>
</template>

<script>
import DeleteModal from "@/components/modals/DeleteModal";

export default {
  name: "Job",
  components: { DeleteModal },
  props: ["job", "index", "donorView"]
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
.job {
  .remove {
    cursor: pointer;
  }
}
</style>