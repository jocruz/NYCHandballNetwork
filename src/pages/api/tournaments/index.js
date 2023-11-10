import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  errorFormat: "pretty",
});

import { asyncHandler } from "../utils/asyncHandler";

const getAllTournaments = asyncHandler(async (req, res) => {
  const allTournaments = await prisma.tournament.findMany();
  return res.status(StatusCodes.OK).json(allTournaments);
});

const getSingleTournament = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    const error = new Error("Tournament ID must be provided");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  const singleTournament = await prisma.tournament.findUnique({
    where: {
      id: id,
    },
  });

  if (singleTournament) {
    return res.status(StatusCodes.OK).json(singleTournament);
  } else {
    const error = new Error(`Tournament with ID ${id} not found`);
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
});

const createTournament = asyncHandler(async (req, res) => {
  const { name, date, type, totalPlayers, location } = req.body;

  const newTournament = await prisma.tournament.create({
    data: {
      name,
      date: new Date(date), // Ensure the date is in a proper format
      type,
      totalPlayers,
      location,
    },
  });

  res.status(StatusCodes.CREATED).json(newTournament);
});

const updateTournament = asyncHandler(async (req, res) => {
  // Locate tournament index by ID or return -1 if not found.
  const { id } = req.query;
  if (!id) {
    const error = new Error("Tournament ID must be provided");
    error.statusCode = StatusCodes.BAD_REQUEST;
    throw error;
  }

  const updatedTournament = await prisma.tournament.update({
    where: {
      id: id,
    },
    data: req.body,
  });

  return res.status(StatusCodes.OK).json({
    message: `the tournament was updated at ID ${id}`,
    tournament: updatedTournament,
  });
});

const deleteTournament = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    const error = new Error("Tournament ID must be provided");
    error.statusCode = StatusCodes.BAD_REQUEST;
    throw error;
  }

  const deletedTournament = await prisma.tournament.delete({
    where: { id },
  });
  return res.status(StatusCodes.OK).json({
    message: `Tournament with ID: ${id} was deleted successfully.`,
    tournament: deletedTournament,
  });
});

const deleteAllTournaments = async (req, res) => {
  try {
    const deleteMany = await prisma.tournament.deleteMany({});
    console.log(`Deleted ${deleteMany.count} tournaments.`);
    return res
      .status(StatusCodes.OK)
      .json({ message: `Deleted ${deleteMany.count} tournaments.` });
  } catch (error) {
    console.error("Error deleting tournaments:", error);
  }
};

/**
 * The main handler for routing HTTP requests to the appropriate function
 * based on the HTTP method specified in the request.
 *
 * @param {Object} req - The HTTP request object from the client.
 * @param {Object} res - The HTTP response object for sending replies back to the client.
 */
export default function handler(req, res) {
  // Use a switch statement to route to the correct function based on the HTTP method
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      // Handle GET requests with the getTournament function
      if (id) {
        getSingleTournament(req, res);
      } else {
        getAllTournaments(req, res);
      }
      break;
    case "POST":
      // Handle POST requests with the createTournament function
      createTournament(req, res);
      break;
    case "PUT":
      // Handle PUT requests with the updateTournament function
      updateTournament(req, res);
      break;
    case "DELETE":
      // Handle DELETE requests with the deleteTournament function
      if (id) {
        deleteTournament(req, res);
      } else {
        deleteAllTournaments(req, res);
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
}
