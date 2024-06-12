const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "잘못된 요청입니다.",
  });
};

module.exports = errorHandler;
