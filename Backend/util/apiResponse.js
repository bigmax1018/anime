exports.errorResponse = (err, res) => {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;
  
    if ('development' == "development") {
      res.status(err.statusCode).json({
        code: err.statusCode,
        message: err.message,
        data: null,
        stack_trace: err.stack,
        status: "Error",
      });
    } else {
      if (err.isOperational) {
        res.status(err.statusCode).json({
          code: err.statusCode,
          message: err.message,
          data: null,
          status: "Error",
        });
      } else {
        res.status(err.statusCode).json({
          code: err.statusCode,
          status: "Error",
          message: "Something Went Wrong Try Again Later",
          data: null,
        });
      }
    }
  };
  
  exports.successResponse = (res, data, message, code) => {
    res.status(code).json({ code, data, message, status: "" });
  };
  