exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments();
    tbl.string("vin").unique().notNullable();
    tbl.string("make").notNullable();
    tbl.string("model").notNullable();
    tbl.string("title").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
