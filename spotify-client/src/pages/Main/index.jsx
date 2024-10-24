import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import CopyrightIcon from "@mui/icons-material/Copyright";
import logo from "../../images/white_logo.svg";
import styles from "./styles.module.scss";

const navLinks = [
  { name: "Premium", link: "#" },
  { name: "Support", link: "#" },
  { name: "Download", link: "#" },
  { name: "Sign up", link: "/signup" },
  { name: "Log in", link: "/login" },
];

const companyLinks = ["About", "Jobs", "For the record"];
const communitiesLinks = ["For Artists", "Developers", "Advertising", "Investors", "Vendors"];
const usefulLinks = ["Support", "Web Player", "Free Mobile App"];
const footerLinks = ["Legal", "Privacy Center", "Privacy Policy", "Cookies", "About Ads", "Additional CA Privacy Disclosures"];
const footerIcons = [<InstagramIcon />, <TwitterIcon />, <FacebookIcon />];

const Main = () => {
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

      <main className={styles.main_container}>
        <div className={styles.main}>
          <div className={styles.main_text}>
            <h1>Listening is everything</h1>
            <p>Millions of songs and podcasts. No credit card needed.</p>
          </div>
          <Link to="/signup">
            <Button label="GET SPOTIFY FREE" style={{ color: "#2941ab", width: "18rem", fontSize: "1.4rem" }} />
          </Link>
        </div>

        <div className={styles.songs_list}>
          <h2>Songs</h2>
          <ul>
            {songs.length > 0 ? (
              songs.map((song, index) => (
                <li key={index} className={styles.song_card}>
                  <img src={song.image || "https://od.lk/s/NV8xOTg1MjkzMjJf/artworks-000475584816-34luc0-t500x500.jpg"} alt={`${song.name} cover`} className={styles.song_image} />
                  <div className={styles.song_info}>
                    <div className={styles.song_title}>{song.name}</div>
                    <div className={styles.song_artist}>by {song.artist}</div>
                  </div>
                  <Button 
                    label={playingSong === song ? "Pause" : "Play"} 
                    onClick={() => handlePlay(song)} 
                    style={{ marginTop: '10px', width: '100%' }} 
                  />
                  {playingSong === song && (
                    <audio controls autoPlay>
                      <source src={song.song} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </li>
              ))
            ) : (
              <li>No songs available</li>
            )}
          </ul>
        </div>
      </main>

      <footer className={styles.footer_container}>
        <div className={styles.footer_1}>
          <Link to="/" className={styles.footer_logo}>
            <img src={logo} alt="logo" />
          </Link>
          <div className={styles.footer_1_links}>
            <div className={styles.footer_heading}>Company</div>
            {companyLinks.map((link, index) => (
              <Link key={index} to="#" className={styles.links}>
                {link}
              </Link>
            ))}
          </div>
          <div className={styles.footer_1_links}>
            <div className={styles.footer_heading}>Communities</div>
            {communitiesLinks.map((link, index) => (
              <Link key={index} to="#" className={styles.links}>
                {link}
              </Link>
            ))}
          </div>
          <div className={styles.footer_1_links}>
            <div className={styles.footer_heading}>Useful Links</div>
            {usefulLinks.map((link, index) => (
              <Link key={index} to="#" className={styles.links}>
                {link}
              </Link>
            ))}
          </div>
          <div className={styles.footer_icons}>
            {footerIcons.map((icon, index) => (
              <span key={index} className={styles.icon}>
                {icon}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.footer_2}>
          <div className={styles.copy_right}>
            <CopyrightIcon fontSize="small" />
            <span>2024 Spotify Clone</span>
          </div>
          <div className={styles.footer_links}>
            {footerLinks.map((link, index) => (
              <Link key={index} to="#" className={styles.links}>
                {link}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Main;
