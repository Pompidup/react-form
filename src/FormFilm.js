import React, { useState } from 'react';

const FormFilm = () => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    let movieName;
    let movieUrl;
    let movieComment;

    function onClickHandle(e) {
        e.preventDefault();
        if (movieName !== "" && movieUrl !== null && movieComment !== null) {
            if (movieName.value !== "" && movieUrl.value !== "" && movieComment.value !== "") {
                setName(movieName.value);
                setUrl(movieUrl.value);
                setComment(movieComment.value);
                sendToApi(name, url, comment);
            } else {
                setError('Tout les champs sont obligatoire !');
            }
        }
    }

    function sendToApi(_name, _url, _comment) {
        
        const formatData = {
            name: _name,
            url: _url,
            comment: _comment
        };

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formatData),
        };

        const urlApi = "http://campus-bordeaux.ovh:3001/api/quests/movies/";
        console.log(config)
        fetch(urlApi, config)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    alert(res.error);
                } else {
                    alert(`Film ajouté avec l'ID ${res}!`);
                }
            }).catch(e => {
                console.error(e);
                alert('Erreur lors de l\'ajout d\'un Film');
            });
    }

    return (
        <div className="FormFilm">
            <h1>Saisi d'un film</h1>
            {error !== '' && <p style={{ color: 'red', fontWeight: 'bold' }}>Erreur : {error}</p>}
            <form>
                <fieldset>
                    <legend>Films</legend>
                    <div className="form-data">
                        <label htmlFor="name">Nom du film</label>
                        <input
                            type="text"
                            name="name"
                            ref={node => { movieName = node }}
                        />
                    </div>

                    <div className="form-data">
                        <label htmlFor="url">Url affiche</label>
                        <input
                            type="text"
                            name="url"
                            ref={node => { movieUrl = node }}
                        />
                    </div>

                    <div className="form-data">
                        <label htmlFor="comment">Commentaire
                                <textarea name="comment" ref={node => { movieComment = node }} />
                        </label>
                    </div>
                    <hr />
                    <div className="form-data">
                        <button onClick={onClickHandle}>Envoyer</button>
                        </div>
                </fieldset>
            </form>
        </div>
    );
}


export default FormFilm;
