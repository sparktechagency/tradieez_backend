import { TPaymentStatus } from "../interfaces/subscription.interface";


const getSubscriptionStatus = (paymentStatus: TPaymentStatus, endDate: Date) => {
    const currentDateStr = new Date().toISOString().split("T")[0] + "T23:59:59.999+00:00";
    const currentDate = new Date(currentDateStr as string);

    if (paymentStatus === "unpaid") {
        return "pending"
    }
    else if (endDate >= currentDate) {
        return "active"
    }
    else {
        return "expired"
    }
}

export default getSubscriptionStatus;