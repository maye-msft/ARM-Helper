<template>
  <div>
    <Tree  v-if="!selectedParameter" :data="mydata" :render="renderContent"></Tree>
    <Card v-else-if="selectedParameter" style="width: 100%; padding: 10px">
      <p slot="title">
        {{ selectedParameterName }}
      </p>
      <Button
        type="primary"
        slot="extra"
        @click.prevent="
          () => {
            selectedParameter = null;
          }
        "
        >Done</Button
      >
      <Form :model="selectedParameter" :label-width="160">
        <ObjectForm :obj="selectedParameter"></ObjectForm>
      </Form>
    </Card>
  </div>
</template>
<script>
import ObjectForm from "./ObjectForm";
import util from "../util.js";
export default {
  name: "Parameter",
  props: ["parameters"],
  components: {
    ObjectForm,
  },
  methods: {
    buildTree() {
      const parameters = this.parameters;
      const data1 = [];
      Object.keys(parameters).forEach((parameterKey) => {
        const paramItem = parameters[parameterKey];
        data1.push({
          root: true,
          title: parameterKey,
          expand: false,
          children: util.objattr2node(paramItem),
          parameter: paramItem
        });
      });
      this.mydata = data1;
    },
    renderContent(h, { data }) {
      return util.renderContent(
        h,
        data,
        (data) => {
          this.selectedParameter = data.parameter;
          this.selectedParameterName = data.title;
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
      selectedParameter: null,
      selectedParameterName: null
    };
  },
};
</script>
