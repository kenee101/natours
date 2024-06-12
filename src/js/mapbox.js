/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoia2VuZTEwMSIsImEiOiJjbHhhdm94aTgxcjB6MmlyMGJyYW1sNmM3In0.74K6RI1EL0jci4OSiI_D_w';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kene101/clxay47fq00hq01pje6v43vtp', //style URL
    scrollZoom: false,
    //   interactive: false,
    //   zoom: 10,
    //   center: [-118.113491, 34.111745], // starting position [lng, lat]
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create a marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add a marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend the map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
