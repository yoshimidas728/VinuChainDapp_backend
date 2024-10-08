exports.getTime = async (str) => {
  const readingTimeMinutes = Math.ceil(str / 863);
return readingTimeMinutes
}
exports.pagination = ({ page = page ?? 1, size = size ?? 10 }) => {
  page = page - 1
  const offset = size * page
  const limit = size
  return {
    offset,
    limit
  }
}
