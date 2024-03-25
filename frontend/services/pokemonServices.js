
export const getRandomPokemons = async (type) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/pokemon/battle/${type}`);
      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      return json;
    } catch (error) {
        console.log(error);
    }
  };