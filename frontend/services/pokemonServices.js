
export const getRandomPokemons = async (type) => {
    const gen = ['1','2','3','4','5','6','7','8','9']
    let genOption = '/';
    if(gen.includes(type)){
      genOption = '/gen/';
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/pokemon/battle${genOption}${type}`);
      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      return json;
    } catch (error) {
        console.log(error);
    }
  };