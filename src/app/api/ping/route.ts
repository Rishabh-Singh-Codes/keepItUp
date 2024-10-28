import { pingService } from "@/lib/pingScheduler";
import { NextApiRequest, NextApiResponse } from "next";
import cron from "node-cron";

let cronJob: cron.ScheduledTask;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!cronJob) {
      cronJob = cron.schedule("*/10 * * * * *", async () => {
        await pingService();
      });
    }

    res.status(200).json({ message: "Cron job started" });
  } catch (error) {
    console.log("error: Failed to start Cron job", error);
    res.status(500).json({ message: "Failed to start Cron job" });
  }
}
