exports.getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'Wszystkie miody',
  });
};
exports.getHoney = (req, res) => {
  res.status(200).render('honey', {
    title: 'Miód malinowy',
  });
};
