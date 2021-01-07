function objattr2node(obj, node) {
  node = node || [];
  if (typeof obj == "string") {
    node = [{
      title: obj,
      expand: false,
    }]
  } else {
    Object.keys(obj).forEach((key) => {
      if (Array.isArray(obj[key])) {
        node.push({
          title: `${key}`,
          expand: true,
          children: objattr2node(obj[key]),
          key: key
        });
      } else if (typeof obj[key] == "object") {
        node.push({
          title: `${key}`,
          expand: true,
          children: objattr2node(obj[key]),
          key: key,
          value: obj[key]
        });
      } else {
        node.push({
          title: `${key}:${obj[key]}`,
          expand: false,
          key: key,
          value: obj[key]
        });
      }
    });
  }
  return node;
}


const editbtn = (action, h, data) => h("Button", {
  props: Object.assign({}, h.buttonProps, {
    icon: "md-build",
  }),
  style: {
    marginLeft: "8px",
    fontSize: "15px",
    height: "30px",
    width: "30px"
  },
  on: {
    click: () => {
      action(data)
    },
  },
})
const copybtn = (action, h, data) => h("Button", {
  props: Object.assign({}, h.buttonProps, {
    icon: "md-copy",
  }),
  style: {
    marginLeft: "8px",
    fontSize: "15px",
    height: "30px",
    width: "30px"
  },
  on: {
    click: () => {
      action(data);
    },
  },
})
const titlespan = (text, color, h) => h(
  "span",
  {
    style: {
      color: color,
      fontSize: "12px",
    },
  },
  text
)


const renderContent = (h, data, edit, copy) => {


  if (data.root) {
    return h(
      "div",
      {
        style: {
          display: "inline-block",
          width: "100%",
        },
      },
      [
        titlespan(data.title, "blue", h),
        editbtn(edit, h, data),
        copybtn(copy, h, data)
      ]
    );
  } else if (data.key) {
    return h(
      "div",
      {
        style: {
          display: "inline-block",
          width: "100%",
        },
      },
      [
        titlespan(data.key + ": ", "blue", h),
        titlespan(data.value, "black", h),
      ]
    );
  } else if (data.title) {
    return h(
      "div",
      {
        style: {
          display: "inline-block",
          width: "100%",
        },
      },
      [
        titlespan(data.title, "black", h),
      ]
    );
  }
}
export default {
  objattr2node,
  renderContent
}