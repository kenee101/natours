const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build the template in the pug

  // 3) Render the template using the tour data
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }); //.populate({
  // path: 'reviews',
  // fields: 'review rating user',
  // });

  // 2) Build the template in the pug

  // 3) Render the template using the provided data

  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
    tour,
  });
});