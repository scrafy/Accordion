loadFile = url => {
  return new Promise((resolve, reject) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          const content = JSON.parse(this.responseText);
          if (!(content instanceof Array)){
            throw Error("The content of the file has not the correct format");}
          else
            resolve(content);
        } else {
          throw Error(this.statusText);
        }
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  });
};

module.exports = loadFile;
