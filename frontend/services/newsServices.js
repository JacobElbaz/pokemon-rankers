export const getNews = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/news/getPopular`);
    const data = await response.json();
    console.log(data);
    return data;
}