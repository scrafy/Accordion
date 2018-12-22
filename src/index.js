const Accordion = require('./lib/accordion')

let config = {
    ele_parent: "accordion",
    sections:["Section 1 content...", "Section 1 content...", "Section 3 content..."],
}
Accordion({config})

config.ele_parent = "accordion2"
config.load_ajax = true
config.file_name = "data.json"
Accordion({config})
