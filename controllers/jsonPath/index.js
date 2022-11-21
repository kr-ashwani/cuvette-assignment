const { applyOperation, applyPatch } = require('fast-json-patch');

const jsonPathController = (req, res) => {
  const { jsonObject, jsonPatch } = req.body;

  console.log(jsonObject, jsonPatch);
  if (!jsonObject && !jsonPatch)
    return res.status(404).json('JSON object or JSON patch is missing.');

  try {
    if (!typeof jsonObject === Object)
      return res.status(400).json('JSON object must be a object.');

    // array of operation objects
    if (Array.isArray(jsonPatch)) {
      const updateObject = applyPatch(jsonObject, jsonPatch).newDocument;
      return res.status(200).json({ updateObject });
    }

    //  single opeartion object
    if (typeof jsonPatch === 'object') {
      const updateObject = applyOperation(jsonObject, jsonPatch).newDocument;
      return res.status(200).json({ updateObject });
    }

    throw Error('JSON patch format is incorrect');
  } catch (err) {
    console.log(err.message);
    return res
      .status(400)
      .json(
        'JSON patch must be a single operation object or array of operation objects.check https://jsonpatch.com/ for more detail.'
      );
  }
  // res.send('okk');
};

module.exports = jsonPathController;
