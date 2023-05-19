import dataList from "./knownTemtemSpecies.json" assert { type: "json" };
import { Species } from "../src/models/species";
import fs from "fs";

const writeSpeciesData = async () => {
  const speciesList: Species[] = dataList.map(
    (data) =>
      ({
        number: data.number,
        name: data.name,
        types: data.types,
        icon: data.icon,
      } as unknown as Species)
  );
  await fs.writeFileSync(
    "./src/data/species.json",
    JSON.stringify(speciesList)
  );
  console.log("write!!!!");
};

// exec
(async () => {
  await writeSpeciesData();
})();
