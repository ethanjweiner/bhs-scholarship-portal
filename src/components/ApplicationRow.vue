<template>
  <tbody>
    <tr
      @click="$router.push({name: 'StudentApplication', params: { name: application.profile.name }})"
    >
      <td class="font-italic font-weight-bold">{{ application.profile.name }}</td>
      <td>{{ application.profile.email }}</td>
      <td>{{ application.profile.cellPhone }}</td>
      <td>{{ application.dateSubmitted | toDate }}</td>
    </tr>
  </tbody>
</template>

<script>
import { db, auth } from "@/firebase/init";
import moment from "moment";

export default {
  name: "ScholarshipRow",
  props: ["application"],
  filters: {
    toDate(date) {
      return moment(date.toDate()).format("MM-DD-YYYY");
    }
  }
};
</script>

<style>
</style>