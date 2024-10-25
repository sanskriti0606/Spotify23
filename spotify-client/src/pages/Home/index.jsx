import { Fragment, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios"; // Import axios directly
import axiosInstance from "../../redux/axiosInstance";
import Playlist from "../../components/Playlist";
import styles from "./styles.module.scss";

const Home = () => {
    const [firstPlaylists, setFirstPlaylists] = useState([]);
    const [secondPlaylists, setSecondPlaylists] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const getRandomPlaylists = async (signal) => {
        try {
            setIsFetching(true);
            const url = `${process.env.REACT_APP_API_URL}/playlists`;

            const { data } = await axiosInstance.get(url, { signal });
            const array1 = data.data.slice(0, 4);
            const array2 = data.data.slice(4);
            setFirstPlaylists(array1);
            setSecondPlaylists(array2);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request canceled:", error.message);
            } else {
                console.error("Error fetching playlists:", error);
            }
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController(); // Create an AbortController
        const { signal } = controller; // Get the abort signal

        getRandomPlaylists(signal);

        // Cleanup function to abort the request if the component unmounts
        return () => {
            controller.abort(); // Cancel the API request
        };
    }, []);

    return (
        <Fragment>
            {isFetching ? (
                <div className={styles.progress_container}>
                    <CircularProgress style={{ color: "#1ed760" }} size="5rem" />
                </div>
            ) : (
                <div className={styles.container}>
                    <h1>Welcome</h1>
                    <div className={styles.playlists_container}>
                        <Playlist playlists={firstPlaylists} />
                    </div>
                    <h1>Just the hits</h1>
                    <div className={styles.playlists_container}>
                        <Playlist playlists={secondPlaylists} />
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Home;
