// import { getResponse } from "../../services/bot/chatService.js";

// export async function chat(req, res) {
//   try {
//     const { message } = req.body;

//     if (!message) {
//       return res.status(400).json({ error: "Message is required" });
//     }

//     const reply = await getResponse(message);
//     res.json({ reply });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
