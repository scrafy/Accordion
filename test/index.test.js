"use strict";
const Accodion = require("../src/lib/accordion");
const $ = require("jquery");
const fs = require("fs");
process.env.isTesting = true;

describe("Accordion setup not using ajax", () => {
  let config;
  beforeEach(() => {
    config = {
      ele_parent: "accordion",
      sections: [
        "Section 1 content...",
        "Section 2 content...",
        "Section 3 content..."
      ]
    };
    let accordion = document.createElement("div");
    accordion.setAttribute("id", "accordion");
    document.body.appendChild(accordion);
  });

  test("Should be render correctly using a correct configuration", () => {
      
    Accodion({ config });
    const total_dt = $("#accordion dl dt").length;
    const total_dd = $("#accordion dl dd").length;
    expect(total_dt).toEqual(3);
    expect(total_dt).toEqual(3);
    expect($("#accordion dl dt:eq(0)")[0].innerText).toEqual("Section 1");
    expect($("#accordion dl dt:eq(1)")[0].innerText).toEqual("Section 2");
    expect($("#accordion dl dt:eq(2)")[0].innerText).toEqual("Section 3");
    expect($("#accordion dl dd:eq(0)").children("p")[0].innerText).toEqual(
      "Section 1 content..."
    );
    expect($("#accordion dl dd:eq(1)").children("p")[0].innerText).toEqual(
      "Section 2 content..."
    );
    expect($("#accordion dl dd:eq(2)").children("p")[0].innerText).toEqual(
      "Section 3 content..."
    );
  });

  test("Should fails when not sections property is present in confgiuration object", () => {
    delete config.sections;
    try {
      Accodion({ config });
    } catch (err) {
      expect(err.message).toEqual("The sections parameter has to be an array");
    }
  });

  test("Should fails when parent element is not defined", () => {
    delete config.ele_parent;
    try {
      Accodion({ config });
    } catch (err) {
      expect(err.message).toEqual(
        "The ele_parent parameter has to be of string type and it has to be setted a valid value"
      );
    }
  });

  test("Should fails when parent element is empty", () => {
    config.ele_parent = "";
    try {
      Accodion({ config });
    } catch (err) {
      expect(err.message).toEqual(
        "The ele_parent parameter has to be of string type and it has to be setted a valid value"
      );
    }
  });

  test("Should fails when parent element is not type string", () => {
    config.ele_parent = 3;
    try {
      Accodion({ config });
    } catch (err) {
      expect(err.message).toEqual(
        "The ele_parent parameter has to be of string type and it has to be setted a valid value"
      );
    }
  });

  test("Should fails when parent element is incorrect", () => {
    config.ele_parent = "not exists";
    try {
      Accodion({ config });
    } catch (err) {
      expect(err.message).toEqual(
        "Not exists in DOM a node with the id attribute: " + config.ele_parent
      );
    }
  });

});

describe("Accordion setup loading content using ajax", () => {
  let config;

  beforeEach(() => {
    config = {
      ele_parent: "accordion2",
      load_ajax: true,
      file_name: "data.json"
    };
    let accordion2 = document.createElement("div");
    accordion2.setAttribute("id", "accordion2");
    document.body.appendChild(accordion2);
  });

  test("Should be render correctly using a correct configuration", () => {
    Accodion({ config });
    const total_dt = $("#accordion dl dt").length;
    const total_dd = $("#accordion dl dd").length;
    expect(total_dt).toEqual(3);
    expect(total_dt).toEqual(3);
    expect($("#accordion dl dt:eq(0)")[0].innerText).toEqual("Section 1");
    expect($("#accordion dl dt:eq(1)")[0].innerText).toEqual("Section 2");
    expect($("#accordion dl dt:eq(2)")[0].innerText).toEqual("Section 3");
    expect(
      $("#accordion dl dd:eq(0)").children("p")[0].innerText.length
    ).toBeGreaterThan(0);
    expect(
      $("#accordion dl dd:eq(1)").children("p")[0].innerText.length
    ).toBeGreaterThan(0);
    expect(
      $("#accordion dl dd:eq(2)").children("p")[0].innerText.length
    ).toBeGreaterThan(0);
  });

  test("Should fails when file name is empty", () => {
    config.file_name = "";
    try {
      Accodion({ config });
    } catch (err) {
      expect(err.message).toEqual(
        "The file_name parameter has to be of string type and it has to be setted a valid value"
      );
    }
  });

  test("Should fails when file name is undefined", () => {
    delete config.file_name;
    try {
      Accodion({ config });
    } catch (err) {
      expect(err.message).toEqual(
        "The file_name parameter has to be of string type and it has to be setted a valid value"
      );
    }
  });

  test("Should fails when file name is not string type", () => {
    config.file_name = 5;
    try {
      Accodion({ config });
    } catch (err) {
      expect(err.message).toEqual(
        "The file_name parameter has to be of string type and it has to be setted a valid value"
      );
    }
  });

  test("Should fails when the file is not found", () => {
    config.file_name = "not_found.json";
    try {
      Accodion({ config });
    } catch (err) {
      expect(err.message).toThrowError("Not Found");
    }
  });

  test("Should fails when the file is not an array of string", () => {
    fs.writeFile("public/test.json", 5);

    config.file_name = "test.json";
    try {
      Accodion({ config });
    } catch (err) {
      expect(err.message).toEqual(
        "The content of the file has not the correct formats"
      );
    } finally {
      fs.unlink("public/test.json");
    }
  });
});
