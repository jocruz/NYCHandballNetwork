import { StatusCodes } from "http-status-codes";
import prisma from "../../../db/prismaClient";
import { asyncHandler } from "@/pages/utils/asyncHandler";

const getAllMatches = asyncHandler(async (req, res) => {
  const allMatches = await prisma.match.findMany();
  return res.status(StatusCodes.OK).json(allMatches);
}, "Match");

const getSingleMatch = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    const error = new Error("Tournament ID must be provided");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  const singleMatch = await prisma.match.findUnique({
    where: {
      id: id,
    },
    include:{
      playersTeamA: true,
      playersTeamB: true,
    }
  });

  return res.status(StatusCodes.OK).json(singleMatch);
}, "Match");

const createMatches = asyncHandler(async (req, res) => {
  const { matchType, playersTeamA, playersTeamB } = req.body;

  // Validate the number of players based on matchType
  if (
    matchType === "Singles" &&
    (playersTeamA.length > 1 || playersTeamB.length > 1)
  ) {
    return res
      .status(400)
      .send("Singles match must have exactly one player per team.");
  }

  if (
    matchType === "Doubles" &&
    (playersTeamA.length !== 2 || playersTeamB.length !== 2)
  ) {
    return res
      .status(400)
      .send("Doubles match must have exactly two players per team.");
  }

  // Create the match
  try {
    const createdMatch = await prisma.match.create({
      data: {
        ...req.body,
        playersTeamA: {
          connect: playersTeamA.map((playerId) => ({ id: playerId })),
        },
        playersTeamB: {
          connect: playersTeamB.map((playerId) => ({ id: playerId })),
        },
      },
    });

    res.status(201).json(createdMatch);
  } catch (error) {
    res.status(500).send("Error creating match" + error.message);
  }
}, "Match");

const updateMatch = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const updateData = req.body;

  if (!id) {
    const error = new Error("Match ID must be provided");
    error.statusCode = StatusCodes.BAD_REQUEST;
    throw error;
  }

  // Check if the match exists
  const matchExists = await prisma.match.findUnique({
    where: { id: id },
  });

  if (!matchExists) {
    const error = new Error("Match not found");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  // Update the match
  const updatedMatch = await prisma.match.update({
    where: { id: id },
    data: updateData,
  });

  return res.status(StatusCodes.OK).json(updatedMatch);
}, "Match");

const deleteMatch = asyncHandler(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "ID was not provided" });
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: "The following match was deleted:" } + deleteMatch);
}, "Match");

const deleteAllMatches = async (req, res) => {
  const deleteMany = await prisma.match.deleteMany({});

  console.log(`Deleted ${deleteMany.count} matches.`);
  return res
    .status(StatusCodes.OK)
    .json({ message: `Deleted ${deleteMany.count} matches.` });
};
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
      // Handle GET requests with the getMatches function
      if (id) {
        await getSingleMatch(req, res);
      } else {
        await getAllMatches(req, res);
      }
      break;
    case "POST":
      // Handle POST requests with the createMatches function
      await createMatches(req, res);
      break;
    case "PUT":
      // Handle PUT requests with the updateMatches function
      if (id) {
        await updateMatch(req, res);
      }
      break;
    case "DELETE":
      // Handle DELETE requests with the deleteMatches function
      if (id) {
        await deleteMatch(req, res);
      } else {
        await deleteAllMatches(req, res);
      }
      break;
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
