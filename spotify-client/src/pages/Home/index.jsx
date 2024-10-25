import { Fragment, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios"; // Import axios directly
import axiosInstance from "../../redux/axiosInstance"; // Your axios instance
import Playlist from "../../components/Playlist";
import styles from "./styles.module.scss";
// Assuming you have a way to access the user role (e.g., from Redux or context)
import { useSelector } from "react-redux"; // Or any other state management

const Home = () => {
    const [firstPlaylists, setFirstPlaylists] = useState([]);
    const [secondPlaylists, setSecondPlaylists] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    
    // Fetch user info (assuming it comes from Redux store or similar)
    const user = useSelector((state) => state.user); // Adapt according to your setup

    const getRandomPlaylists = async (signal) => {
        try {
            setIsFetching(true);
            // Only proceed if the user is an admin
            if (user && user.role === "admin") {
                const url = `${process.env.REACT_APP_API_URL}/playlists`;
                const { data } = await axiosInstance.get(url, { signal });
                const array1 = data.data.slice(0, 4);
                const array2 = data.data.slice(4);
                setFirstPlaylists(array1);
                setSecondPlaylists(array2);
            } else {
                console.error("User is not authorized to fetch playlists");
            }
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
    }, [user]); // Add `user` as a dependency to ensure role checks

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
