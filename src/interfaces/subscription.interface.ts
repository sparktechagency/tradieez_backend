import { Document } from "mongoose";

type TDuration = 30 | 365;
type TValidity = "yearly" | "monthly";

export interface ISubscription extends Document{
    name: string;
    duration: TDuration;
    validity: TValidity;
    price: number;
    features: string[];
    notice: string;
}