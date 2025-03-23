/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2291690852")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3098550237",
    "max": 0,
    "min": 0,
    "name": "businessOwnerName",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text244118373",
    "max": 0,
    "min": 0,
    "name": "warehouseBldgNameNo",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text4229646015",
    "max": 0,
    "min": 0,
    "name": "warehouseStreet",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1360172412",
    "max": 0,
    "min": 0,
    "name": "warehouseBarangay",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3404571484",
    "max": 0,
    "min": 0,
    "name": "warehouseCity",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3760033072",
    "max": 0,
    "min": 0,
    "name": "warehouseState",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number3926561828",
    "max": null,
    "min": null,
    "name": "warehouseTelephoneNumber",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "email4075809309",
    "name": "warehouseEmailAddress",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "email"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3780628417",
    "max": 0,
    "min": 0,
    "name": "warehouseMobileNumber",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1956975072",
    "max": 0,
    "min": 0,
    "name": "warehouseWebsiteOrSocialPage",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2429055981",
    "max": 0,
    "min": 0,
    "name": "warehouseOwnerName",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2526016818",
    "max": 0,
    "min": 0,
    "name": "warehouseOwnerTIN",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text4112236219",
    "max": 0,
    "min": 0,
    "name": "warehouseOwnerSocialClassification",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(14, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3528061625",
    "max": 0,
    "min": 0,
    "name": "warehouseOwnerTelephoneNumber",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(15, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3549529954",
    "max": 0,
    "min": 0,
    "name": "warehouseOwnerEmailAddress",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(16, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3223954110",
    "max": 0,
    "min": 0,
    "name": "warehouseOwnerMobileNumber",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(17, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3780156339",
    "max": 0,
    "min": 0,
    "name": "productsStoredInWarehouse",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(18, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3969236505",
    "max": 0,
    "min": 0,
    "name": "listOrBrandOfProducts",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(19, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3254462297",
    "max": 0,
    "min": 0,
    "name": "nameOfSuppliers",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2291690852")

  // remove field
  collection.fields.removeById("text3098550237")

  // remove field
  collection.fields.removeById("text244118373")

  // remove field
  collection.fields.removeById("text4229646015")

  // remove field
  collection.fields.removeById("text1360172412")

  // remove field
  collection.fields.removeById("text3404571484")

  // remove field
  collection.fields.removeById("text3760033072")

  // remove field
  collection.fields.removeById("number3926561828")

  // remove field
  collection.fields.removeById("email4075809309")

  // remove field
  collection.fields.removeById("text3780628417")

  // remove field
  collection.fields.removeById("text1956975072")

  // remove field
  collection.fields.removeById("text2429055981")

  // remove field
  collection.fields.removeById("text2526016818")

  // remove field
  collection.fields.removeById("text4112236219")

  // remove field
  collection.fields.removeById("text3528061625")

  // remove field
  collection.fields.removeById("text3549529954")

  // remove field
  collection.fields.removeById("text3223954110")

  // remove field
  collection.fields.removeById("text3780156339")

  // remove field
  collection.fields.removeById("text3969236505")

  // remove field
  collection.fields.removeById("text3254462297")

  return app.save(collection)
})
