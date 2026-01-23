import CustomError from "../../errors/CustomError";
import SubscriptionModel from "../../models/SubscriptionModel";
import isValidYearFormat from "../../utils/isValidateYearFormat";

const GetIncomeOverviewService = async (year: string) => {
  if (!isValidYearFormat(year)) {
    throw new CustomError(
      400,
      "Invalid year, year should be in 'YYYY' format.",
    );
  }

  const start = `${year}-01-01T00:00:00.000+00:00`;
  const end = `${year}-12-31T11:59:59.999+00:00`;

  const result = await SubscriptionModel.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(start), $lte: new Date(end) },
        paymentStatus: "paid",
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        income: { $sum: "$amount" },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
    {
      $addFields: {
        income: { $round: ["$income", 2] },
        month: {
          $arrayElemAt: [
            [
              "",
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            "$_id.month",
          ],
        },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  // Fill in missing months
  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const filledData = allMonths.map((month) => {
    const found = result?.find((item) => item.month === month);
    return {
      month,
      income: found ? found.income : 0,
    };
  });

  return filledData;
};

export default GetIncomeOverviewService;
