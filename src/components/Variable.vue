<template>
  <Tree v-if="!selectedVariable" :data="mydata" :render="renderContent"></Tree>
  <Card v-else-if="selectedVariable" style="width: 100%; padding: 10px">
    <p slot="title">
      Variables
    </p>
    <Button
      type="primary"
      slot="extra"
      @click.prevent="
        () => {
          selectedVariable = null;
        }
      "
      >Done</Button
    >
    <Form :model="selectedVariable" :label-width="160">
      <ObjectForm :obj="selectedVariable" :parameters="parameters"></ObjectForm>
    </Form>
  </Card>
</template>
<script>
import ObjectForm from "./ObjectForm";
import util from "../util.js";
export default {
  name: "Variable",
  props: ["variables", "parameters"],
  components: {
    ObjectForm,
  },
  methods: {
    buildTree() {
      const variables = this.variables;
      const data1 = [];
      Object.keys(variables).forEach((variableKey) => {
        const varItem = variables[variableKey];
        data1.push({
          title: variableKey,
          root: true,
          expand: true,
          children: util.objattr2node(varItem),
          variable: variables,
        });
      });
      this.mydata = data1;
    },

    renderContent(h, { data }) {
      return util.renderContent(
        h,
        data,
        (data) => {
          this.selectedVariable = data.variable;
          this.selectedVariableName = data.title;
          this.modal = true;
        },
        () => {
          this.modal = true;
        }
      );
    },
  },
  mounted: function () {
    this.$nextTick(function () {
      this.buildTree();
    });
  },
  data() {
    return {
      mydata: [],
      selectedVariable: null,
      selectedVariableName: null,
    };
  },
};
</script>
