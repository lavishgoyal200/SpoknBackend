// chat.controller.js
import { upsertStreamUser, generateStreamToken } from "../lib/stream.js";

export async function getStreamtoken(req, res) {
  try {
    const userId = req.user.id;
    const name = req.user.name || "Anonymous";
    const image = req.user.profilePic || `https://getstream.io/random_png/?id=${userId}`;

    // ⬇️ Upsert the user before generating the token
    await upsertStreamUser({
      id: userId,
      name,
      image,
    });

    const token = generateStreamToken(userId);
    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
