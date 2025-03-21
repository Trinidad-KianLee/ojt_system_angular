/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2587027837")

  // remove field
  collection.fields.removeById("select3585373636")

  // add field
  collection.fields.addAt(22, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3585373636",
    "max": 0,
    "min": 0,
    "name": "promoSchemes",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2587027837")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "select3585373636",
    "maxSelect": 1,
    "name": "promoSchemes",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "contest",
      "premium",
      "redemption",
      "raffle",
      "coverage"
    ]
  }))

  // remove field
  collection.fields.removeById("text3585373636")

  return app.save(collection)
})
