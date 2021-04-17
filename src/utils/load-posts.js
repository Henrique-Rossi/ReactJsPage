export const loadPosts = async () => {


    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);


    const postsJson = await posts.json();
    const photosJson = await photos.json();

    /*Zipar uma foto por post,pois api disponibiliza 5000 e so tem 100 post*/
    /*vai indexar a photo com index do post,ou seja relaçao por id*/
    const postAndPhotos = postsJson.map((post, index) => {
        return { ...post, cover: photosJson[index].url }
    });
    return postAndPhotos;
}