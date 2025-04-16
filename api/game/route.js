// app/api/game/route.js

export async function GET() {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // Subtract 7 days
    const startDateString = startDate.toISOString().split('T')[0]; // Format as yyyy-MM-dd

    try {
      const response = await fetch(
        `https://api.balldontlie.io/v1/games?dates[]=${startDateString}`,
        {
          headers: {
            "Authorization": "f2330736-79a6-42a9-b36a-ebf31ea89ba8",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch game data');
      }
  
      const data = await response.json();
      const games = data.data;
  
      // Filter the last 3 games (or you can sort and get the smallest score difference)
      const sortedGames = games.sort((a, b) => {
        const diffA = Math.abs(a.home_team_score - a.visitor_team_score);
        const diffB = Math.abs(b.home_team_score - b.visitor_team_score);
        return diffA - diffB; // Sort by smallest score difference
      });
  
      const last3Games = sortedGames.slice(0, 3); // Get the top 3 games with the smallest score difference
  
      return new Response(JSON.stringify(last3Games), {
        status: 200,
      });
    } catch (err) {
      console.error("Error fetching data:", err);
      return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
        status: 500,
      });
    }
  }
  