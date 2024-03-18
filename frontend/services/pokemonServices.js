
export const getRandomPokemons = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/pokemon/battle`);
      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      return json;
    } catch (error) {
        console.log(error);
    }
  };