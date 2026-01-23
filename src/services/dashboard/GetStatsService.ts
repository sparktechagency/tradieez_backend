import JobModel from "../../models/Job.Model";
import SubscriptionModel from "../../models/SubscriptionModel";
import UserModel from "../../models/UserModel";

const GetStatsService = async () => {
  const totalCandidates = await UserModel.countDocuments({ role: "candidate" });
  const totalEmployers = await UserModel.countDocuments({ role: "employer" });
  const totalJobs = await JobModel.countDocuments();

  //count total income
  const totalIncomeResult = await SubscriptionModel.aggregate([
    {
      $match: {
        paymentStatus: "paid",
      },
    },
    {
      $group: {
        _id: null,
        income: { $sum: "$amount" },
      },
    },
  ]);

  const totalIncome = totalIncomeResult.length > 0 ? Number(totalIncomeResult[0].income.toFixed(2)) : 0;

  return {
    totalCandidates,
    totalEmployers,
    totalJobs,
    totalIncome
  };
};

export default GetStatsService;
