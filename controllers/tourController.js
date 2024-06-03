const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // console.log(req.requestTime);
    // console.log(req.query);

    // BUILD QUERY
    // 1A) FILTERING

    // const queryObj = { ...req.query };
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) ADVANCED FILTERING

    // {difficulty: 'easy', duration: {$gte : 5} } = MONGODB
    // {difficulty: 'easy', duration: {gte : 5} } = POSTMAN
    // gte, gt, lte, lt
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));

    // const query = Tour.find()
    //   .where('duration')
    //   .equals(req.query.duration)
    //   .where('difficulty')
    //   .equals(req.query.difficulty);
    // let query = Tour.find(JSON.parse(queryStr));

    // 2) SORTING

    // if (req.query.sort) {
    //   const sortBy = req.query.sort.replace(',', ' ');
    //   query = query.sort(sortBy);
    //   // sort('price ratingsAverage')
    // } else {
    //   query = query.sort('-createdAt'); // DESCENDING ORDER
    // }

    // 3) FIELD LIMITING
    // if (req.query.fields) {
    //   const fields = req.query.fields.replaceAll(',', ' ');
    //   query = query.select(fields);
    //   console.log(fields);
    //   // select('name duration price')
    // } else {
    //   query = query.select('-__v'); // EXCLUDING FIELD

    // 4) PAGINATION
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 3;
    // const skip = (page - 1) * limit;

    // // page=2&limit=3, 1-3, page1, 4-6, page 2
    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error("This page deoesn't exist");
    // }

    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  // Tour.findOne({ _id: req.params.id })

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });

  // try {
  //   const tour = await Tour.findById(req.params.id);
  //   // Tour.findOne({ _id: req.params.id })

  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       tour,
  //     },
  //   });
  // } catch (error) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: error,
  //   });
  // }
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });

  // try {
  //   // console.log(req.body);
  //   // const newTour = new Tour({})
  //   // newTour.save()

  //   const newTour = await Tour.create(req.body);
  //   res.status(201).json({
  //     status: 'success',
  //     data: {
  //       tour: newTour,
  //     },
  //   });
  // } catch (error) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: error,
  //   });
  // }
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });

  // try {
  //   const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
  //     new: true,
  //     runValidators: true,
  //   });

  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       tour,
  //     },
  //   });
  // } catch (error) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid data sent',
  //   });
  // }
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });

  // try {
  //   await Tour.findByIdAndDelete(req.params.id);

  //   res.status(204).json({
  //     status: 'success',
  //     data: null,
  //   });
  // } catch (error) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid data sent',
  //   });
  // }
});

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          // _id: '$ratingsAverage',
          numTours: {
            $sum: 1,
          },
          numRatings: {
            $sum: '$ratingsQuantity',
          },
          avgRating: {
            $avg: '$ratingsAverage',
          },
          avgPrice: {
            $avg: '$price',
          },
          minPrice: {
            $min: '$price',
          },
          maxPrice: {
            $max: '$price',
          },
        },
      },
      {
        $sort: {
          avgPrice: 1,
        },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } },
      // },
    ]);

    res.status(200).json({
      status: 'success',
      data: stats,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12- 31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStats: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          numTourStats: -1,
        },
      },
      {
        $limit: 6,
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: plan,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};
