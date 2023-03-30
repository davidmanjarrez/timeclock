import path from "path";
import { promises as fs } from "fs";

export default async function handle(req, resp) {
    // get path to data
    const dataPath = path.join(process.cwd(), "data");
    // read data
    const empData = await fs.readFile(dataPath + "/employees.json").then(r => JSON.parse(r));
    //const empData = await fsPromise.readFile(dataPath + "/employees.json");
    // response
    resp.status(200).json(empData)
}