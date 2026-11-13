const allowedTypes = [
  "firstMeeting",
  "nextMeeting",
  "message",
  "quizAnswer"
];

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();

    if (!data.consent || data.consent !== true) {
      return Response.json(
        { success: false, error: "Consent required" },
        { status: 400 }
      );
    }

    if (!allowedTypes.includes(data.type)) {
      return Response.json(
        { success: false, error: "Invalid type" },
        { status: 400 }
      );
    }

    if (!data.payload || typeof data.payload !== "object") {
      return Response.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    const payload = JSON.stringify(data.payload);

    if (payload.length > 5000) {
      return Response.json(
        { success: false, error: "Data too large" },
        { status: 400 }
      );
    }

    await env.DB.prepare(
      "INSERT INTO submissions (type, payload, consent) VALUES (?, ?, 1)"
    ).bind(data.type, payload).run();

    return Response.json({ success: true });

  } catch (error) {
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
