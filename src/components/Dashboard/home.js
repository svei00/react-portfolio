import { useRef } from "react"
import { auth, db, storage } from "../../firebase"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection } from "firebase/firestore/lite";

const Home = () => {

    const form = useRef();

    const submitPortfolio = (e) => {
        e.preventDefault();

        // Be carefull with the order.
        const name = form.current[0]?.value; // ? means that it exist and doesn't exist a breaking point
        const description = form.current[1]?.value;
        const url = form.current[2]?.value;
        const image = form.current[3]?.files[0];

        // console.log(name, description, url, image); // To check if it works
        const storageRef = ref(storage, `portfolio/${image.name}`);
        
        uploadBytes(storageRef, image).then(
            (snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadUrl) => {
                    savePortfolio({
                        name,
                        description,
                        url,
                        image: downloadUrl
                    })
                }, () => {      // Error handler in case download failed
                    savePortfolio({
                        name,
                        description,
                        url,
                        image: null
                    })
                } )
            }, () => {      // Error handler
                savePortfolio({
                    name,
                    description,
                    url,
                    image: null
                })
            } 
        ); 
    }

    const savePortfolio = async (portfolio) => {
        // console.log(portfolio); // Just a test
        try {
            await addDoc(collection(db, 'portfolio'), portfolio);       // Same name than Firebase
            window.location.reload(false);
        } catch (error) {
            alert('Failed to add portfolio');
        }
    }

    return (
        <div className="dashboard">
            <form ref={form} onSubmit={submitPortfolio}>
                <p><input type='text' placeholder="Name" /></p>
                <p><textarea placeholder="Description" /></p>
                <p><input type='text' placeholder="URL" /></p>
                <p><input type='file' placeholder="Image" /></p>   
                <input type='submit' value='Submit' />  
                <button onClick={() => auth.signOut()}>Sign Out</button>           
            </form>
        </div>
    )
}

export default Home