const regions = [
  {
    'name': 'East Coast US',
    'id': 4543827
  },
  {
    'name': 'West Coast US',
    'id': 5723475
  },
  {
    'name': 'Western Europe',
    'id': 5719381
  },
  {
    'name': 'Eastern Europe',
    'id': 4539733
  },
  {
    'name': 'Northern Europe',
    'id': 5129557
  },
  {
    'name': 'Southern Europe',
    'id': 5457237
  },
  {
    'name': 'British Isles',
    'id': 4344147
  },
  {
    'name': 'South America',
    'id': 5456205
  },
  {
    'name': 'Central America',
    'id': 4407629
  },
  {
    'name': 'Asia',
    'id': 4281153
  },
  {
    'name': 'Australia/NewZealand',
    'id': 4281683
  }
]

exports.getRegionNameById = id => regions.find(region => region.id == id).name // eslint-disable-line eqeqeq
