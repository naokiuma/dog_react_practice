import { useEffect,useState } from "react";
import { fetchImages } from "./api";

function Header(){
    return (
        <header className="hero is-dark is-bold">
        <div className="hero-body">
            <div className="container">
                <h1 className="title">cute dog images</h1>  
            </div>
        </div>
    </header>
    )

}

function Image(props){
    return (
        <div className="card">
            <div className="card-image">
            <figure className="image">
                <img src={props.src} alt="cute dog!" />
            </figure>
            </div>
        </div>
    )
}

function Gallery(props){
    if(props.urls == null){
        return <Loading />;
    }
    return (
        <div className="columns is-vcentered is-multiline">
            
            {props.urls.map((url)=> {
                
                return (
                    <div key={url} className="column is-3">
                        <Image src={url} />{/*ここでsrcという値にurlを渡す*/}
                    </div>
                )
            })}
                
        </div>
        

    )
}

function Main(){
    // const urls = [
    //     "https://images.dog.ceo/breeds/shiba/shiba-11.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-12.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-14.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-17.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-2.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-3i.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-4.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-5.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-6.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-7.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-8.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-9.jpg",
    //   ];
    //const urls = null;

    //useStateをすることで、「setLoveDogsUrls（target）」という関数でtarget(state)更新をできるようになる。
    const [urls,setLoveDogsUrls] = useState(null);
    useEffect(() => {//useEffect の第 1 引数には、副作用を起こす関数を渡します。
        fetchImages("shiba").then((urls) => {
          console.log(urls);
          setLoveDogsUrls(urls);
          
        });
      }, []);//useEffect の第 2 引数には、その副作用が依存する値のリストを配列で渡す。

    return(
        <main>
            <section className="section">
                <div className="container">
                    <Form />
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <Gallery urls = {urls} />
                </div>
            </section>
        </main>
    )
}

function Loading(){
    return<p>Loading...</p>

}

function Form(){
    return(
        <>
        <form>
            <div className="field has-addons">
                <div className="control is-expanded">
                    <div className="select is-fullwidth">
                        <select className="breed" defaultValue="shiba">
                            <option cvalue="shiba">Shiba</option>
                            <option cvalue="akita">Akita</option>
                        </select>
                    </div>
                </div>
                <div className="control">
                    <button type="submit" className="button is-dark">
                    Reload
                    </button>
                </div>
            </div>
        </form>
        </>
    )
}

function Footer(){
    return(
        <footer className="footer">
            <div className="content has-text-centered">
            <p>Dog images are retrieved from Dog API</p>
            <p>
                <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
            </p>
            </div>
        </footer>

    )
}
function App(){
    return (
        <div>
           <Header />
           <Main />
           <Footer />
            
            
        </div>
  );
}

export default App;