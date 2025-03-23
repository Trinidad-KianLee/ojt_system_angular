/// <reference path="../pb_data/types.d.ts" />
onRecordCreate((e) => {
    e.record.set("role", "user");
    e.next();
}, "users");
