1<template>
  <div>
    <div v-for="(key, idx) in Object.keys(obj)" :key="'a-' + idx">
      <FormItem v-if="typeof obj[key] != 'object'" :label="key">
        <Input v-model="obj[key]" placeholder="" />

        <Dropdown
          v-if="parameters"
          style="padding-right: 15px"
          on-click="selParam"
        >
          <a href="javascript:void(0)">
            Parameters
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list" on-click="selParam">
            <DropdownItem
              on-click="selParam"
              v-for="(param, idx2) in parameters"
              :key="idx2"
            >
              <a
                href="javascript:void(0)"
                @click="selParam(obj, key, param.expr)"
              >
                [{{ param.expr }}]
              </a>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown
          v-if="variables"
          style="padding-right: 15px"
          on-click="selParam"
        >
          <a href="javascript:void(0)">
            Variables
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list" on-click="selParam">
            <DropdownItem
              on-click="selParam"
              v-for="(variable, idx2) in variables"
              :key="idx2"
            >
              <a
                href="javascript:void(0)"
                @click="selVar(obj, key, variable.expr)"
              >
                [{{ variable.expr }}]
              </a>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <a href="javascript:void(0)" @click="resetVal(obj, key)"> Reset </a>
      </FormItem>
    </div>
    <div
      v-for="(key, idx) in Object.keys(obj)"
      :key="'b-' + idx"
      style="padding-bottom: 10px"
    >
      <template v-if="typeof obj[key] == 'object'" :label="key">
        <Card style="width: 100%">
          <p slot="title">
            {{ key }}
          </p>
          <ObjectForm2
            :obj="obj[key]"
            :parameters="parameters"
            :variables="variables"
            :propVals="propVals"
          />
        </Card>
      </template>
    </div>
  </div>
  <!-- <FormItem label="type">
            <Input v-model="resource.type" placeholder=""/>
        </FormItem>
        <FormItem label="apiVersion">
            <Input v-model="resource.apiVersion" placeholder=""/>
        </FormItem>
        <FormItem label="name">
            <Input v-model="resource.name" placeholder=""/>
        </FormItem>
        <FormItem label="comments">
            <Input v-model="resource.comments" placeholder=""/>
        </FormItem>
        <FormItem label="location">
            <Input v-model="resource.location" placeholder=""/>
        </FormItem>
        <FormItem label="dependsOn">
            <Input v-model="resource.dependsOn" placeholder=""/>
        </FormItem>
        <FormItem label="tags">
            <Input v-model="resource.tags" placeholder=""/>
        </FormItem>
        <FormItem label="sku">
            <Input v-model="resource.sku" placeholder=""/>
        </FormItem>
        <FormItem label="kind">
            <Input v-model="resource.kind" placeholder=""/>
        </FormItem>
        <FormItem label="copy">
            <Input v-model="resource.copy" placeholder=""/>
        </FormItem>
        <FormItem label="plan">
            <Input v-model="resource.plan" placeholder=""/>
        </FormItem>
        <FormItem label="copy">
            <Input v-model="resource.copy" placeholder=""/>
        </FormItem>
        <FormItem label="properties">
            <Input v-model="resource.properties" placeholder=""/>
        </FormItem>
        <FormItem label="resources">
            <Input v-model="resource.resources" placeholder=""/>
        </FormItem> -->
</template>
<script>
import ObjectForm2 from "./ObjectForm2";
export default {
  components: {
    ObjectForm2,
  },
  props: ["obj", "parameters", "variables", "propVals"],
  data() {
    return {
      optiondata: [],
      alloptiondata: [],
      backupobj: null,
    };
  },
  mounted() {
    this.backupobj = JSON.parse(JSON.stringify(this.obj));
    this.optiondata = [];
    // this.propVals.forEach((item) => {
    //   if (this.optiondata.indexOf(item.val) == -1) {
    //     this.optiondata.push(item.val);
    //     this.alloptiondata.push(item.val);
    //   }
    // });
    this.parameters.forEach((item) => {
      if (this.optiondata.indexOf(item.expr) == -1) {
        this.optiondata.push(item.expr);
        this.alloptiondata.push(item.expr);
      }
    });
    this.variables.forEach((item) => {
      if (this.optiondata.indexOf(item.expr) == -1) {
        this.optiondata.push(item.expr);
        this.alloptiondata.push(item.expr);
      }
    });
  },
  methods: {
    selParam(obj, key, paramExpr) {
      // alert(key, paramExpr, obj)
      obj[key] = "[" + paramExpr + "]";
    },
    selVar(obj, key, paramExpr) {
      // alert(key, paramExpr, obj)
      obj[key] = "[" + paramExpr + "]";
    },
    resetVal(obj, key) {
      obj[key] = this.backupobj[key];
    },
  },
};
</script>