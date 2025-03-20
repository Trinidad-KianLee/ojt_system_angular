/// <reference path="../pb_data/types.d.ts" />
routerAdd("GET", "/sheesh/{name}", (e) => {
    let name = e.request.pathValue("name")

    return e.json(200, { "message": "Hello " + name })
})


//gawa component para sa admin
//create
//ayusin mo folder