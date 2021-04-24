import styles from './styles.module.scss';
import ptBR from 'date-fns/locale/pt-BR';
import format from 'date-fns/format';

export function Player(){
    const currentDate =  format(new Date(),'EEEEEE , d MMM',{
        locale: ptBR
    })
    return(
        <div className={styles.PlayerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando agora"/>
                <strong>Tocando agora</strong>
            </header>
            <div className={styles.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>
            <footer className={styles.empty}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                    <div className={styles.emptySlider}/>
                    </div>
                    <span>00:00</span>
                </div>
                <div className={styles.buttons}>
                    <button type="button">
                        <img src="/shuffle.svg"  alt="embaralhar"/>
                    </button>
                    <button type="button">
                        <img src="/play-previous.svg" alt="tocar anterior"/>
                    </button>
                    <button type="button">
                        <img src="/play.svg" alt="Tocar" className={styles.playButton}/>
                    </button>

                    <button type="button">
                        <img src="/play-next.svg"  alt="tocar próxima"/>
                    </button>
                    <button type="button">
                        <img src="/repeat.svg" alt="Repetir"/>
                    </button>
                </div>
            </footer>
        </div>
    )
}