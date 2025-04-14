const express = require("express");
const router = express.Router();

router.get("/search", async (req, res) => {
  const q = req.query.q?.toLowerCase() || "";

  const mockUnits = [
    { unitId: "U001"},
    { unitId: "U002"},
    { unitId: "U003"},
    { unitId: "TR01"},
    { unitId: "001U"},
  ];

  const results = mockUnits.filter((unit) => {
    const fullText = `${unit.unitId}`.toLowerCase();
    return fullText.includes(q);
  });

  res.json({ results });
});

module.exports = router;