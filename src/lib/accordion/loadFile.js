loadFile = url => {
  return new Promise((resolve, reject) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) resolve(JSON.parse(this.responseText));
        else {
          reject(this.statusText);
        }
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  });
};

module.exports = loadFile;
