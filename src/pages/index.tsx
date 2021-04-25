import{GetStaticProps} from 'next';
import Image from 'next/image';
import{format,parseISO} from 'date-fns';

import styles from './home.module.scss';
// importa idioma
import ptBR from 'date-fns/locale/pt-BR';
import React, { useEffect } from "react";
import { api } from '../services/api';
import { convertDurationToTImeString } from '../utils/convertDurationToTimeString';

type Episode = {
 id:string;
 title:string;
 thumbnail:string;
 description:string;
 members:string;
 duration:number;
 durationAsString:string;
 url:string;
 publishedAt:string;

}
type HomeProps = {
  latestEpisodes: Episode[],
  allEpisodes: Episode[]
}

export default function Home({latestEpisodes,allEpisodes}:HomeProps) {
    
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
          <h2>Ultimos lançamentos</h2>
          <ul>
            {latestEpisodes.map(episode =>{
              return(
                <li key={episode.id}>
                  <Image 
                  width={192} 
                  height={192}
                  src={episode.thumbnail} 
                  alt={episode.title} 
                  objectFit="cover"/>
                  <div className={styles.episodeDetails}>
                      <a href="">{episode.title}</a>
                      <p>{episode.members}</p>
                      <span>{episode.publishedAt}</span>
                      <span>{episode.durationAsString}</span>
                  </div>
                  <button type="button">
                    <img src="/play-green.svg" alt="Tocar episodio"/>
                  </button>
                </li>
              )

            })}
          </ul>
      </section>
      <section className={styles.allEpisodes}>

      </section>

    </div>
   
  )
}
// 
// pagina static sem tipagem  
// export async function getStaticProps() {
//   const response = await fetch('http://localhost:3333/episodes')
//   const data = await response.json()
//   console.log(data)
//   return {
//     props: {
//       episodes: data
//     },
//     revalidate: 60 * 60 * 8,
//   }

// }
 export const getStaticProps: GetStaticProps = async ()=>{
   const {data} = await api.get('episodes',{
     params: {
       _limit:12,
       _sort:'published_at',
       _order:'desc'
       
     }
   })
   const episodes = data.map(episode =>{
     return{
       id: episode.id,
       title:episode.title,
       thumbnail:episode.thumbnail,
       members:episode.members,
       publishedAt:format(parseISO(episode.published_at),'d MMM yy',{locale:ptBR}),
       description:episode.description,
       durationAsString:convertDurationToTImeString(Number(episode.file.duration)),
       duration:Number(episode.file.duration),
       url:episode.file.url,
     };
   })

   const latestEpisodes = episodes.slice(0,2);
   const allEpisodes = episodes.slice(2,episodes.lentgh)
    return {
      props:{
        allEpisodes,
        latestEpisodes
      },
      revalidate:60*60*8// refresh da página
    }

  }
