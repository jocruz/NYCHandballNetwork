// pages/api/utils/asyncHandler.js
import { StatusCodes } from "http-status-codes";

export const asyncHandler = (fn,resourceName ) => async (req, res, next) => {
  try {
    await fn(req, res);
  } catch (error) {
    console.error(error);
    console.log(error.code)
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "An unexpected error occurred";

    // If the error is a Prisma error, you can handle it specifically
    if (error.code === "P2002") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `${resourceName} with provided details already exists.`,
      });
    }
    if(error.code === "P2025"){
      return res.status(StatusCodes.NOT_FOUND).json({message:`The ${resourceName} id to update was not found`})
    }

    // For all other errors, send a generic error response
    res.status(statusCode).json({ message });
  }
};
