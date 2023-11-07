import { StatusCodes } from "http-status-codes";

let matches = [];

function getAllMatches(req, res) {
  return res.status(StatusCodes.OK).json(matches);
}

function getSingleMatch(req, res) {
  const { id } = req.query;
  const index = matches.findIndex((match) => match.id === id);
  if (index !== -1) {
    return res.status(StatusCodes.OK).json(matches[index]);
  } else {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Match was not found" });
  }
}

function createMatches(req, res) {
  const {
    matchType,
    gameType,
    playersTeamA,
    playersTeamB,
    scoresTeamA,
    scoresTeamB,
    status,
    timeouts,
    wipes,
    scheduledTime,
    nextMatchId,
  } = req.body;

  const newMatch = {
    id: Date.now().toString(),
    matchType,
    gameType,
    playersTeamA,
    playersTeamB,
    scoresTeamA: Number(scoresTeamA),
    scoresTeamB: Number(scoresTeamB),
    status,
    timeouts: timeouts || [],
    wipes: wipes || [],
    scheduledTime: new Date(scheduledTime).toISOString(),
    nextMatchId,
  };

  matches.push(newMatch);

  return res.status(StatusCodes.CREATED).json(newMatch);
}

function updateMatch(req, res) {
  const { id } = req.query;
  const {
    matchType,
    gameType,
    playersTeamA,
    playersTeamB,
    scoresTeamA,
    scoresTeamB,
    status,
    scheduledTime,
    nextMatchId,
  } = req.body;

  const updatedMatch = {
    ...(matchType !== undefined && { matchType }),
    ...(gameType !== undefined && { gameType: Number(gameType) }),
    ...(playersTeamA !== undefined && { playersTeamA }),
    ...(playersTeamB !== undefined && { playersTeamB }),
    ...(scoresTeamA !== undefined && { scoresTeamA: Number(scoresTeamA) }),
    ...(scoresTeamB !== undefined && { scoresTeamB: Number(scoresTeamB) }),
    ...(status !== undefined && { status }),
    ...(scheduledTime !== undefined && {
      scheduledTime: new Date(scheduledTime).toISOString(),
    }), // Assuming you want to store the date in ISO format
    ...(nextMatchId !== undefined && { nextMatchId }),
  };

  const index = matches.findIndex((match) => match.id === id);

  if (index === -1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Match not found" });
  }

  matches[index] = { ...matches[index], ...updatedMatch };

  return res.status(StatusCodes.OK).json(matches[index]);
}

function deleteMatch(req, res) {
  const { id } = req.query;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "ID was not provided" });
  }

  const matchExists = matches.some((match) => match.id === id);
  if (!matchExists) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Match not found" });
  }

  const remainingMatches = matches.filter((match) => match.id !== id);
  matches = remainingMatches; // Update the matches array

  return res
    .status(StatusCodes.OK)
    .json({ message: `Match with ID ${id} was deleted` });
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
      // Handle GET requests with the getMatches function
      if (id) {
        getSingleMatch(req, res);
      } else {
        getAllMatches(req, res);
      }
      break;
    case "POST":
      // Handle POST requests with the createMatches function
      createMatches(req, res);
      break;
    case "PUT":
      // Handle PUT requests with the updateMatches function
      if (id) {
        updateMatch(req, res);
      }
      break;
    case "DELETE":
      // Handle DELETE requests with the deleteMatches function
      if (id) {
        deleteMatch(req, res);
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
