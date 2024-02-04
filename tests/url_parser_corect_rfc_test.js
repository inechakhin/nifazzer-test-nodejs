import url from 'url';
import fs from 'fs';

function test_url(urlAddress, partUrl) {
    let parseUrl = url.parse(urlAddress, true);
    if (partUrl["scheme"] != null) {
        if (parseUrl["protocol"] != null) {
            if ((partUrl["scheme"] + ':').localeCompare(parseUrl["protocol"]) != 0) {
                console.log("Problem in scheme:\n", urlAddress, "\n", partUrl["scheme"], "\n", parseUrl["protocol"])
            }
        } else {
            console.log("Problem in scheme:\n", urlAddress, "\n", partUrl["scheme"], "\nNot parsing")
        }
    }
    if (partUrl["userinfo"] != null) {
        if (parseUrl["auth"] != null) {
            if (partUrl["userinfo"].localeCompare(parseUrl["auth"]) != 0) {
                console.log("Problem in userinfo:\n", urlAddress, "\n", partUrl["userinfo"], "\n", parseUrl["auth"])
            }
        } else {
            console.log("Problem in userinfo:\n", urlAddress, "\n", partUrl["userinfo"], "\nNot Parsing")
        }
    }
    if (partUrl["host"] != null) {
        if (parseUrl["hostname"] != null) {
            if (partUrl["host"].toLowerCase().localeCompare(parseUrl["hostname"]) != 0) {
                console.log("Problem in host:\n", urlAddress, "\n", partUrl["host"], "\n", parseUrl["hostname"])
            }
        } else {
            console.log("Problem in host:\n", urlAddress, "\n", partUrl["host"], "\nNot parsing")
        }
    }
    if (partUrl["port"] != null && partUrl["port"].localeCompare('') != 0) {
        if (parseUrl["port"] != null) {
            if (partUrl["port"].localeCompare(parseUrl["port"]) != 0) {
                console.log("Problem in port:\n", urlAddress, "\n", partUrl["port"], "\n", parseUrl["port"])
            }
        } else {
            console.log("Problem in port:\n", urlAddress, "\n", partUrl["port"], "\nNot parsing")
        }
    }
    if (partUrl["path-abempty"] != null) {
        if (parseUrl["pathname"] != null) {
            if (partUrl["path-abempty"].localeCompare(parseUrl["pathname"]) != 0) {
                console.log("Problem in path-abempty:\n", urlAddress, "\n", partUrl["path-abempty"], "\n", parseUrl["pathname"])
            }
        } else {
            console.log("Problem in path-abempty:\n", urlAddress, "\n", partUrl["path-abempty"], "\nNot parsing")
        }
    }
    if (partUrl["query"] != null) {
        if (parseUrl["query"] != null) {
            if (partUrl["query"].localeCompare(parseUrl["query"]) != 0) {
                console.log("Problem in query:\n", urlAddress, "\n", partUrl["query"], "\n", parseUrl["query"])
            }
        } else {
            console.log("Problem in query:\n", urlAddress, "\n", partUrl["query"], "\nNot parsing")
        }
    }
    if (partUrl["fragment"] != null) {
        if (parseUrl["hash"] != null) {
            if (('#' + partUrl["fragment"]).localeCompare(parseUrl["hash"]) != 0) {
                console.log("Problem in fragment:\n", urlAddress, "\n", partUrl["fragment"], "\n", parseUrl["hash"])
            }
        } else {
            console.log("Problem in fragment:\n", urlAddress, "\n", partUrl["fragment"], "\nNot parsing")
        }
    }
}

export function runParserTest() {
    fs.readFile('fuzz/fuzz.json', (err, data) => {
        if (err) {
            console.log("Error reading file from disk: ${err}");
        } else {
            const listUrl = JSON.parse(data)
            listUrl.forEach(tUrl => {
                let urlAddress = tUrl[0];
                const partUrl = tUrl[1];
                try {
                    test_url(urlAddress, partUrl);
                } catch (e) { }
            });
        }
    })
}
