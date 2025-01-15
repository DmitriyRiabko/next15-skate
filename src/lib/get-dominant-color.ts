export async function getDominantColor(url: string) {
    const paletteUrl = new URL(url);
    paletteUrl.searchParams.set("palette", "json");
  
    const res = await fetch(paletteUrl);
    const json = await res.json();
    console.log(json);
  
    return (
      json.dominant_colors.vibrant?.hex || json.dominant_colors.vibrant_light?.hex
    );
  }