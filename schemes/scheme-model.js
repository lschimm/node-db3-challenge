const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

// returns corresponding user to the id
// empty array if no user id is found
function find() {
  // returns a list of the resources (schemes)
  return db("schemes");
}

//invalid `id` === null
function findById(id) {
  return db("schemes")
    .where({ id })
    .first()
    .then(scheme => {
      if (scheme) {
        return scheme;
      } else {
        return null;
      }
    });
}

// resolves to an array of ordered steps for scheme
// id, scheme_name, in order
function findSteps(id) {}

// inserts scheme into the dabase
// resolves to the newly scheme
function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(ids => ({ id: ids[0] }));
}

// updates the scheme at the given id
// resolves newly updated scheme obj
function update(changes, id) {}

//removes scheme obj with the given id
// returns `null` on invalid id
function remove(id) {}
