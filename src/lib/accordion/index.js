const loadFile = require("./loadFile");

if (process.env.NODE_ENV !== "test")
  require("./theme/accordion.scss");

const Accordion = ({ config }) => {
  let { sections, ele_parent, load_ajax, file_name, class_name } = config;

  const onClickHandler = event => {
    let p = event.target.nextSibling.firstChild;
    if (p.getAttribute("class").includes("accordion-body--show")) {
      p.setAttribute(
        "class",
        p.getAttribute("class").replace("accordion-body--show", "")
      );
    } else {
      Array.prototype.map.call(
        document.querySelectorAll(".accordion-body--show"),
        ele => {
          ele.setAttribute(
            "class",
            ele.getAttribute("class").replace("accordion-body--show", "")
          );
        }
      );

      p.setAttribute(
        "class",
        `${p.getAttribute("class")} accordion-body--show`
      );
    }
  };

  const render = (sections, ele_parent, class_name = "accordion") => {
    let dl = document.createElement("dl");
    dl.setAttribute("class", class_name);
    let dd = null;
    let dt = null;
    let p = null;
    let total_sections = 0;

    sections.map(content => {
      total_sections++;
      dt = document.createElement("dt");
      dt.setAttribute("class", `${class_name}-header`);
      dt.innerText = `Section ${total_sections}`;
      dt.addEventListener("click", onClickHandler);
      dd = document.createElement("dd");
      dd.setAttribute("class", `${class_name}-panel`);
      p = document.createElement("p");
      p.setAttribute("class", `${class_name}-body`);
      p.innerText = content.toString();
      dd.appendChild(p);
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
    document.getElementById(ele_parent).appendChild(dl);
    return dl;
  };

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
      render(_sections, ele_parent, class_name);
    })
    .catch(err => {
      throw Error(err.message)
    })
  } else {
    render(sections, ele_parent, class_name);
  }
};

module.exports = Accordion;
