import { Fragment, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axiosInstance from "../../redux/axiosInstance";
import Playlist from "../../components/Playlist";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux"; // Assuming Redux for user state management

const Home = () => {
    const [firstPlaylists, setFirstPlaylists] = useState([]);
    const [secondPlaylists, setSecondPlaylists] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    
    // Fetch user info from Redux store (or similar state management)
    const user = useSelector((state) => state.user); // Ensure you have a valid user object

    // Debug the user object
    console.log("User object:", user);

    const getRandomPlaylists = async (signal) => {
        try {
            setIsFetching(true);
            // Check if the user is an admin
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
        const controller = new AbortController();
        const { signal } = controller;

        getRandomPlaylists(signal);

        return () => {
            controller.abort();
        };
    }, [user]); // Rerun if `user` changes

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
