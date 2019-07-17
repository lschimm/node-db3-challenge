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
function findSteps(id) {
  return db("steps as st") //good
    .innerJoin("schemes as s", "s.id", "st.scheme_id") //good
    .where({ scheme_id: id })
    .select(
      "st.step_number as Step",
      "s.scheme_name as Scheme Name",
      "st.instructions as instructions"
    );
}

// inserts scheme into the dabase
// resolves to the newly scheme
function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(ids => ({ id: ids[0] }));
}

// updates the scheme at the given id
// resolves newly updated scheme obj
function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes, "*");
}

//removes scheme obj with the given id
// returns `null` on invalid id
function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}
