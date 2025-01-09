import { createContext, useRef, useState, useEffect } from "react";
import axios from 'axios'

export const PlayerContext = createContext();
export const url = import.meta.env.VITE_BACKEND_URL;


const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBar = useRef();
    const seekBg = useRef();

    
    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true)
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false)
    }

    const playWithId = async (id) => {
        try {
          const selectedTrack = songsData.find((song) => song._id === id);
          if (!selectedTrack) {
            console.error("Track not found with ID:", id);
            return;
          }
      
          await setTrack(selectedTrack); // Set the track
          if (audioRef.current) {
            audioRef.current.src = selectedTrack.file; // Set audio source
            await audioRef.current.play(); // Play the audio
            setPlayStatus(true); // Update play status
          } else {
            console.error("Audio reference is not available");
          }
        } catch (error) {
          console.error("Error in playWithId:", error);
        }
      };
      

    const previous = async () => {
        songsData.map(async(SongItem,index)=>{
            if(track._id===SongItem._id && index>0){
                await setTrack(songsData[index-1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }

    const next = async () => {
        songsData.map(async(SongItem,index)=>{
            if(track._id===SongItem._id && index<songsData.length){
                await setTrack(songsData[index+1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            console.log(response.data); // Check the entire response
            console.log('Fetched songs data:', response.data);
    
            if (Array.isArray(response.data) && response.data.length > 0) {
                setSongsData(response.data);
                setTrack(response.data[0]);
            } else {
                console.error("No songs data available");
            }
        } catch (error) {
            console.error("Error fetching songs data:", error);
        }
    };
    
    
    
    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            if (response.data.albums) {
                setAlbumsData(response.data.albums);
            } else {
                console.error("No albums data available", response);
            }
        } catch (error) {
            console.error("Error fetching albums data:", error);
        }
    }
    


    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        }, 1000);
    }, [audioRef])

    useEffect(()=>{
        getSongsData();
        getAlbumsData();
    },[])

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous, next,
        seekSong,
        songsData,albumsData
    }
    return (
        <PlayerContext.Provider value={contextValue} >
            {props.children}
        </PlayerContext.Provider>
    )
}
export default PlayerContextProvider
