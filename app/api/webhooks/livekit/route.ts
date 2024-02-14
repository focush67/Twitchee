import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { db } from "@/utilities/database";

const key = process.env.LIVEKIT_API_KEY || "";
const secret = process.env.LIVEKIT_API_SECRET || "";

const receiver = new WebhookReceiver(key, secret);

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headersPayload = headers();
    const auth = headersPayload.get("Authorization");

    if (!auth) {
      return new Response("No auth header", { status: 405 });
    }

    const event = await receiver.receive(body, auth);

    if (event.event === "ingress_ended") {
      await db.stream.update({
        where: {
          ingressID: event.ingressInfo?.ingressId,
        },
        data: {
          isLive: false,
        },
      });
    } else if (event.event === "ingress_started") {
      await db.stream.update({
        where: {
          ingressID: event.ingressInfo?.ingressId,
        },
        data: {
          isLive: true,
        },
      });
    }
  } catch (error: any) {
    return new Response("Some error occured while streaming", { status: 500 });
  }
}
