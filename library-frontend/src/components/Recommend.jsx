import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = (props) => {
  const meResult = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: meResult.data?.me?.favoriteGenre },
    skip: !meResult.data?.me?.favoriteGenre
  })

  if (!props.show) {
    return null
  }

  if (meResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = meResult.data?.me?.favoriteGenre
  const books = booksResult.data?.allBooks || []

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
