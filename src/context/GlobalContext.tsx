import React, { createContext, ReactNode, SetStateAction, useEffect, useState } from "react";
import { api } from "../services/api";


interface InterfaceProps {
      selectedGenreId:number; 
      setSelectedGenreId: React.Dispatch<SetStateAction<number>>;
      genres: GenreResponseProps[]; 
      setGenres: React.Dispatch<SetStateAction<GenreResponseProps[]>>;
      movies:MovieProps[]; 
      setMovies: React.Dispatch<SetStateAction<MovieProps[]>>;
      moviesbyGenre:MovieProps[]; 
      setMoviesByGenre: React.Dispatch<SetStateAction<MovieProps[]>>;
      selectedGenre:GenreResponseProps; 
      setSelectedGenre: React.Dispatch<SetStateAction<GenreResponseProps>>;
}
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ChildrenProps {
  children:ReactNode;
}



export const GlobalContext = createContext<InterfaceProps>({} as InterfaceProps)


export const GlobalPovider = ({children}:ChildrenProps)=>{
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [moviesbyGenre, setMoviesByGenre] = useState<MovieProps[]>([])
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  
  
  //obter lista de Generos
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
  
  //obter lista de filmes
  useEffect(()=>{
    api.get<MovieProps[]>('movies').then(response=>setMovies(response.data))
  }, [])

  //obter filmes por genero selecionados
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMoviesByGenre(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);
  
  
  return (
    <GlobalContext.Provider value={{
      selectedGenreId, 
      setSelectedGenreId,
      genres, 
      setGenres,
      movies, 
      setMovies,
      moviesbyGenre, 
      setMoviesByGenre,
      selectedGenre, 
      setSelectedGenre

    }}>
      {children}
    </GlobalContext.Provider>
  )
}