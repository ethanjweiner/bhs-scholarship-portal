<template>
  <tbody>
    <tr @click="$router.push({name: 'Application', params: { name: scholarship.name }})">
      <td class="font-italic font-weight-bold">{{ scholarship.name }}</td>
      <td>{{ scholarship.donor }}</td>
      <td>{{ scholarship.amount }}</td>
      <td class="text-success" :class="{ 'text-danger' : pastDeadline}">{{ scholarship.deadline }}</td>
      <td
        :class="{'text-info' : status === 'In progress',
        'text-success' : status === 'Submitted'}"
      >{{ status }}</td>
    </tr>
  </tbody>
</template>

<script>
import { db, auth } from "@/firebase/init";
export default {
  name: "ScholarshipRow",
  props: ["scholarship"],
  data() {
    return {
      status: null
    };
  },
  computed: {
    pastDeadline() {
      return (
        new Date().getTime() >=
        new Date(this.scholarship.deadline).getTime() + 86400000
      );
    }
  },
  async created() {
    const application = await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("applications")
      .doc(this.scholarship.name)
      .get();
    if (application.data()) {
      this.status = application.data().status;
    } else {
      this.status = "Not started";
    }
  }
};
</script>

<style>
</style>