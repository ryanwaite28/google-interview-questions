/*
  Ryan M. Waite
  1/20/2022

  https://www.youtube.com/watch?v=rw4s4M3hFfs&t=430s
*/

(() => {
  function determine_best_apartment(blocks, required_amenities) {
    // where master list is going to go
    const results = [];
  
    // loop through each block
    for (let i = 0; i < blocks.length; i++) {
      // current block
      const blockData = { id: i };
  
      // this will keep count of the distance of each required amenity from the current block
      const required_amenities_map = {};
      // this will tell the condition to ignore checking if a block has the amenity if it was seen already
      const seen_amenities_map = {};
      // initialize the maps
      for (const amenity of required_amenities) {
        required_amenities_map[amenity] = 0;
        seen_amenities_map[amenity] = false;
      }
  
      // for each block we look at away from the current, we increment the distance by 1
      // we start at 0 to indicate looking at the current block before looking to the left/right
      let t = 0;
      // check blocks to the left of current block
      for (let k = i; k >= 0; k--) {
        const block = blocks[k];
        // check each amenity of this block
        for (const amenity of required_amenities) {
          // see if the block has the amenity AND if the amenity was not seen yet
          if (block[amenity] && !seen_amenities_map[amenity]) {
            // set the amenity key in the map to the current distance
            required_amenities_map[amenity] = t;
            // mark the amenity as seen/true
            seen_amenities_map[amenity] = true;
          }
        }
        // increase the distance
        t++;
      }
  
      // we reset the distance to 1 because the previous look already looked at the current block (t = 0, k = i)
      t = 1;
      // blocks to the right of current block
      for (let k = i + 1; k < blocks.length; k++) {
        const block = blocks[k];
        // same thing as above
        for (const amenity of required_amenities) {
          if (block[amenity] && !seen_amenities_map[amenity]) {
            required_amenities_map[amenity] = t;
            seen_amenities_map[amenity] = true;
          }
        }
        t++;
      }

      // aggregate/sum the values of the amenities map to get the total weight
      let weight = Object.values(required_amenities_map).reduce((a, b) => a + b, 0);
      required_amenities_map.weight = weight;
  
      // add to the blockData object
      Object.assign(blockData, required_amenities_map);
      results.push(blockData);
    }

    // sort by lowest weight
    results.sort((a, b) => a.weight - b.weight);

    console.log(results);

    // return results
    return results;
  }
  
  let requirements = ['gym', 'store', 'pool', 'office', 'school'];

  let blocks_list_a = [
   {gym: false, store: true, pool: false, office: false, school: true},
   {gym: false, store: true, pool: true, office: false, school: false},
   {gym: true, store: false, pool: false, office: false, school: false},
   {gym: true, store: false, pool: true, office: false, school: false},
   {gym: false, store: true, pool: true, office: true, school: false},
   {gym: false, store: false, pool: true, office: false, school: true},
   {gym: false, store: true, pool: false, office: false, school: false},
   {gym: true, store: false, pool: false, office: true, school: true},
   {gym: false, store: false, pool: true, office: false, school: true}
  ];

  let blocks_list_b = [
    {gym: true, store: false, pool: false, office: true, school: true},
    {gym: false, store: true, pool: true, office: false, school: false},
    {gym: false, store: false, pool: false, office: false, school: true},
    {gym: false, store: true, pool: true, office: false, school: false},
    {gym: false, store: true, pool: false, office: false, school: true},
    {gym: true, store: false, pool: false, office: false, school: true},
    {gym: true, store: true, pool: true, office: false, school: false},
    {gym: true, store: false, pool: true, office: true, school: true},
    {gym: false, store: false, pool: true, office: true, school: true},
    {gym: false, store: false, pool: true, office: false, school: false},
    {gym: false, store: true, pool: false, office: true, school: false}
  ];

  determine_best_apartment(blocks_list_a, requirements);

  determine_best_apartment(blocks_list_b, requirements);
})();