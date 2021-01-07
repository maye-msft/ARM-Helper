<template>
  <Tree v-if="!selectedOutput" :data="mydata" :render="renderContent"></Tree>
  <Card v-else-if="selectedOutput" style="width: 100%; padding: 10px">
    <p slot="title">
      {{ selectedOutputName }}
    </p>
    <Button
      type="primary"
      slot="extra"
      @click.prevent="
        () => {
          selectedOutput = null;
        }
      "
      >Done</Button
    >
    <Form :model="selectedOutput" :label-width="160">
      <ObjectForm
        :obj="selectedOutput"
        :parameters="parameters"
        :variables="variables"
      ></ObjectForm>
    </Form>
  </Card>
</template>
<script>
import ObjectForm from "./ObjectForm";
import util from "../util.js";
export default {
  name: "Output",
  props: ["outputs", "parameters", "variables"],
  components: {
    ObjectForm,
  },
  methods: {
    buildTree() {
      const outputs = this.outputs;
      const data1 = [];
      Object.keys(outputs).forEach((outputKey) => {
        const outputItem = outputs[outputKey];
        data1.push({
          root: true,
          title: outputKey,
          expand: true,
          children: util.objattr2node(outputItem),
          output: outputItem,
        });
      });
      this.mydata = data1;
    },
    renderContent(h, { data }) {
      return util.renderContent(
        h,
        data,
        (data) => {
          this.selectedOutput = data.output;
          this.selectedOutputName = data.title;
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
      selectedOutput: null,
      selectedOutputName: null,
    };
  },
};
</script>
