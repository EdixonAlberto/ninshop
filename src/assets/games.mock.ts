export default Array(50)
  .fill(null)
  .map((_, i) => ({
    objectID: i,
    title: `title-${i}`,
    horizontalHeaderImage: '',
    msrp: i > 25 ? 50 : 20,
    genres: ['Action']
  }))
