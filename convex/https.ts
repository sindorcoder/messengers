import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { internal } from "./_generated/api";
import { Webhook } from "svix";
const http = httpRouter();

const validatePayload = async (
  req: Request
): Promise<WebhookEvent | undefined> => {
  const payload = await req.text();

  const svixHeaders = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-singature": req.headers.get("svix-singature")!,
  };

  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  try {
    const event = webhook.verify(payload, svixHeaders) as WebhookEvent;

    return event;
  } catch (error) {
    console.log(error);
  }
};

const handleClerkWebhook = httpAction(async (ctx, req) => {
  const event = await validatePayload(req);

  if (!event) {
    return new Response("Could not validate clerk payload", {
      status: 400,
    });
  }
  switch (event.type) {
    case "user.created":
      const user = await ctx.runQuery(internal.user.get, {
        clerkID: event.data.id,
      });
      if (user) {
        console.log(`updated uesr, ${event.data.id} width: ${event.data} `);
      }

    case "user.updated":
      console.log(`Createing, Updating User: ${event.data.id}`);
      await ctx.runMutation(internal.user.create, {
        username: `${event.data.first_name} ${event.data.last_name}`,
        imageUrl: `${event.data.image_url}`,
        clerkId: `${event.data.id}`,
        email: `${event.data.email_addresses[0]}`,
      });
      break;
    default: {
      console.log("Clerck Webhook event not supported", event.type);
    }
  }
  return new Response(null, { status: 200 });
});

http.route({
  path: "/clerck-users-webhook",
  method: "POST",
  handler: handleClerkWebhook,
});
export default http;
