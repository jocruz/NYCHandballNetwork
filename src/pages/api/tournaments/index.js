import { StatusCodes } from "http-status-codes";

// Simple in-memory array until we can get a db set up

let tournaments = [];

/**
 * Retrieves tournament(s) information.
 * If an ID is provided in the query, it fetches a specific tournament.
 * Otherwise, it returns all tournaments.
 *
 * @param {Object} req - The request object from the client, including query parameters.
 * @param {Object} res - The response object to send back the tournament data.
 */
function getSingleTournament(req, res) {
  const { id } = req.query;
  const tournament = tournaments.find((tournament) => tournament.id === id);
  if (tournament !== 1) {
    res.status(StatusCodes.OK).json(tournament);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Tournament not found" });
  }
}

function getAllTournaments(req, res) {
  return res.status(StatusCodes.OK).json(tournaments);
}
/**
 * Creates a new tournament with the provided information in the request body.
 * Generates a unique ID for the tournament and appends it to the in-memory array.
 *
 * @param {Object} req - The request object from the client, including body with tournament details.
 * @param {Object} res - The response object to send back the created tournament data.
 */
function createTournament(req, res) {
  const { name, date, type, totalPlayers, location, matches = [] } = req.body;
  const newTournament = {
    id: Date.now().toString(),
    name,
    date,
    type,
    totalPlayers,
    location,
    matches: [],
  };
  tournaments.push(newTournament);
  res.status(StatusCodes.CREATED).json(newTournament);
}

/**
 * Updates a tournament's information based on its ID.
 *
 * @param {Object} req - The request object from the client, including query and body.
 * @param {Object} res - The response object to send back the updated tournament data.
 */
function updateTournament(req, res) {
  // Locate tournament index by ID or return -1 if not found.

  const { id } = req.query;

  const index = tournaments.findIndex(
    (tournament) => tournament.id.toString() === id
  );

  // If tournament exists, update its details and return the updated object.
  if (index !== -1) {
    const { name, date, type, totalPlayers, location } = req.body;
    tournaments[index] = {
      ...tournaments[index],
      name,
      date,
      type,
      location,
      totalPlayers,
    };
    res.status(StatusCodes.OK).json(tournaments[index]);
  } else {
    // If not found, return a 404 error.
    res.status(StatusCodes.NOT_FOUND).json({ message: "Tournament not found" });
  }
}

/**
 * Deletes a tournament based on its ID.
 *
 * @param {Object} req - The request object from the client, containing the query.
 * @param {Object} res - The response object to send back the deletion confirmation.
 */
function deleteTournament(req, res) {
  // Filter out the tournament with the given ID.
  const newTournaments = tournaments.filter(
    (tournament) => tournament.id !== req.query.id
  );

  // Check if the tournament array length is reduced after filtering.
  if (newTournaments.length !== tournaments.length) {
    tournaments = newTournaments;
    // Confirm deletion with a 200 status.
    res.status(StatusCodes.OK).json({ message: "Tournament deleted" });
  } else {
    // If not found, return a 404 error.
    res.status(StatusCodes.NOT_FOUND).json({ message: "Tournament not found" });
  }
}

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
      deleteTournament(req, res);
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
