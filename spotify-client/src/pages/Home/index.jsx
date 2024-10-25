import { Fragment, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axiosInstance from "../../redux/axiosInstance";
import Playlist from "../../components/Playlist";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux"; // Assuming Redux for user state management

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [playingSong, setPlayingSong] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("https://spotifyy-jkai.onrender.com/api/songs");
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setSongs(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setSongs([]);
      }
    };

    fetchSongs();
  }, []);

  const handlePlay = (song) => {
    if (playingSong === song) {
      setPlayingSong(null);
    } else {
      setPlayingSong(song);
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar_container}>
        <Link to="/" className={styles.nav_logo}>
          <img src={logo} alt="logo" />
        </Link>
        <div className={styles.nav_links}>
          {navLinks.map((link, index) => (
            <Link key={index} to={link.link} className={styles.links}>
              {link.name}
            </Link>
          ))}
        </div>
      </nav>


    return (
        <Fragment>
            {isFetching ? (
                <div className={styles.progress_container}>
                    <CircularProgress style={{ color: "#1ed760" }} size="5rem" />
                </div>
            ) : (
                <div className={styles.container}>
                    <h1>Welcome, {user && user.role === "admin" ? "Admin" : "User"}!</h1>
                    {user && user.role === "admin" ? (
                        <>
                            <div className={styles.playlists_container}>
                                <Playlist playlists={firstPlaylists} />
                            </div>
                            <h1>Just the hits</h1>
                            <div className={styles.playlists_container}>
                                <Playlist playlists={secondPlaylists} />
                            </div>
                        </>
                    ) : (
                        <p>You do not have access to view playlists.</p>
                    )}
                </div>
            )}
        </Fragment>
    );
};

export default Home;
