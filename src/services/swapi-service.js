export default class SwapiService {

    _apiBase = 'https://swapi.dev/api';

    async getResourse(url) {
      const res = await fetch(`${this._apiBase}${url}`);

      if(!res.ok) {
        throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
      }
      return await res.json();
    }

    async getAllPeople() {
      const res = await this.getResourse(`/people/`);
      return res.results;
    }

    getPerson(id) {
      return this.getResourse(`/people/${id}/`);
    }

    async getAllPlanets() {
      const res = await this.getResourse(`/planets/`);
      return res.results.map(this._transformPlanet);
    }

    async getPlanet(id) {
      const planet = await this.getResourse(`/planets/${id}/`);
      return this._transformPlanet(planet);
    }

    async getAllStarships() {
      const res = await this.getResourse(`/starships/`);
      return res.results;
    }

    getStarship(id) {
      return this.getResourse(`/starships/${id}/`);
    }

    _transformPlanet(planet) {
      const idRegExp = /\/([0-9]*)\/$/;
      const id = planet.url.match(idRegExp)[1];

        return {
            id,
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        };
    }
}


