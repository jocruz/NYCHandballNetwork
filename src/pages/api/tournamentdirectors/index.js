// src/pages/api/tournament-directors/index.js

import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "@/pages/utils/asyncHandler";
import prisma from "../../../db/prismaClient";
import { clerkClient } from "@clerk/nextjs";

// Retrieve all tournament directors
const getAllDirectors = asyncHandler(async (req, res) => {
  const allDirectors = await prisma.tournamentDirector.findMany();
  return res.status(StatusCodes.OK).json(allDirectors);
}, "TournamentDirectors");

// Retrieve a single tournament director by ID
const getSingleDirector = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    const error = new Error("Director ID was not provided");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  const director = await prisma.tournamentDirector.findUnique({
    where: {
      id: id,
    },
  });

  if (!director) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Director not found" });
  }

  return res.status(StatusCodes.OK).json({ director });
}, "TournamentDirector");

const getDirectorByEmail = asyncHandler(async (req, res) => {
  const { email } = req.query; // Get email from request body

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email is required" });
  }

  const director = await prisma.tournamentDirector.findUnique({
    where: { email: email },
  });

  return res.status(StatusCodes.OK).json({ director });
}, "TournamentDirector");

// Create a new tournament director end point
const createDirector = asyncHandler(async (req, res) => {
  const { clerkUserId, phoneNumber } = req.body;

  // Create the Tournament Director in the database
  const newDirector = await prisma.tournamentDirector.create({
    data: req.body,
  });

  // Store the database-generated ID in the Clerk user's metadata
  try {
    await clerkClient.users.updateUserMetadata(clerkUserId, {
      publicMetadata: {
        databaseId: newDirector.id, // Using the database-generated ID
        phoneNumber: phoneNumber,
        role:"player",
      },
    });
  } catch (error) {
    console.error("Error updating Clerk user metadata:", error);
  }

  return res.status(StatusCodes.CREATED).json(newDirector);
}, "TournamentDirector");


// Update a tournament director's information
const updateDirector = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    const error = new Error("Director ID must be provided");
    error.statusCode = StatusCodes.BAD_REQUEST;
    throw error;
  }

  const updatedDirector = await prisma.tournamentDirector.update({
    where: {
      id: id,
    },
    data: req.body,
  });

  return res.status(StatusCodes.OK).json(updatedDirector);
}, "TournamentDirector");

// Delete a tournament director
const deleteDirector = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    const error = new Error("Director ID must be provided");
    error.statusCode = StatusCodes.BAD_REQUEST;
    throw error;
  }

  await prisma.tournamentDirector.delete({
    where: {
      id: id,
    },
  });

  return res.status(StatusCodes.OK).json({ message: "Director was deleted" });
}, "TournamentDirector");

// Main handler for routing HTTP requests
const directorHandler = async (req, res) => {
  const { id, email } = req.query;
  switch (req.method) {
    case "GET":
      if (id) {
        await getSingleDirector(req, res);
      } else if (email) {
        await getDirectorByEmail(req, res);
      } else {
        await getAllDirectors(req, res);
      }
      break;
    case "POST":
      await createDirector(req, res);
      break;
    case "PUT":
      await updateDirector(req, res);
      break;
    case "DELETE":
      await deleteDirector(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .end(`Method ${req.method} Not Allowed`);
  }
};

export default directorHandler;
