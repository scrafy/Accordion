const loadFile = require("./loadFile");

function render(sections, ele_parent) {
  let dl = document.createElement("dl");
  let dd = null;
  let dt = null;
  let p = null;
  let total_sections = 0;

  sections.map(content => {
    total_sections++;
    dt = document.createElement("dt");
    dt.innerText = `Section ${total_sections}`;
    dd = document.createElement("dd");
    p = document.createElement("p");
    p.innerText = content.toString();
    dd.appendChild(p);
    dl.appendChild(dt);
    dl.appendChild(dd);
  });
  document.getElementById(ele_parent).appendChild(dl);
}

Accordion = ({ config }) => {
  let { sections, ele_parent, load_ajax, file_name } = config;

  if (!load_ajax && !(sections instanceof Array))
    throw Error("The sections parameter has to be an array");

  if (
    ele_parent === undefined ||
    typeof ele_parent !== "string" ||
    !ele_parent.length
  )
    throw Error(
      "The ele_parent parameter has to be of string type and it has to be setted a valid value"
    );

  if (document.getElementById(ele_parent) === null)
    throw Error(
      "Not exists in DOM a node with the id attribute: " + ele_parent
    );

  if (load_ajax) {
    if (
      file_name === undefined ||
      typeof file_name !== "string" ||
      !file_name.length
    )
      throw Error(
        "The file_name parameter has to be of string type and it has to be setted a valid value"
      );

    loadFile(file_name)
      .then(_sections => {
        render(_sections, ele_parent);
      })
      .catch(err => {
        throw Error(err);
      });
  } else {
    render(sections, ele_parent);
  }
};

module.exports = Accordion;
