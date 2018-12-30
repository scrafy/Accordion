const Accordion = require('./lib/accordion')

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