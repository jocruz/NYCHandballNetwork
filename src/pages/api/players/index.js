import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "@/pages/utils/asyncHandler";
import prisma from "../../../db/prismaClient";
import { clerkClient } from "@clerk/nextjs";
/**
 * Retrieves all players from the database.
 *
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Response>} A promise that resolves with the response object containing all players.
 */
const getAllPlayers = asyncHandler(async (req, res) => {
  const allPlayers = await prisma.player.findMany();
  return res.status(StatusCodes.OK).json(allPlayers);
}, "Players");

/**
 * Retrieves a single player by their ID.
 *
 * @async
 * @param {Object} req - The request object, containing the player ID in the query.
 * @param {Object} res - The response object.
 * @returns {Promise<Response>} A promise that resolves with the response object containing the player data.
 * @throws {Error} If the player ID is not provided or the player is not found.
 */
const getSinglePlayer = asyncHandler(async (req, res) => {
  const { id } = req.query; //req.query - An object containing the query string Defaults to {}
  if (!id) {
    const error = new Error("Player ID was not provided");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  const player = await prisma.player.findUnique({
    where: {
      id: id,
    },
  });

  return res.status(StatusCodes.OK).json({ player });
}, "Player");

const getPlayerByEmail = asyncHandler(async (req, res) => {
  const { email } = req.query; // Get email from request body

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email is required" });
  }

  const player = await prisma.player.findUnique({
    where: { email: email },
  });

  return res.status(StatusCodes.OK).json({ player });
}, "Player");

/**
 * Creates a new player in the database.
 *
 * @async
 * @param {Object} req - The request object, containing player data in the body.
 * @param {Object} res - The response object.
 * @returns {Promise<Response>} A promise that resolves with the response object containing the created player data.
 */
const createPlayer = asyncHandler(async (req, res) => {
  console.log("createPlayer called with:", req.body);

  const { clerkUserId, phoneNumber, ...otherFields } = req.body;

  const newPlayer = await prisma.player.create({
    data: {...otherFields},
  });


  await clerkClient.users.updateUserMetadata(clerkUserId, {
    publicMetadata: {
      id: newPlayer.id,
      phoneNumber: phoneNumber,
      role: "player",
    },
  });

  return res.status(StatusCodes.CREATED).json(newPlayer);
}, "Player");

/**
 * Updates a player's information based on their ID.
 *
 * @async
 * @param {Object} req - The request object, containing the player ID in the query and update data in the body.
 * @param {Object} res - The response object.
 * @returns {Promise<Response>} A promise that resolves with the response object containing the updated player data.
 * @throws {Error} If the player ID is not provided.
 */
const updatePlayer = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    const error = new Error("Player ID must be provided");
    error.statusCode = StatusCodes.BAD_REQUEST;
    throw error;
  }

  const updatedPlayer = await prisma.player.update({
    where: {
      id: id,
    },
    data: req.body,
  });

  return res.status(StatusCodes.OK).json(updatedPlayer);
}, "Player");

//databaseID in this case is the player ID that is on the database;
// upsert = If this record exists, update it; if not, create a new one.
const registerPlayer = asyncHandler(async (req, res) => {
  console.log("registerPlayer called with:", req.body);
  const { tournamentId, databaseId, hasPaid } = req.body;
  if (!tournamentId || !databaseId) {
    const error = new Error("Tournament ID or Player ID must be provided");
    error.statusCode = StatusCodes.BAD_REQUEST;
    throw error;
  }
  const registeredPlayer = await prisma.playerTournament.upsert({
    where: {
      playerId_tournamentId: {
        playerId: databaseId,
        tournamentId: tournamentId,
      },
    },
    update: {
      hasPaid: hasPaid,
    },
    create: {
      playerId: databaseId,
      tournamentId: tournamentId,
      hasPaid: hasPaid,
    },
  });

  return res.status(StatusCodes.OK).json({
    message: "Player has successfully registered",
    registeredPlayer: registeredPlayer,
  });
});

/**
 * Deletes a player based on their ID.
 *
 * @async
 * @param {Object} req - The request object, containing the player ID in the query.
 * @param {Object} res - The response object.
 * @returns {Promise<Response>} A promise that resolves with the response object confirming the deletion.
 * @throws {Error} If the player ID is not provided.
 */
const deletePlayer = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    const error = new Error("Player ID must be provided");
    error.statusCode = StatusCodes.BAD_REQUEST;
    throw error;
  }

  const deletedPlayer = await prisma.player.delete({
    where: {
      id: id,
    },
  });

  return res
    .status(StatusCodes.OK)
    .json({ message: "Player was deleted" }, deletedPlayer);
};

/**
 * Deletes all players from the database.
 *
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Response>} A promise that resolves with the response object confirming the deletion of all players.
 */
const deleteAllPlayers = async (req, res) => {
  const deleteMany = await prisma.player.deleteMany({});

  console.log(`Deleted ${deleteMany.count} players.`);
  return res
    .status(StatusCodes.OK)
    .json({ message: `Deleted ${deleteMany.count} players.` });
};

/**
 * The main handler for routing HTTP requests to the appropriate function
 * based on the HTTP method specified in the request.
 *
 * @async
 * @param {Object} req - The HTTP request object from the client.
 * @param {Object} res - The HTTP response object for sending replies back to the client.
 */
const handler = async (req, res) => {
  // Use a switch statement to route to the correct function based on the HTTP method
  const { id, email } = req.query;
  const {tournamentId,databaseId} = req.body
  switch (req.method) {
    case "GET":
      if (id) {
        await getSinglePlayer(req, res);
      } else if (email) {
        await getPlayerByEmail(req, res);
      } else {
        await getAllPlayers(req, res);
      }
      break;
    case "POST":
      // Handle POST requests with the createPlayer function
      if (tournamentId !== undefined && databaseId !== undefined)  {
        await registerPlayer(req, res);
      } else {
        await createPlayer(req, res);
      }
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
      } else {
        await deleteAllPlayers(req, res);
      }
    default:
      // Set the header to inform the client which methods are allowed
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      // If the HTTP method is not supported, return a 405 Method Not Allowed status
      res
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
