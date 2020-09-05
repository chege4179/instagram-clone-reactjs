import React, {useState} from "react";
import {Button} from "@material-ui/core";
import {storage ,db} from "./firebase";
import * as firebase from "firebase";
import './ImageUpload.css'

function ImageUpload({username}) {
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };
    const handleUpload =() => {
        const uploadTask  = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const progress = Math.round((
                    snapshot.bytesTransferred /snapshot.totalBytes
                ) * 100);
                setProgress(progress);

            },
            (error)=>{
                console.log(error);
                alert(error.message);
            },
            () => {
                storage.ref('images').child(image.name).getDownloadURL()
                    .then((url)=>{
                        db.collection('posts').add({
                            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                            caption:caption,
                            imageUrl:url,
                            username:username
                        });
                        setProgress(0);
                        setImage(null);
                        setCaption('');
                    });
            }
        )

    }

    return(
        <div className='imageUpload'>
            <progress className="imageupload_progress" value={progress} max="100"/>
            <input type="text" placeholder="Enter a caption"value={caption} onChange={event => setCaption(event.target.value)} />
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>Upload a Photo </Button>

        </div>
    )
}
export default ImageUpload