function getData(req, res) {
  const args = req; // eslint-disable-line

  res.json({
    message: 'hi there!',
  });
}

module.exports.getData = getData;
