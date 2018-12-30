# ACORDDION

Clone proyect from: [https://github.com/scrafy/Accordion.git](https://github.com/scrafy/Accordion.git)

---
## Exectute following commands:

1. For install node modules `npm install`
2. For to compile the application `npm run build`
3. For execute the application `npm start`
4. For run test `npm test`

---

The main entry point of the application is the ./src/main.js file and you can change both the HTML code in ./src/index.html file and ./src/main.js file

---

## Example of use

```
//use exmaple of the component setting the content throught config object

let config = {
    ele_parent: "accordion",
    sections:["Section 1 content...", "Section 2 content...", "Section 3 content..."],
}
Accordion({config})


//BONUS: use example loading the content from file using AJAX

config = {}
config = {
    ele_parent:"accordion2",
    load_ajax:true,
    file_name:"data.json"
}

Accordion({config})
```
*NOTE: To load the contents of the sections using AJAX , place a file with json extension in the public folder. The contents of this file will be an array of strings. One string for each section*

