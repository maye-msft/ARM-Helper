<template>
  <div class="layout">
    <Layout style="height: 100%">
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">Visual ARM Template Editor</div>
          <div class="layout-nav">
            <!-- <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              Item 1
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>
              Item 4
            </MenuItem> -->
          </div>
        </Menu>
      </Header>
      <div class="demo-split">
        <Split v-model="split1">
          <div
            slot="left"
            class="demo-split-pane"
            style="padding: 0; overflow-y: scroll"
          >
            <vue-codeditor v-model="code" mode="json" theme="chaos" />
          </div>
          <div slot="right" class="demo-split-pane">
            <Tabs type="card" style="height: 100%; overflow-y: scroll">
              <TabPane label="Resources">
                <Resource
                  :resources="json.resources"
                  :parameters="parameters"
                  :variables="variables"
                ></Resource>
              </TabPane>
              <TabPane label="Parameters">
                <Parameter
                  :parameters="json.parameters"
                  :json="json"
                ></Parameter>
              </TabPane>
              <TabPane label="Variables">
                <Variable :variables="json.variables" :parameters="parameters" :json="json"></Variable>
              </TabPane>
              <TabPane label="Outputs">
                <Output :outputs="json.outputs" :json="json"                   
                :parameters="parameters"
                  :variables="variables"></Output>
              </TabPane>
            </Tabs>
          </div>
        </Split>
      </div>
    </Layout>
  </div>
</template>
<script>
import template from "./template_json";
import Resource from "./components/Resource";
import Parameter from "./components/Parameter";
import Variable from "./components/Variable";
import Output from "./components/Output";
export default {
  components: {
    Resource,
    Parameter,
    Variable,
    Output,
  },
  data() {
    return {
      split1: 0.5,
      code: template,
      json: JSON.parse(template),
    };
  },
  methods: {
    val2array(obj, vals, prefix) {
      const that = this;
      vals = vals || [];
      prefix = prefix || "";
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] != "object") {
          vals.push({ key: prefix + "/" + key, val: obj[key] });
        } else {
          that.val2array(obj[key], vals, key);
        }
      });
    },
  },
  computed: {
    parameters() {
      const array = [],
        json = this.json;
      if (json.parameters) {
        Object.keys(json.parameters).forEach((key) => {
          array.push({ key: key, expr: "parameters('" + key + "')" });
        });
      }
      return array;
    },
    variables() {
      const array = [],
        json = this.json;
      if (json.variables) {
        Object.keys(json.variables).forEach((key) => {
          array.push({ key: key, expr: "variables('" + key + "')" });
        });
      }
      return array;
    },
    resourcePropVals() {
      const vals = [];
      this.resources.forEach((resource) => {
        this.val2array(resource, vals);
      });
      return vals;
    },
  },
};
</script>
<style>
.demo-split {
  height: 100%;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
  height: 100%;
}

/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
.layout-logo {
  /* width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px; */
  color: white;
  font-size: 20px;
  float: left;
  position: relative;
  /* top: 15px; */
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>
