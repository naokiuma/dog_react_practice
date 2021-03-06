"use strict";
exports.__esModule = true;
var react_1 = require("react");
var api_1 = require("./api");
var react_2 = require("react");
function Header() {
    return (<div>
        <header className="hero is-dark is-bold">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">cute dog images</h1>  
                </div>
            </div>
        </header>
        </div>);
}
function Image(props) {
    return (<div className="card">
            <div className="card-image">
            <figure className="image">
                <img src={props.src} alt="cute dog!"/>
            </figure>
            </div>
        </div>);
}
function Gallery(props) {
    console.log(props);
    if (props.urls == null) {
        return <Loading />;
    }
    return (<div className="columns is-vcentered is-multiline">
            
            {props.urls.map(function (url) {
            return (<div key={url} className="column is-3">
                        <Image src={url}/>{/*ここでsrcという値にurlを渡す*/}
                    </div>);
        })}
                
        </div>);
}
function Form(props) {
    function handleSubmit(event) {
        event.preventDefault();
        console.log(event.target.value);
        var breed = event.target.breed;
        // console.log(breed);
        props.onFormSubmit(breed.value);
    }
    return (<>
        <form onSubmit={handleSubmit}>
            <div className="field has-addons">
                    <div className="control is-expanded">
                        <div className="select is-fullwidth">
                            <select name="breed" defaultValue="shiba">
                                <option value="shiba">Shiba</option>
                                <option value="akita">Akita</option>
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
        </>);
}
function Main() {
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
    var _a = react_1.useState(null), urls = _a[0], setUrls = _a[1];
    react_1.useEffect(function () {
        api_1.fetchImages("shiba").then(function (urls) {
            setUrls(urls);
        });
    }, []); //useEffect の第 2 引数には、その副作用が依存する値のリストを配列で渡す。
    function reloadImages(breed) {
        api_1.fetchImages(breed).then(function (urls) {
            console.log("おう");
            console.log(urls);
            setUrls(urls);
        });
    }
    return (<main>
            <section className="section">
                <div className="container">
                    <Form onFormSubmit={reloadImages}/>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <Gallery urls={urls}/>
                </div>
            </section>
        </main>);
}
function Loading() {
    return <p>Loading...</p>;
}
function Footer() {
    return (<footer className="footer">
            <div className="content has-text-centered">
            <p>Dog images are retrieved from Dog API</p>
            <p>
                <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
            </p>
            </div>
        </footer>);
}
function App() {
    return (<div>
           <Header />
           <Main />
           <Footer />
            
            
        </div>);
}
exports["default"] = App;
