<template>
  <div class="">
    <label class="fsLabel fsRequiredLabel">
      {{ label }}
      <span v-if="required" class="fsRequiredMarker">*</span>
    </label>

    <select
      v-model="selectedDepartmentId"
      @change="detectSelection"
      :class="selectClass"
    >
      <option :value="null"></option>
      <option
        v-for="{ id, fields: department } in departments.data"
        :value="id"
        :key="id"
      >
        {{ department.Name }}
      </option>
    </select>
  </div>
</template>

<script>
import { departments, staffMemberOfDepartment } from "../lib";

// formstack uses react, this function is now required to have react see the changes to the input's value
function changeValue(input, value) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window[input.constructor.name].prototype,
    "value"
  ).set;

  nativeInputValueSetter.call(input, value);

  const inputEvent = new Event("input", {
    bubbles: true,
  });

  input.dispatchEvent(inputEvent);
}

export default {
  props: {
    label: {
      type: String,
      default: "Department",
    },
    required: {
      type: Boolean,
      default: true,
    },
    selectClass: {
      type: String,
      default: "form-control iMPvJX  fsFieldSelect",
    },
    departmentInputId: {
      type: String,
    },
    prsEmailInputId: {
      type: String,
    },
    mrsEmailInputId: {
      type: String,
    },
  },

  setup() {
    return { departments };
  },

  data: () => ({
    selectedDepartmentId: null,
  }),

  computed: {
    selectedDepartment() {
      return departments.data.find((x) => x.id == this.selectedDepartmentId);
    },
  },

  methods: {
    detectSelection() {
      if (this.departmentInputId) {
        changeValue(
          document.getElementById(this.departmentInputId),
          this.selectedDepartment?.fields?.Name || null
        );
      }
      if (this.prsEmailInputId) {
        changeValue(
          document.getElementById(this.prsEmailInputId),
          staffMemberOfDepartment(this.selectedDepartmentId, "PRS")?.fields
            ?.Email || null
        );
      }
      if (this.mrsEmailInputId) {
        changeValue(
          document.getElementById(this.mrsEmailInputId),
          staffMemberOfDepartment(this.selectedDepartmentId, "MRS")?.fields
            ?.Email || null
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
