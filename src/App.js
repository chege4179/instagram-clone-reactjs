import React, {useState, useEffect} from 'react';
import iglogo from './iglogo.png'
import './App.css';
import Post from "./Post";
import {auth, db} from './firebase'
import Modal from '@material-ui/core/Modal';
import { makeStyles} from "@material-ui/core/styles";
import { Button ,Input } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";

function getModalStyle() {
    const top = 50  ;
    const left = 50 ;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };

}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function App() {

  const classes = useStyles();
  const [modalStyle] =useState(getModalStyle);
  const [posts,setPosts] = useState([]);
  const [open , setOpen] = useState(false);
  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  const [email , setEmail] = useState('');
  const [user,setUser] =useState(null);
  const [openSignIn, setOpenSignIn]= useState('')

  useEffect(()=>{
      const unsubscribe =auth.onAuthStateChanged((authUser)=>{
         if(authUser){
             console.log(authUser);
             setUser(authUser);

         } else {
             setUser(null)
         }
      });
      return ()=>{
          unsubscribe();

      }
  },[user,username])


  useEffect(()=>{
      db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
         setPosts(snapshot.docs.map(doc =>({
             id:doc.id,
             post:doc.data()

         }
         )));

      });

  },[]);
  const signUp =(event)=>{
      event.preventDefault();
      auth.createUserWithEmailAndPassword(email,password)
          .then((authUser)=>{
              return authUser.user.updateProfile({
                  displayName:username
              })
          })

          .catch((error)=> alert(error.message));

      setOpen(false)


  };
  const signIn = (event) =>{
      event.preventDefault();
      auth.signInWithEmailAndPassword(email,password)
      .catch((error)=>{
          alert(error.message);
      })
      setOpenSignIn(false)

  };





  return (
    <div className="App">



        <Modal open={open} onClose={()=>setOpen(false)}>

            <div style={modalStyle} className={classes.paper}>
                <form className="app_signup">
                <center>
                    <img
                        className="app_headerImage"
                        src="data:image/jpeg;base64,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"
                        alt="Instagram"
                    />
                </center>
                    <Input
                        placeholder="username"
                        type="text"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                    <Input
                    placeholder="email"
                    type="text"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="password"
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <Button type="submit" onClick={signUp}>sign up</Button>
                </form>


            </div>
        </Modal>
        <Modal open={openSignIn} onClose={()=>setOpenSignIn(false)}>

            <div style={modalStyle} className={classes.paper}>
                <form className="app_signup">
                    <center>
                        <img
                            className="app_headerImage"
                            src="data:image/jpeg;base64,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"
                            alt="Instagram"
                        />
                    </center>

                    <Input
                        placeholder="email"
                        type="text"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="password"
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <Button type="submit" onClick={signIn}>sign in</Button>
                </form>


            </div>
        </Modal>

        <div className="app_header">
            <img
                className="app_headerImage"
                src={iglogo}
                alt=""
            />
            {user ? (
                <Button onClick={()=>auth.signOut()}>LogOut</Button>
            ):(
                <div className="app_loginContainer">
                    <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
                    <Button onClick={()=>setOpen(true)}>Sign Up</Button>
                </div>
            )}

        </div>
        <div className="app_posts">
            <div className="app_posts_left">
                {
                    posts.map(({id,post})=>(
                        <Post
                            key={id}
                            postId={id}
                            user={user}
                            username={post.username}
                            caption={post.caption}
                            imageUrl={post.imageUrl}/>
                    ))

                }
            </div>
            <div className="app_posts_right">
                <InstagramEmbed
                    maxwidth={320}
                    hideCaption={false}
                    containerTagName="div"
                    protocol=''
                    url="https://www.instagram.com/p/CEhfa_Zhhsb/?utm_source=ig_web_copy_link"
                    injectScript
                    onLoading={ () => {}}
                    onSuccess={ () => {}}
                    onAfterRender={ () => {}}
                    onFailure={ () => {}}
                />
            </div>

        </div>






        {user?.displayName ? (
            <ImageUpload username ={user.displayName}/>
        ):(
            <h3>Sorry you need to sign in to upload</h3>
        )}


    </div>
  );
}

export default App;
