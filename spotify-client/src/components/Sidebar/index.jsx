import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPlayList } from "../../redux/playListSlice/apiCalls";
import { CircularProgress } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../images/white_logo.svg";
import likeImg from "../../images/like.jpg";
import styles from "./styles.module.scss";

const Sidebar = () => {
	const { playlists, getPlayListProgress, createPlayListProgress } =
		useSelector((state) => state.playlists);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleCreatePlayList = () => {
		const data = {
			name: "My Playlist #" + (playlists.length + 1),
			user: user._id,
			desc: "By " + user.name,
			songs: [],
			img: "",
		};
		createPlayList(data, dispatch);
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<Fragment>
			{/* Sidebar Toggle Button for Mobile */}
			<div className={styles.menu_icon} onClick={toggleSidebar}>
				{isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
			</div>

			{/* Sidebar */}
			<div className={`${styles.container} ${isSidebarOpen ? styles.open : ""}`}>
				<img className={styles.logo_img} src={logo} alt="logo" />
				<NavLink
					to="/home"
					className={styles.menu_link}
					activeClassName={styles.active_menu}
				>
					<HomeIcon />
					<span>Home</span>
				</NavLink>
				<NavLink
					to="/search"
					className={styles.menu_link}
					activeClassName={styles.active_menu}
				>
					<SearchIcon />
					<span>Search</span>
				</NavLink>
				<NavLink
					to="/collection/playlists"
					className={styles.menu_link}
					activeClassName={styles.active_menu}
				>
					<LibraryMusicIcon />
					<span>Your Library</span>
				</NavLink>
				<div
					className={styles.create_playlist_btn}
					onClick={handleCreatePlayList}
				>
					<AddIcon />
					<span>Create Playlist</span>
				</div>
				<NavLink
					to="/collection/tracks"
					className={styles.menu_link}
					activeClassName={styles.active_menu}
				>
					<img src={likeImg} alt="Liked Songs" />
					<span>Liked Songs</span>
				</NavLink>
				<div className={styles.underline}></div>
				{getPlayListProgress || createPlayListProgress ? (
					<div className={styles.progress_container}>
						<CircularProgress style={{ color: "#1ed760" }} size="3rem" />
					</div>
				) : (
					<Fragment>
						{playlists.map((playlist) => (
							<NavLink
								key={playlist._id}
								to={`/playlist/${playlist._id}`}
								activeClassName={styles.active_link}
								className={styles.playlist_link}
							>
								{playlist.name}
							</NavLink>
						))}
					</Fragment>
				)}
			</div>
		</Fragment>
	);
};

export default Sidebar;



// import { Fragment } from "react";
// import { NavLink } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { createPlayList } from "../../redux/playListSlice/apiCalls";
// import { CircularProgress } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
// import SearchIcon from "@mui/icons-material/Search";
// import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
// import AddIcon from "@mui/icons-material/Add";
// import logo from "../../images/white_logo.svg";
// import likeImg from "../../images/like.jpg";
// import styles from "./styles.module.scss";
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// const Sidebar = ({setIsOpen,isOpen}) => {
//     const { playlists, getPlayListProgress, createPlayListProgress } = useSelector((state) => state.playlists);
//     const { user } = useSelector((state) => state.auth);
//     const dispatch = useDispatch();

//     const handleCreatePlayList = () => {
//         const data = {
//             name: "My Playlist #" + (playlists.length + 1),
//             user: user._id,
//             desc: "By " + user.name,
//             songs: [],
//             img: "",
//         };
//         createPlayList(data, dispatch);
//     };

//     return (
//         <div className={styles.container}>
//             <div style={{display:"flex",justifyContent:"space-around" ,alignItems:"center"}}>
//             <KeyboardArrowLeftIcon style={{fontSize:"20px",color:"white"}} onClick={()=>setIsOpen(!isOpen)}/>
//             <img className={styles.logo_img} src={logo} alt="logo" />
//             </div>
//             <NavLink to="/home" className={styles.menu_link} activeClassName={styles.active_menu}>
//                 <HomeIcon />
//                 <span>Home</span>
//             </NavLink>
//             <NavLink to="/search" className={styles.menu_link} activeClassName={styles.active_menu}>
//                 <SearchIcon />
//                 <span>Search</span>
//             </NavLink>
//             <NavLink to="/collection/playlists" className={styles.menu_link} activeClassName={styles.active_menu}>
//                 <LibraryMusicIcon />
//                 <span>Your Library</span>
//             </NavLink>
//             <div className={styles.create_playlist_btn} onClick={handleCreatePlayList}>
//                 <AddIcon />
//                 <span>Create Playlist</span>
//             </div>
//             <NavLink to="/collection/tracks" className={styles.menu_link} activeClassName={styles.active_menu}>
//                 <img src={likeImg} alt="Liked Songs" />
//                 <span>Liked Songs</span>
//             </NavLink>
//             <div className={styles.underline}></div>
//             {getPlayListProgress || createPlayListProgress ? (
//                 <div className={styles.progress_container}>
//                     <CircularProgress style={{ color: "#1ed760" }} size="3rem" />
//                 </div>
//             ) : (
//                 <Fragment>
//                     {playlists.map((playlist) => (
//                         <NavLink key={playlist._id} to={`/playlist/${playlist._id}`} activeClassName={styles.active_link} className={styles.playlist_link}>
//                             {playlist.name}
//                         </NavLink>
//                     ))}
//                 </Fragment>
//             )}
//         </div>
//     );
// };

// export default Sidebar;



