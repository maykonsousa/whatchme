import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import { Button } from "./Button"
import '../styles/sidebar.scss';



export function SideBar() {


  const {genres, setSelectedGenreId, selectedGenreId} = useContext(GlobalContext)


  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }
  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>

  </nav>
  )
  
}