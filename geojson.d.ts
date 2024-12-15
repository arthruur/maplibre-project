declare module "*.geojson" {
    const value: FeatureCollection; // ou use um tipo mais específico, como FeatureCollection, dependendo da estrutura do seu GeoJSON
    export default value;
  }
  