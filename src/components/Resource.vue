<template>
  <div>
    <Tree
      v-if="!selectedResource"
      :data="mydata"
      :render="renderContent"
    ></Tree>
    <Card v-else-if="selectedResource" style="width: 100%; padding: 10px">
      <p slot="title">
        {{ selectedResource.type }}
      </p>
      <Button
        type="primary"
        slot="extra"
        @click.prevent="
          () => {
            selectedResource = null;
          }
        "
        >Done</Button
      >
      <Form :model="selectedResource" :label-width="160">
        <ObjectForm
          :obj="selectedResource"
          :parameters="parameters"
          :variables="variables"
        ></ObjectForm>
      </Form>
    </Card>
  </div>
</template>
<script>
import ObjectForm from "./ObjectForm";
import util from "../util.js";
export default {
  name: "Resource",
  props: ["resources", "parameters", "variables"],
  components: {
    ObjectForm,
  },
  methods: {
    buildTree() {
      const resurces = this.resources;
      const data1 = [];
      resurces.forEach((resource) => {
        data1.push({
          root: true,
          title: resource.type,
          expand: false,
          resource: resource,
          children: util.objattr2node(resource),
        });
      });
      this.mydata = data1;
    },
    renderContent(h, { data }) {
      return util.renderContent(
        h,
        data,
        (data) => {
          this.selectedResource = data.resource;
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
    // const that = this;
    // function loadPropVals(obj, prefix) {
    //   prefix = prefix || "";
    //   Object.keys(obj).forEach((key) => {
    //     if (typeof obj[key] != "object") {
    //       that.propVals.push({ key: prefix + "/" + key, val: obj[key] });
    //     } else {
    //       loadPropVals(obj[key], prefix + "/" + key);
    //     }
    //   });
    // }
    // this.resources.forEach((resource) => {
    //   loadPropVals(resource, resource.type+"/"+resource.name);
    // });
  },
  data() {
    return {
      mydata: [],
      modal: false,
      selectedResource: null,
      // propVals: [],
    };
  },
  computed: {},
};
</script>
