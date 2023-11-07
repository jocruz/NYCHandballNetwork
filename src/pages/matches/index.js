import { StatusCodes } from "http-status-codes";

let matches = [];

function getMatches(req, res) {
  return res.status(StatusCodes.OK).json(matches);
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
  switch (req.method) {
    case "GET":
      // Handle GET requests with the getMatches function
      getMatches(req, res);
      break;
    case "POST":
      // Handle POST requests with the createMatches function
      createMatches(req, res);
      break;
    case "PUT":
      // Handle PUT requests with the updateMatches function
      updateMatches(req, res);
      break;
    case "DELETE":
      // Handle DELETE requests with the deleteMatches function
      deleteMatches(req, res);
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