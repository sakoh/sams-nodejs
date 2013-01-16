console.log('Debugging message');

function notDefined() {
  try {
    someFunction(); // undefined
  } catch (e) {
    console.error(e);
  }
}

notDefined();


function newFunction() {
  return undefVar; // undefined
}
function newNotDefined() {
  try {
    newFunction(); // now defined
  } catch (e) {
    console.error(e);
  }
}

newNotDefined();