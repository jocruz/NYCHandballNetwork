import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler";

const prisma = new PrismaClient({
  errorFormat: "pretty",
});
/**
 * Retrieves the information of all players.
 *
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to send back all player data.
 */
const getAllPlayers = asyncHandler(async (req, res) => {
  const allPlayers = await prisma.player.findMany();
  return res.status(StatusCodes.OK).json(allPlayers);
}, "Players");

/**
 * Creates a new player with the provided information in the request body.
 * Generates a unique ID for the player and appends it to the in-memory array.
 *
 * @param {Object} req - The request object from the client, including body with player details.
 * @param {Object} res - The response object to send back the created player data.
 */

/**
 * Retrieves player(s) information.
 * If an ID is provided in the query, it fetches a specific player.
 * Otherwise, it returns all players.
 *
 * @param {Object} req - The request object from the client, including query parameters.
 * @param {Object} res - The response object to send back the player data.
 */

function getSinglePlayer(req, res) {
  const { id } = req.query;
  if (!id || id.trim() === "") {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "ID was not provided or is empty" });
    return;
  }
  const player = players.find((player) => player.id === id);
  if (player) {
    res.status(StatusCodes.OK).json(player);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: "player not found" });
  }
}

const createPlayer = asyncHandler(async (req, res) => {
  const { name, email, categoryRank, overallRank } = req.body;

  const newPlayer = await prisma.player.create({
    data: {
      name: name,
      email: email,
      categoryRank: categoryRank,
      overallRank: overallRank,
    },
  });

  return res.status(StatusCodes.CREATED).json(newPlayer);
}, "Players");

/**
 * Updates a player's information based on its ID.
 *
 * @param {Object} req - The request object from the client, including query and body.
 * @param {Object} res - The response object to send back the updated player data.
 */
function updatePlayer(req, res) {
  const { id } = req.query;
  const index = players.findIndex((player) => player.id === id);

  if (index !== -1) {
    const {
      name,
      email, //optional
      categoryRank,
      overallRank,
      tournamentIds, // This is the array of tournament IDs to update
    } = req.body;

    // Update the player information with the new details, if provided
    const updatedPlayerInfo = {
      ...(name && { name }),
      ...(email && { email }),
      ...(categoryRank && { categoryRank }),
      ...(overallRank && { overallRank }),
      ...(tournamentIds && { tournamentIds }), // Update the tournamentIds if provided
    };

    // Merge the existing player object with the updated player info
    players[index] = { ...players[index], ...updatedPlayerInfo };

    res.status(StatusCodes.OK).json(players[index]);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Player not found" });
  }
}

/**
 * Deletes a player based on its ID.
 *
 * @param {Object} req - The request object from the client, containing the query.
 * @param {Object} res - The response object to send back the deletion confirmation.
 */
function deletePlayer(req, res) {
  // Filter out the player with the given ID.
  const { id } = req.query;
  const newPlayers = players.filter((player) => player.id !== id);

  // Check if the player array length is reduced after filtering.
  if (newPlayers.length !== players.length) {
    players = newPlayers;
    // Confirm deletion with a 200 status.
    res.status(StatusCodes.OK).json({ message: "player deleted" });
  } else {
    // If not found, return a 404 error.
    res.status(StatusCodes.NOT_FOUND).json({ message: "player not found" });
  }
}

/**
 * The main handler for routing HTTP requests to the appropriate function
 * based on the HTTP method specified in the request.
 *
 * @param {Object} req - The HTTP request object from the client.
 * @param {Object} res - The HTTP response object for sending replies back to the client.
 */
const handler = async (req, res) => {
  // Use a switch statement to route to the correct function based on the HTTP method
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      if (id) {
        await getSinglePlayer(req, res);
      } else {
        await getAllPlayers(req, res);
      }
      break;
    case "POST":
      // Handle POST requests with the createPlayer function
      await createPlayer(req, res);
      break;
    case "PUT":
      // Handle POST requests with the createPlayer function
      if (id) {
        await updatePlayer(req, res);
      }
      break;
    case "DELETE":
      if (id) {
        await deletePlayer(req, res);
      }
    default:
      // Set the header to inform the client which methods are allowed
      res.setHeader("Allow", ["GET", "POST"]);
      // If the HTTP method is not supported, return a 405 Method Not Allowed status
      res
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
